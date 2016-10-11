
import React from 'react';
import v4 from 'uuid-v4';

const AddTodo = ({color, listID, onAddTodo}) => {
  let remind;

  return (
    <div>
      <input 
        type="text"
        placeholder = 'Todo'
        ref={ node => remind = node }
        style = {
          {backgroundColor: color},
          {border : 'none'}
        }
      />
      <button
        onClick={
          () => { 
            if (remind.value !== '') {
              onAddTodo(v4(), remind.value, listID, Date() )
              remind.value = "";
            }
            
          }
        }
      >Add todo</button>
    </div>
  );
}

const AddReminder = ({onAddNote, onAddList}) => {
  let input;
  let title;
  return (
    <div class = 'add_container'>
      <div class = 'add-element'>
        <input class = 'titulo' type="text" placeholder = 'Título' ref={ node => title = node } />
        <input class = 'description' type="text" placeholder = 'Descripcion' ref={ node => input = node } />
      </div>
      <div class = 'note-todo'>
        <button class = 'add-todo'
          onClick={
            () => { 
              if (title.value !== '') {
                onAddList(Date(), Date(), v4(), '#FFD180', title.value, false);
                title.value = "";
              }
            }
          }
        >Nuevo Todo</button>
        <button class = 'add-note'
          onClick={
            () => { 
              if (title.value !== '' && input.value !== '') {
                onAddNote(Date(), Date(), v4(), '#A3E2C7', title.value, input.value, true);
                input.value = "";
                title.value = '';
              }
            }
          }
        >Nueva nota</button>
      </div>
    </div>
  );
}

const SearchReminder = ({search, onSearch}) => {
  let input;
  return (
    <div class = 'container'>
      <div class = 'search-bar'>
        <input 
          type="text"
          placeholder = 'Búsqueda'
          ref={ node => input = node }
          defaultValue = {search}
          onChange = {
            () => {
              onSearch(input.value);
            }
          }
        />
        <div class ='clear'></div>
      </div>
    </div>
  );
}

export { AddTodo, AddReminder, SearchReminder };