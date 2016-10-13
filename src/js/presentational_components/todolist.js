import React from 'react';
import {Title, ArchiveMe} from './filter';
import { AddTodo } from './input';
import { Footer} from './footers';

const ColorPicker = ({ color, noteId, setColor, setModifiedAt }) => {
  let input;
  return(
  <input class="color" type="color" defaultValue={color} ref={ node => input = node } 
    onChange={ 
      () => {
        setColor(input.value, noteId );
        setModifiedAt(Date(), noteId);
      } 
    }/>
  );
}

const Todo = ({ text, completed, onTodoClicked, onTodoRemove }) => (
  <div>
    <div class = 'todo'>
      <li
        style={{
          textDecoration: completed ? 'line-through' : 'none'
        }}
        onClick={ onTodoClicked }
      >
        { text }
      </li>

      <button class = "delete"
      onClick = {onTodoRemove}
    >Delete</button>
    </div>
    
  </div>
);

const TodoList = ({ todos, onTodoClicked, color, title, onUpdate, id, currentVisibilityFilter, onArchive, onFilterClicked, onAddTodo, onTodoRemove, create }) => (
  <div class = 'element'
  style={ {backgroundColor: 'yellow' }}>
    <div>
    <Title
      text= {title}
      onUpdate = {onUpdate}
      color = {color}
    />
    </div>
    <AddTodo
      color = {color}
      listID = {id}
      onAddTodo ={onAddTodo}
    />
    <ul>
      {
        todos.map(todo => (          
          <Todo
            key={ todo.id }
            text = {todo.text}
            completed = {todo.completed}
            onTodoClicked={ () => onTodoClicked(todo) }
            onTodoRemove = { () => onTodoRemove(todo) }
          />
        ))
      }
    </ul>
    <ArchiveMe
      onArchive = {onArchive}
    />
    <div>
    {create}
    </div>
    <Footer
      currentVisibilityFilter = {currentVisibilityFilter}
      listID = {id}
      onFilterClicked = { onFilterClicked }
      
    />
  </div>
);

export {Todo, TodoList};