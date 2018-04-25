const argv = require('./config/yargs').argv;
const colors = require('colors');
const tareaController = require('./controller/tarea-controller');


let comando = argv._[0];

console.log('***TODO APP***\n'.bgCyan);

switch (comando) {
    case 'crear':
        let tarea = tareaController.crear(argv.descripcion)
        console.log(tarea);
        break;

    case 'listar':
        console.log('Lista de tareas por hacer'.bgRed);
        let tareas = tareaController.listar();
        tareas.forEach((tarea, index) => {
            if (tarea.completado == false) {
                console.log(`Tarea ${index} - Descripcion: ${tarea.descripcion} - Completado:`, `${tarea.completado}`.bgRed);
            } else if (tarea.completado == true) {
                console.log(`Tarea ${index} - Descripcion: ${tarea.descripcion} - Completado:`, `${tarea.completado}`.bgGreen);
            }
        });
        break;

    case 'actualizar':
        console.log('Actualizando tarea'.bgRed);
        let updatedTask = tareaController.actualizar(argv.descripcion, argv.completado);
        console.log("Updated:", updatedTask);
        break;
    case 'borrar':
        console.log('Borrar tarea de la lista');
        let deletedTask = tareaController.borrar(argv.descripcion);
        console.log("Deleted:", deletedTask);
        break;
    default:
        console.log('Comando no reconocido'.bgRed);
}