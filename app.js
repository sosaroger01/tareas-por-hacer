require('colors')

const { save,read } = require('./helpers/filesystem');
const {inquiererMenu,pause,readInput,tasksDelete,confirm,listCheckbox}=require("./helpers/inquirer")

const Tasks = require('./models/tasks');

const tareas= new Tasks();

const main= async () => {
    let opt='';
    const taskDB=read();

    if(taskDB){
        tareas.loadData(taskDB);
    }
    do {
        //imprimir menu
        opt=await inquiererMenu()

        switch (opt) {
            case '1':
                desc = await readInput('Descripción: ');
                console.log(desc)
                tareas.createTask(desc)
                break;
            case '2':
                tareas.all();
                break;
            case '3':
                tareas.findStatus();
                break;
            case '4':
                    tareas.findStatus(false);
                    break;
            case '5': //completar tareas
                const ids=await listCheckbox(tareas._listadoArr);
                tareas.complete(ids)
                break;
            case '6':
                const id=await tasksDelete(tareas._listadoArr);

                if(id!=='0'){
                    const ok = await confirm('Está seguro?')
                    
                    if(ok){
                        tareas.delete(id);
                        console.log("tarea borrada correctamente")
                    }
                }

                break;
            default:
                break;
        }
        
        save(tareas._listadoArr);

        if(opt!=='0') await pause();

    } while (opt!=='0');
}

main();