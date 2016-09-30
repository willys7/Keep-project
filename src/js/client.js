import { createStore, combineReducers } from 'redux';
import React from 'react';
const { Component } = React;
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import v4 from 'uuid-v4';

import { todos } from './reducers/todos';
import { visibilityFilter } from './reducers/visibility';

const loadState = () => {
  try{
    let result = JSON.parse(localStorage.getItem('state'));
    return result ? result : undefined;
  }
  catch(err){
    return undefined;
  }
}

const saveState = (state) => {
  try{
    localStorage.setItem('state', JSON.stringify(state));
  }
  catch(err){
    // Log
  }
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp, loadState());

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

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  payload: {
    id
  }
});

const VisibleTodos = connect(
  (state, ownProps) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }),
  (dispatch, ownProps) => ({
    onTodoClicked: (todo) => {
      dispatch(toggleTodo(todo.id))
    }
  })
)(TodoList);

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input type="text" ref={ node => input = node } />
      <button
        onClick={
          () => { 
            dispatch({
              type: 'ADD_TODO',
              payload: {
                id: v4(),
                text: input.value
              }
            });
            input.value = "";
          }
        }
      >Add todo</button>
    </div>
  );
}

AddTodo = connect()(AddTodo);

const Link = ({ active, onClick, children }) => {
  if(active){
    return <strong>{ children }</strong>;
  }

  return <a href="#" onClick={ onClick }>{ children }</a>;
}

const FilterLink = connect(
  (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
  }),
  (dispatch, ownProps) => ({
    onClick: (e) => {
      e.preventDefault();

      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        payload: {
          visibilityFilter: ownProps.filter
        }
      })
    }
  })
)(Link);

const Footer = () => (
  <div>
    Show:
    <FilterLink filter="SHOW_ALL">All</FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_COMPLETED">Completed</FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_ACTIVE">Active</FilterLink>
  </div>
);

const TodosApp = ({ todos, visibilityFilter }) => (
  <div>
    <AddTodo />
    <VisibleTodos />
    <Footer />
  </div>
);

ReactDOM.render(
  <Provider store={ store }>
    <TodosApp />
  </Provider>,
  document.getElementById('root')
);

store.subscribe(() => {
  saveState(store.getState());
});
