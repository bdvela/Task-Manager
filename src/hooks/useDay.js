import { ref } from 'vue';
const useDay = () => {
    let fecha = new Date();
    const day = ref(fecha.getUTCDate());
    const year = ref(fecha.getUTCFullYear());
    const dayOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][
        fecha.getDay()
    ];
    const month = [
        'ENERO',
        'FEBRERO',
        'MARZO',
        'ABRIL',
        'MAYO',
        'JUNIO',
        'JULIO',
        'AGOSTO',
        'SEPTIEMBRE',
        'OCTUBRE',
        'NOVIEMBRE',
        'DICIEMBRE',
        'ENERO',
    ][fecha.getMonth()];

    return { day, year, dayOfWeek, month };
};
export default useDay;
