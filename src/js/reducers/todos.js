const todo = (state = {}, action) => {
  
  switch(action.type) {
    case 'ADD_TODO':
      return {
        ...action.payload,
        completed: false
      };
    case 'TOGGLE_TODO':
      if(state.id === action.payload.id){
        return {
          ...state,
          completed: !state.completed
        };
      }

    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];

    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));

    case 'DELETE_TODO':
      let x = [];
      for (var i = 0; i < state.length; i++) {
        if (state[i].id !== action.payload.id) {
          x.push(state[i]);
        }
      }
      return x;
    default:
      return state;
  }
}

const listTodo = (state = {}, action) => {
  let a;
  switch (action.type){
    case 'ADD_TODO':
      if(state.id === action.payload.listID){
        a = {
          type: action.type,
          payload:{
            id:action.payload.id,
            text:action.payload.text,
            listID:action.payload.listID
          }
        };
        
        return {
          ...state,
          todos:todos(state.todos, a ),
          modification: action.payload.modification
        }
      }

      
    case 'SET_TODOLIST_VISIBILITY_FILTER':
      if(state.id === action.payload.id){
        a = {
          type: 'SET_VISIBILITY_FILTER',
          payload: {
            visibilityFilter: action.payload.visibilityFilter
          }
        }
        return {
          ...state,
          visibilityFilter: action.payload.visibilityFilter,
          modification: action.payload.modification
        };
      }

    case 'TOGGLE_TODO':
    case 'DELETE_TODO':
      if(state.id === action.payload.listID){
        
        return {
          ...state,
          todos: todos(state.todos, action),
          modification: action.payload.modification
        };
      }

    case 'SET_TODOLIST_COLOR':
    case 'SET_TODOLIST_TITLE':
    case 'ARCHIVE_TODOLIST':
      if(state.id === action.payload.id){
        return{
          ...state,
          ...action.payload

        }
      }
    default:
      return state;
  }
}

const listsTodos  = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO_LIST':
      return [...state,
        {
          ...action.payload,
          archived: false,
          todos:[],
          visibilityFilter : 'SHOW_ALL'
        }
      ]

    case 'ADD_TODO':
    case 'TOGGLE_TODO':
    case 'SET_TODOLIST_TITLE':
    case 'DELETE_TODO':
    case 'SET_TODOLIST_VISIBILITY_FILTER':
    case 'SET_TODOLIST_COLOR':
    case 'ARCHIVE_TODOLIST':
      return state.map( lista => listTodo(lista, action));
    default:
      return state;
  }
}

export { todos };
export {listsTodos};