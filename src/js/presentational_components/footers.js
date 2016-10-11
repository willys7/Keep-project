import React from 'react';
import { FilterLink, TimeTravel  } from './filter';

const Footer = ({ currentVisibilityFilter, onFilterClicked, listID }) => (
  <div class="todoFilter">
    Show:
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
      listID={ listID }>All</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_COMPLETED"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
      listID={ listID }>Completed</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_ACTIVE"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
      listID={ listID }>Active</FilterLink>
  </div>
);

const GeneralFooter = ({ currentVisibilityFilter, onFilterClicked, undo, redo }) => (
  <div class="show_notes_todos">
    Show:
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
    >All</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_NOTE"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
    >Notes</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_LIST"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
    >Todo-list</FilterLink>
    <TimeTravel 
      undo = {undo}
      redo = {redo}
    />
  </div>
);

export {Footer, GeneralFooter};