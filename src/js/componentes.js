
import {Todo} from '../classes'
import { todoList } from "../index";
//referencias en el html


const divTodoList          = document.querySelector('.todo-list');
const txtInput             = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const divFilters           = document.querySelector('.filters');
const anchorFilters        = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) =>{
    const htmlTodo = `
    <li class="${ (todo.completed) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completed) ? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>  
    `
    const div = document.createElement('div');

    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

txtInput.addEventListener( 'keyup', (event)=>{

    if (event.keyCode === 13 && txtInput.value.length > 0 ){
        //uso la clase Todo para crear objeto To Do
        const nuevoTodo = new Todo(txtInput.value);
        //envia a almacenar nuevoTodo a la lista de To Dos
        todoList.nuevoTodo (nuevoTodo);
        crearTodoHtml(nuevoTodo);    
        txtInput.value = '';    
    }
});

//maneja evento button click en check y remove ('X')
divTodoList.addEventListener('click', (event)=>{


        const nombreElemento = event.target.localName;
        const todoElemento   = event.target.parentElement.parentElement;
        const todoId         = todoElemento.getAttribute('data-id');

        if (nombreElemento.includes('input')){

            todoList.marcarCompletado(todoId); 
            todoElemento.classList.toggle('completed');
        
        }else if (nombreElemento.includes('button')){
            
            todoList.eliminarTodo(todoId);
            divTodoList.removeChild(todoElemento);

        }
//maneja evento en click Remover Completados
});

btnBorrarCompletados.addEventListener('click', (event)=>{
    
    todoList.elmininarCompletado();

    //OPCION 1 PERO BUSCA EN TODO EL DOCUMENTO HTML
    // const completados = document.querySelectorAll(".completed");
    // for (const completado of completados){
    //     completado.remove();
    // }

    //OPCION 2 BUSCA SOLO EN EL DIV DONDE ESTA LA LISTA
    // const completados = divTodoList.querySelectorAll('.completed');
    // for ( const completado of completados){
    //     completado.remove();
    // }

    //OPCION 3 
    for ( let i = divTodoList.children.length-1; i>=0; i--){

        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')){         
            divTodoList.removeChild(elemento);
        }
    }
    
});

divFilters.addEventListener('click', (event) =>{

    
    const filtro = event.target.text;

    if (!filtro){return;}

    anchorFilters.forEach(elem => elem.classList.remove('selected'));

    event.target.classList.add('selected');
    
    for( const elemento of divTodoList.children){
        
        //para el comportamiento TODOS.
        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');
        
        switch (filtro) {
            case 'Pendientes':

                if ( completado ) {
                    elemento.classList.add('hidden');
                }        
                break;

            case 'Completados':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                }    
                break;
    
            default:
                break;
        }
    }


});
