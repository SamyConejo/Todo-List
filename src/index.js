
import { TodoList} from './classes'
import { crearTodoHtml} from './js/componentes'
import './styles.css';
 
//inicializo todoList y sus metodos para manejar To Dos
export const todoList = new TodoList();

 todoList.todos.forEach( crearTodoHtml );


 console.log('todos', todoList.todos);