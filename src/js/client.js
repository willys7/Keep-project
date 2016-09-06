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

let maxId = 0;

class TodosApp extends Component {
  render() {
    return (
      <div>
        <input type="text" ref={ node => this.input = node } />
        <button
          onClick={
            () => { 
              store.dispatch({
                type: 'ADD_TODO',
                payload: {
                  id: maxId++,
                  text: this.input.value
                }
              });

              this.input.value = "";
            }
          }
        >Agregar Todo</button>

        <ul>
          {
            this.props.todos.map(
              todo => <li key={ todo.id }>{ todo.text }</li>
            )
          }
        </ul>
      </div>
    );
  }
}


const render = () => {
  ReactDOM.render(
    <TodosApp todos={ store.getState().todos } />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);