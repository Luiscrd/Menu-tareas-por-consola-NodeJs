require('colors');
const { green } = require('colors');
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach(key => {

            const tarea = this._listado[key]

            listado.push(tarea)

        })

        return listado;
    }

    constructor() {

        this._listado = {};

    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;

    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArr(tareas = []) {

        tareas.forEach(tarea => {

            this._listado[tarea.id] = tarea;

        })

    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach((tarea, i) => {

            const { desc, completadoEn } = tarea;
            const idx = `${i + 1}.`.green;
            console.log(`${idx} ${desc} - ${(completadoEn ? 'Completada.'.green : 'Pendiente.'.red)}`);

        })

    }

    listarPendientesCompletadas(completadas) {

        console.log();

        this.listadoArr.forEach((tarea) => {

            const { desc, completadoEn } = tarea;
            let idx = 1;

            if (completadas && completadoEn) {

                console.log(`${green(idx + '.')} ${desc} - ${green('Completada el ' + completadoEn + '.')}`);
                idx++;

            } else if (!completadas && !completadoEn) {

                console.log(`${green(idx + '.')} ${desc} - ${'Pendiente.'.red}`);
                idx++;

            }

        })

    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];

            if (!tarea.completadoEn) {

                let objectDate = new Date();
                let day = objectDate.getDate();
                let month = objectDate.getMonth();
                let year = objectDate.getFullYear();

                tarea.completadoEn = day + "/" + (month + 1) + "/" + year;

            }

        })

        this.listadoArr.forEach(tarea => {
            
            if (!ids.includes(tarea.id)) {

                tarea.completadoEn = null;

            }

        })

    }

};

module.exports = Tareas;