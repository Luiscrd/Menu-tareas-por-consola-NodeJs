const { gurdarDb, leerBd } = require('./helpers/guardar-lista');
const { inquiereMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheck } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
require('colors');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');



const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDb = leerBd();

    if (tareasDb) {

        tareas.cargarTareasFromArr(tareasDb);

    }

    do {

        opt = await inquiereMenu();

        switch (opt) {

            case '1':

                const desc = await leerInput('Descripción:')
                tareas.crearTarea(desc);

                break;

            case '2':

                tareas.listadoCompleto();

                break;

            case '3':

                tareas.listarPendientesCompletadas(true);

                break;

            case '4':

                tareas.listarPendientesCompletadas(false);

                break;

            case '5':

                const ids = await mostrarListadoCheck(tareas.listadoArr)

                tareas.toggleCompletadas(ids);
    
                break;

            case '6':

                const id = await listadoTareasBorrar(tareas.listadoArr);

                if (id !== '0') {

                    const confirBorrar = await confirmar('¿Seguro qué quiere borrarlo?')

                    if (confirBorrar) {

                        tareas.borrarTarea(id);
                        console.log();
                        console.log('===== > Tarea borrada <====='.green);

                    }
                }

            break;

        }

        gurdarDb(tareas.listadoArr);

        if (opt !== '0') await pausa();

    } while (opt !== '0');

}

main();