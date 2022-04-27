<template>
    <div class="task-item">
        <img src="../assets/radio-button.svg" alt="" width="24" v-if="!task.status" @click="updateStatus(task)" />
        <img src="../assets/checkmark--filled.svg" alt="" width="24" v-else @click="updateStatus(task)" />
        <p :class="{ taskDone: task.status }">{{ task.titulo }}</p>
        <button class="delete-button" type="button" @click.prevent="deleteTask(task)">
            <img src="../assets/delete.svg" alt="delete" width="24" />
        </button>
    </div>
</template>

<script>
import { inject, defineComponent } from 'vue';
import firebase from 'firebase/compat';

let db = firebase.database();
let tasksRef = db.ref('tasks');
export default defineComponent({
    name: 'Task',
    props: ['task'],
    firebase: {
        tasks: tasksRef,
    },
    setup() {
        const tasksList = inject('tasksList');
        const deleteTask = task => {
            console.log(task);
            tasksList.value.splice(tasksList.value.indexOf(task), 1);
            const usertask = db.ref(`users/${firebase.auth().currentUser.uid}/tasks`);
            usertask.once('value', data => {
                data.forEach(item => {
                    if (item.val().id == task.id) {
                        console.log(item.val());
                        console.log(task);
                        usertask.child(item.key).remove();
                    }
                });
            });
        };
        const updateStatus = task => {
            task.status = !task.status;
            //update task in firebase
            const usertask = db.ref(`users/${firebase.auth().currentUser.uid}/tasks`);
            usertask.once('value', data => {
                data.forEach(item => {
                    if (item.val().id == task.id) {
                        usertask.child(item.key).update({
                            status: task.status,
                        });
                    }
                });
            });
        };
        return { tasksList, deleteTask, updateStatus };
    },
});
</script>

<style scoped>
/*
CHECKBOX
*/
.mycheckbox input:checked ~ span::after {
    background: rgb(0, 0, 0);
}

.mycheckbox input:checked ~ span .on-bell {
    transform: translate(31px);
}

.mycheckbox input {
    display: none;
}

.mycheckbox span {
    display: inline-block;
    cursor: pointer;
    position: relative;
}

.mycheckbox span::after {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    transform: scale(0.85);
    border-radius: 30px;
    background: rgb(255, 255, 255);
    transition: 0.4s;
    box-shadow: inset 0px 0px 2px rgb(37, 37, 37);
}

.mycheckbox img {
    position: absolute;
    left: 7px;
    top: 7px;
    z-index: 1;
    transition: 0.4s;
}

/*CHECKBOX */

.task-item {
    display: flex;
    align-items: center;
    height: 60px;
    margin-top: 15px;
    padding-left: 15px;
    padding-right: 5px;
    border-color: #c5c5c565;
    border-style: solid;
    border-radius: 6px;
    border-width: thin;
}
.task-item:hover {
    border-color: #c4c4c4;
}
.task-item:active {
    border-style: dashed;
    border-color: #c4c4c4;
}
.task-item p {
    font-size: 18px;
    margin-left: 10px;
}
.task-item button {
    margin-left: auto;
    border-width: 0px;
    background-color: #c5c5c500;
    opacity: 0.3;
}
.task-item button:hover {
    margin-left: auto;
    border-width: 0px;
    background-color: #e2090900;
    opacity: 1;
}
.taskDone {
    text-decoration: line-through;
    color: #c4c4c4;
}
</style>
