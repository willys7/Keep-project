import React from 'react';
import { Title, ArchiveMe } from './filter';


const Note = ({ note, onUpdate, id, onArchive, create, update }) => (
  <div 
    class = 'element'
    style={ {backgroundColor: 'yellow' }}
  >
    <Title 
      text= {note.title}
      onUpdate = {onUpdate}
      id = {id}
      color = {note.color}
    />
    
    <div class = 'clear'></div>
    <div >{note.content}</div>
    <ArchiveMe
      onArchive = {onArchive}
    />
  <div>
  </div>
  {create}
  </div>
);

export {Note};

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