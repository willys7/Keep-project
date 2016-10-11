const visibilityFilter = (state = {visibilityFilter:'SHOW_ALL', search:''}, action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
    case 'SET_VISIBILITY_SEARCH':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export { visibilityFilter };