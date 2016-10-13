const addTodoList = (create, modification, id, color, title) => (
  {
    type: 'ADD_TODO_LIST',
    payload:{
      create,
      modification,
      id,
      color,
      title
    }
  }
);

const addNote = (creation, modification, id, color, title, content) => (
  {
    type: 'ADD_NOTE',
    payload: {
      creation,
      modification,
      id,
      color,
      title,
      content
    }
  }
);

const setNoteTitle = (id, title, modification) =>(
  {
    type: 'SET_NOTE_TITLE',
    payload:{
      id,
      title,
      modification
    }
  }
);

const toggleTodo = (id, listID, modification) =>(
  {
    type:'TOGGLE_TODO',
    payload:{
      id,
      listID,
      modification
    }
  }
);

const setTodoListTitle = (id, title, modification) => (
  {
    type: 'SET_TODOLIST_TITLE',
    payload: {
      id,
      title,
      modification
    }
  }
);

const addTodo = (id, text, listID, modification) => (
  {
    type: 'ADD_TODO',
    payload: {
      id,
      text,
      listID,
      modification
    }
  }
);

const setTodoListVisibilityFilter = (id, visibilityFilter, modification) => (
  {
    type : 'SET_TODOLIST_VISIBILITY_FILTER',
    payload: {
      id,
      visibilityFilter,
      modification
    }
  }
);

const searchReminder = (search) => (
  {
    type: 'SET_VISIBILITY_SEARCH',
    payload: {
      search
    }
  }
);

const setVisibilityFilter = (visibilityFilter) => (
  {
    type : 'SET_VISIBILITY_FILTER',
    payload: {
      visibilityFilter
    }
  }
);

const archiveNote = (id, modification) => (
  {
    type: 'ARCHIVE_NOTE',
    payload: {
      id,
      modification,
      archived: true
    }
  }
);

const archiveList = (id, modification) => (
  {
    type: 'ARCHIVE_TODOLIST',
    payload: {
      id,
      modification,
      archived: true
    }
  }
);

const deleteTodo = (id, listID, modification) =>(
  {
    type:'DELETE_TODO',
    payload:{
      id,
      listID,
      modification
    }
  }
);

export {
  addTodoList,
  addNote,
  setNoteTitle,
  toggleTodo,
  setTodoListTitle,
  addTodo,
  setTodoListVisibilityFilter,
  searchReminder,
  setVisibilityFilter,
  archiveNote,
  archiveList,
  deleteTodo
}