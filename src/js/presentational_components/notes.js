import React from 'react';
import { Title, ArchiveMe } from './filter';


const Note = ({ note, onUpdate, id, onArchive }) => (
  <div 
    class = 'element'
    style={ {backgroundColor: note.color }}
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