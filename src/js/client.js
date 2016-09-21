import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
// import '../styles/index.scss';

import { todos } from './reducers/todos';
import { visibilityFilter } from './reducers/visibility';

const { Component } = React;

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);

const FilterLink = ({ visibilityFilter, currentVisibilityFilter, onFilterClicked, children }) => {

  if(visibilityFilter === currentVisibilityFilter){
    return <strong>{ children }</strong>;
  }

  return <a
    href="#"
    onClick={
      (e) => {
        e.preventDefault();
        onFilterClicked(visibilityFilter);
      }
    }>
    { children }</a>
}


const getVisibleTodos = (todos, visibilityFilter) => {
  if(visibilityFilter === 'SHOW_ALL'){
    return todos;
  }

  if(visibilityFilter === 'SHOW_COMPLETED'){
    return todos.filter(t => t.completed);
  }

  if(visibilityFilter === 'SHOW_ACTIVE'){
    return todos.filter(t => !t.completed);
  }
}


const Todo = ({ text, completed, onTodoClicked }) => (
  <li
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
    onClick={ onTodoClicked }>
    { text }
  </li>
);

const TodoList = ({ todos, onTodoClicked }) => (
  <ul>
    {
      todos.map(todo => (
        <Todo
          key={ todo.id }
          { ...todo }
          onTodoClicked={ () => onTodoClicked(todo) }
        />
      ))
    }
  </ul>
);

const AddTodo = ({ onAddTodo, children }) => {
  let input;

  return (
    <div>
      <input type="text" ref={ node => input = node } />
      <button
        onClick={
          () => { 
            onAddTodo(input.value);
            input.value = "";
          }
        }
      >{ children }</button>
    </div>
  );
}

const Footer = ({ currentVisibilityFilter, onFilterClicked }) => (
  <div>
    Show:
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>All</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_COMPLETED"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Completed</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_ACTIVE"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Active</FilterLink>
  </div>
);


let maxId = 0;
const TodosApp = ({ todos, visibilityFilter }) => (
  <div>
    <AddTodo
      onAddTodo={
        (text) => {
          store.dispatch({
            type: 'ADD_TODO',
            payload: {
              id: maxId++,
              text
            }
          });
        }
      }>Agregar Todo</AddTodo>

    <TodoList
      todos={ getVisibleTodos(todos, visibilityFilter) }
      onTodoClicked={
        (todo) => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            payload: {
              id: todo.id
            }
          });
        }
      } />
  
    <Footer
      currentVisibilityFilter={ visibilityFilter }
      onFilterClicked={
        (filter) => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            payload: { visibilityFilter: filter }
          });
        }
      } />

  </div>
);


const render = () => {
  ReactDOM.render(
    <TodosApp
      { ...store.getState() } />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);