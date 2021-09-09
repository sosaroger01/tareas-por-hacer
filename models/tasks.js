const Task = require("./task");

class Tasks{
    _listado ={};

    constructor(){
        this._listado={};
    }

    get _listadoArr(){
        const list=[];
        Object.keys(this._listado).forEach((key)=>{
            list.push(this._listado[key])
        })
        return list;
    }

    loadData(tareas=[]){
        tareas.forEach((value)=>{
            this._listado[value.id]=value;
        })
        return this._listado;
    }

    createTask( desc='' ){
        const task= new Task(desc);
        this._listado[task.id]=task;
    }

    all() {
        console.log('')
        this._listadoArr.forEach((value,index)=>{
            const idx=`${(index+1)}`.green;
            const {descripcion, completadoEn}=value;

            const status= completadoEn ? 'Completada'.green : "Pendiente".red;
            console.log(`${idx} ${descripcion} :: ${status}`);
            
        })
    }

    findStatus(status=true) {
        console.log('')
        let cont=0;
        this._listadoArr.forEach((value)=>{
            const {descripcion, completadoEn}=value;
            
            const statusD= completadoEn ? 'Completada'.green : "Pendiente".red;
            
            if(status && completadoEn ){
                cont+=1;
                console.log(`${(cont+'.').green} ${descripcion} :: ${completadoEn.green}`);
            }else if(!status && !completadoEn){
                cont+=1;
                console.log(`${(cont+'.').green} ${descripcion} :: ${statusD}`);
            }
            
        })
    }

    delete(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    complete(ids=[]){
        ids.forEach(id=>{
            const tarea=this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn= new Date().toISOString();
            }
        })

        this._listadoArr.forEach(tarea=>{
            if( ! ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn=null;
            }
        })
    }

}

module.exports=Tasks;