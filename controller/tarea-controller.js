const fs = require('fs');

let tareasLista = [];

const saveDB = () => {
    let data = JSON.stringify(tareasLista);

    fs.writeFile('./database/data.json', data, (err) => {
        return new Promise((resolve, reject) => {
            if (err) reject('No se pudo grabar', err)
            else
                resolve('Data Saved');
        })
    })
}


const loadDB = () => {
    try {
        tareasLista = require('../database/data.json');
    } catch (error) {
        tareasLista = [];
    }

    return tareasLista;
}


const crear = (descripcion) => {
    loadDB();

    let tarea = {
        descripcion,
        completado: false
    };

    tareasLista.push(tarea);
    saveDB();

    return tarea;
}

const listar = () => loadDB();


// const actualizar = (desc, compl) => {
//     let tasks = loadDB();
//     let bandera;
//     let finalTarea;

//     tasks.forEach((task, index) => {
//         if (task.descripcion == desc) {
//             bandera = index;
//         }
//     });

//     if (bandera != undefined) {
//         tareasLista[bandera].completado = JSON.parse(compl);
//         finalTarea = tareasLista[bandera];
//         saveDB();
//     } else {
//         finalTarea = "No existe"
//     }

//     return finalTarea;
// }


const actualizar = (desc, compl) => {
    loadDB();
    let index = tareasLista.findIndex(tarea => tarea.descripcion == desc);

    if (index >= 0) {
        tareasLista[index].completado = JSON.parse(compl);
        saveDB()
        return true;
    } else {
        return false;
    }
}

const borrar = (desc) => {
    loadDB();
    // let index = tareasLista.findIndex(tarea => tarea.descripcion == desc);
    // if (index >= 0) {
    //      
    //     saveDB()
    //     return true;
    // } else {
    //     return false;
    // }

    let newList = tareasLista.filter(tarea => tarea.descripcion !== desc)

    if (newList.length === tareasLista.length) {
        return false;
    } else {
        tareasLista = newList;
        saveDB();
        return true;
    }
}

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}