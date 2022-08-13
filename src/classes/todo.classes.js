

export class Todo {

    static fromJson ( { id, tarea, completed, created} ){

            const tempTodo = new Todo ( tarea );

            tempTodo.id = id;
            tempTodo.completed = completed;
            tempTodo.created = created;

            return tempTodo;
    }

    constructor( tarea ){
    
        this.tarea     = tarea;
        this.id        = new Date().getTime();
        this.completed = false;
        this.created   = new Date();

    }

    imprimirClase(){

        console.log(`${this.tarea} - ${this.id}`);

    }

}