import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import undoable from 'redux-undo';
import { ActionCreators } from 'redux-undo';
import { filterActions } from 'redux-ignore';

import { todos } from './reducers/todos';
import { visibilityFilter } from './reducers/visibility';

import '../styles/index.scss';

import {listsTodos} from './reducers/todos';
import { notes } from './reducers/notes';

import { Title, FilterLink, ArchiveMe} from './presentational_components/filter';
import { Todo, TodoList } from './presentational_components/todolist';
import { Footer, GeneralFooter} from './presentational_components/footers';
import { Note } from './presentational_components/notes';
import { AddTodo, AddReminder, SearchReminder } from './presentational_components/input';

import { addTodoList, addNote, setNoteTitle, toggleTodo, setTodoListTitle, addTodo, setTodoListVisibilityFilter, setVisibilityFilter, searchReminder, archiveNote, archiveList, deleteTodo } from './actions/actions';


const loadState = () => {
  try{
    let result = JSON.parse(localStorage.getItem('state'));
    return result ? {past: [], present: result, future: []} : undefined;
    
  }
  catch(err){
    return undefined;
  }
}

const saveState = (state) => {
  try{
    localStorage.setItem('state', JSON.stringify(state.present));
  }
  catch(err){
    // Log
  }
}


const reminderApp = combineReducers(
  {
    listsTodos: filterActions(listsTodos, (action) => action.type.match(/TODO/) ),
    notes: filterActions(notes, (action) => action.type.match(/NOTE/) ),
    visibilityFilter: filterActions (visibilityFilter, (action) => action.type.match(/SET_VISIBILITY/) )

  }
);


const store = createStore(undoable(reminderApp, {limit: 10}), loadState());

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

const getVisbleReminders = (reminders, visibilityFilter, search) => {
  let r = [];
  
  for (var i = 0; i < reminders.length; i++) {
    if ( (reminders[i].archived == false) && reminders[i].title.includes(search) ) {
      r.push(reminders[i])
    }
  }

  if (r.length > 0) {
    
    if (visibilityFilter === 'SHOW_ALL') {
      return r;
    }
    if (visibilityFilter === 'SHOW_NOTE' && (r[0].todos === undefined )) {
      
      return r;
    }
    if (visibilityFilter === 'SHOW_LIST' && (r[0].todos !== undefined )) {
      
      return r;
    }
    return [];
  }
  
  return r;
}

const Reminders = ({listsTodos, notes}) => 
  {
    return(
      <div class = 'container' >
        <div class = 'notas'>
          {
            notes.map( note => {
              return(
                <Note
                  key = {note.id}
                  id = {note.id}
                  note = {note}
                  onUpdate = {
                    (title) => {
                      store.dispatch(setNoteTitle(note.id, title, Date()) );
                    }
                  }
                  onArchive = {
                    () => {
                      store.dispatch( archiveNote(note.id, Date() ));
                    }
                  }
                />
              );
            })
          }
        </div>
        <div class = 'listas'>
          {
            listsTodos.map(listTodo => {
              return (
                <TodoList
                  key = {listTodo.id}
                  color = {listTodo.color}
                  todos = {getVisibleTodos(listTodo.todos, listTodo.visibilityFilter) }
                  title = {listTodo.title}
                  id = {listTodo.id}
                  currentVisibilityFilter = {listTodo.visibilityFilter}
                  onTodoClicked = {
                    (todo) =>{
                      store.dispatch(toggleTodo(todo.id, listTodo.id, Date() ));
                    }
                  }
                  onUpdate = {
                    (title) => {
                      store.dispatch( setTodoListTitle(listTodo.id, title, Date()) );
                    }
                  }
                  onArchive = {
                    () => {
                      store.dispatch( archiveList(listTodo.id, Date() ));
                    }
                  }
                  onFilterClicked = {
                    (v,i) => {
                      store.dispatch( setTodoListVisibilityFilter(i, v, Date() ));
                    }
                  }
                  onAddTodo = {
                    (i, t, li, m ) => {
                      store.dispatch( addTodo(i, t, li, m ) );
                    }
                  }
                  onTodoRemove = {
                    (todo) => {
                      store.dispatch( deleteTodo(todo.id, listTodo.id, Date()) );
                    }
                  }
                />
              );
            })
          }
        </div>
      </div>
    );
  }

const RemindersApp = ({listsTodos, notes, visibilityFilter}) => (
  <div>
    <GeneralFooter
      currentVisibilityFilter = {visibilityFilter.visibilityFilter}
      onFilterClicked = {
        (f) => {
          store.dispatch(setVisibilityFilter(f) );
        }
      }
      undo = {
        ()=> {
          store.dispatch(ActionCreators.undo() );
        }
      }
      redo = {
        ()=> {
          store.dispatch(ActionCreators.redo() );
        }
      }
    />

    <SearchReminder
      search = {visibilityFilter.search}
      onSearch = {
        (inp) => {
          store.dispatch( searchReminder(inp) );
        }
      }
    />
    <AddReminder
      onAddNote = {
        (creation,modification,id,color,title,content,archived) => {
          store.dispatch( addNote(creation,modification,id,color,title,content,archived) );
        }
      }
      onAddList = {  
        (creation,modification,id,color,title,archived) => {
          store.dispatch( addTodoList(creation,modification,id,color,title,archived) );
        }
      }
    />
    <Reminders 
      listsTodos = {getVisbleReminders(listsTodos, visibilityFilter.visibilityFilter, visibilityFilter.search)}
      notes = {getVisbleReminders(notes, visibilityFilter.visibilityFilter, visibilityFilter.search)}
      />
    
  </div>
);

const render = () => {
  ReactDOM.render(
     <RemindersApp
      { ...store.getState().present } />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);
/*
const deb = () => {
  console.log(store.getState().present);
}
deb();
store.subscribe(deb);
*/
store.subscribe(() => {
  saveState(store.getState());
});
