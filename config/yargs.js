const descripcion = {
    demand: true,
    alias: 'd',
    describe: 'Nombre de la tarea'
}

const completado = {
    demand: true,
    default: true,
    alias: 'c',
    describe: 'Cambia el estado de la tarea'
}

const argv = require('yargs')
    .command('crear', 'Crea una tarea', {
        descripcion
    })
    .command('actualizar', 'Actualiza una tarea', {
        descripcion,
        completado
    })
    .command('borrar', "Borra una tarea", {
        descripcion
    })
    .help()
    .argv


module.exports = {
    argv
}