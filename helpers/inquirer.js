const { green } = require('colors');
const inquirer = require('inquirer');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear una tarea`
            },
            {
                value: '2',
                name: `${'2'.green}. Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.green}. Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.green}. Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.green}. Completar tarea's`
            },
            {
                value: '6',
                name: `${'6'.green}. Borrar tarea`
            },
            {
                value: '0',
                name: `${'0'.green}. Salir`
            },
        ]
    }
]

const inquiereMenu = async () => {

    // console.clear();
    console.log('==================================='.green);
    console.log(`${'=====>   '.green}${'Seleccione Opción'.white}${'   <====='.green}`);
    console.log('==================================='.green);
    console.log('');

    const opt = await inquirer.prompt(preguntas);

    const { opcion } = opt;
    return opcion;

};

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {

                if (value.length === 0) {

                    return 'Por favor ingrese un valor'.red;

                };

                return true;
            }

        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;

};

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'ENTER',
            message: `Presione ${'ENTER'.green} para continuar`

        }
    ];

    console.log();
    await inquirer.prompt(question);

};

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const { id, desc, completadoEn } = tarea;
        const idx = `${i + 1}.`.green;
        return {
            value: id,
            name: `${idx} ${desc} - ${(completadoEn ? 'Completada.'.green : 'Pendiente.'.red)}`

        }
    })

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Volver`
    })

    const preguntasBorar = [
        {
            type: 'list',
            name: 'id',
            message: '¿Borrar?:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntasBorar);

    return id;

}

const mostrarListadoCheck = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const { id, desc, completadoEn } = tarea;
        const idx = `${i + 1}.`.green;
        let checked;

        if (completadoEn) {
            checked = true;
        } else {
            checked = false;
        }
        return {
            value: id,
            name: `${idx} ${desc} - ${(checked ? green('Completada el '+completadoEn+'.') : 'Pendiente.'.red)}`,
            checked
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecione:',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);

    return ids;

}

const confirmar = async(message) => {

    if (!message) return null;

    const question = [
        {
            type: 'confirm',
            name: 'resp',
            message,
        }
    ]

    const { resp } = await inquirer.prompt(question);

    return resp;
}

module.exports = {
    inquiereMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheck
};