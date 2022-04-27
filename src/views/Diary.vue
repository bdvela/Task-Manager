<template>
    <div class="container">
        <div class="header">
            <h3>
                Bienvenido, <span>{{ userEmail }}</span>
            </h3>
            <Logout />
        </div>

        <div class="card">
            <div class="head">
                <div class="diary">
                    <img src="../assets/tasks.svg" alt="icon-tasks" width="24" />
                    <h1>AGENDA</h1>
                </div>

                <div class="fecha">
                    <h1 class="day">
                        {{ dayOfWeek }}, <span>{{ day }}</span>
                    </h1>
                    <h1 class="month">{{ month }} {{ year }}</h1>
                </div>
            </div>

            <form class="task-control" @submit.prevent="addTask">
                <input type="text" placeholder="Mi tarea" v-model="taskTitle" />
                <button type="button">
                    <img src="../assets/new-task.svg" alt="new-task" width="24" @click="addTask" />
                </button>
            </form>
            <div>
                <div v-if="tasksList.length > 0">
                    <Task
                        v-for="task in tasksList"
                        :key="task.id"
                        :task="task"
                        draggable="true"
                        class="drop-zone"
                        @drop="onDrop($event, task)"
                        @dragenter.prevent
                        @dragover.prevent
                        @dragstart="startDrag($event, task)"
                    />
                </div>

                <div v-else>
                    <h2>¡Tu agenda está vacía!<br /><span>Crea tu primera tarea</span></h2>
                </div>
            </div>

            <div v-if="tasksComplete === 1">
                <p class="taskDone">({{ taskComplete }}) tarea completada</p>
            </div>
            <div v-else>
                <p class="taskDone">({{ taskComplete }}) tareas completadas</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent, provide, computed } from 'vue';
import firebase from 'firebase/compat';
import useDay from '@/hooks/useDay.js';
import Task from '@/components/Task.vue';
import Logout from '@/components/Logout.vue';

let db = firebase.database();
let tasksRef = db.ref('tasks');
let usersRef = db.ref('users');

export default defineComponent({
    name: 'Diary',
    components: { Task, Logout },
    firebase: {
        tasks: tasksRef,
        users: usersRef,
    },
    setup() {
        const user = firebase.auth().currentUser;
        const userEmail = user.email;
        console.log('email ra: ', userEmail);
        const tasksList = ref([]);
        const taskTitle = ref('');
        provide('tasksList', tasksList);
        const ID = () => '_' + Math.random().toString(36).substr(2, 9);
        const addTask = () => {
            let taskItem = ref({});
            if (!taskTitle.value) {
                return;
            }
            tasksList.value.push({ id: ID(), titulo: taskTitle.value, status: false });
            console.log(taskTitle.value);
            taskItem.value.id = ID();
            taskItem.value.titulo = taskTitle.value;
            taskItem.value.status = false;
            console.log(tasksList.value);
            //firebase
            const usertask = db.ref(`users/${firebase.auth().currentUser.uid}/tasks`);
            usertask.push(taskItem.value);

            taskTitle.value = '';
        };
        const { day, year, dayOfWeek, month } = useDay();
        const taskComplete = computed(() => tasksList.value.filter(task => task.status).length);

        const startDrag = (event, item) => {
            console.log(item);
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('itemID', item.id);
        };
        const onDrop = (event, task) => {
            const usertask = db.ref(`users/${firebase.auth().currentUser.uid}/tasks`);
            const itemID = event.dataTransfer.getData('itemID');
            let origin = tasksList.value.find(item => item.id == itemID);
            let destiny = tasksList.value.find(item => item.id == task.id);
            const originIndex = tasksList.value.findIndex(item => item.id == itemID);
            const destinyIndex = tasksList.value.findIndex(item => item.id == task.id);
            console.log('origin: ', origin);
            console.log('destiny: ', destiny);
            const temp = origin;
            origin = destiny;
            destiny = temp;
            console.log('origin: ', origin);
            console.log('destiny: ', destiny);
            console.log(tasksList.value);
            tasksList.value.splice(originIndex, 1, origin);
            tasksList.value.splice(destinyIndex, 1, destiny);
            usertask.remove();
            usertask.update(tasksList.value);
            console.log('tasklist: ', tasksList.value);
        };
        const getTasks = () => {
            const usertask = db.ref(`users/${firebase.auth().currentUser.uid}/tasks`);
            usertask.once('value', data => {
                data.forEach(task => {
                    tasksList.value.push(task.val());
                });
            });
        };
        getTasks();
        return {
            day,
            year,
            dayOfWeek,
            month,
            addTask,
            tasksList,
            taskTitle,
            taskComplete,
            onDrop,
            startDrag,
            userEmail,
        };
    },
});
</script>

<style scoped>
.container {
    margin-left: auto;
    margin-right: auto;
    width: 50vh;
}
.header {
    margin-left: auto;
    margin-right: auto;

    display: flex;
    width: 55vh;
}
.drop-zone:-moz-drag-over {
    outline: 1px solid black;
}
.card {
    border-color: #e4e4e4;
    border-style: solid;
    border-radius: 6px;
    border-radius: 16px;
    padding: 20px;
}
.card:hover {
    border-color: #dadada;
    box-shadow: 0 0 10px 5px #bdbdbd44;
}

.head {
    display: flex;
    align-items: flex-start;
}
.head h1 {
    font-size: 24px;
    font-weight: 700;
}
.diary {
    display: flex;
    align-items: center;
}
.fecha {
    margin-left: auto;
    text-align: end;
}
.fecha .month {
    margin-top: -15px;
    font-size: 16px;
    font-weight: lighter;
}
.task-control {
    margin-top: 40px;
    display: flex;
}
.task-control input {
    margin-right: 10px;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    height: 40px;
    border-color: #c5c5c5;
    border-style: solid;
    border-radius: 6px;
    font-size: 18px;
}
.task-control input:hover {
    border-color: #727272;
}
.task-control button {
    width: 50px;
    height: 45px;
    background-color: #8eeddc;
    border-color: #6ec3b4;
    border-style: solid;
    border-radius: 6px;
}
.task-control button:hover {
    width: 50px;
    height: 4.6vh;
    background-color: #7dc9bb;
    border-color: #0b947b;
    border-style: solid;
    border-radius: 6px;
}
.taskDone {
    text-align: end;
    font-size: 18px;
    opacity: 0.4;
}
</style>
