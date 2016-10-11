const note = (state ={}, action) => {
	switch(action.type){
		case 'ADD_NOTE':
			return {
				...action.payload,
				archived: false
			};

		case 'SET_NOTE_TITLE':
			if (state.id === action.payload.id) {
				return {
					...state,
					...action.payload
					
					
				}
			}
			
		case 'SET_NOTE_COLOR':
			if (state.id === action.payload.id) {
				return {
					...state,
					color: action.payload.newcolor,
					modification: action.payload.modification

				}
			}

		case 'ARCHIVE_NOTE':
			if (state.id === action.payload.id) {
				return {
					...state,
					...action.payload
				}
			}
		default:
			return state;
	}
}

const notes = (state = [], action) =>{
	switch(action.type){
		case 'ADD_NOTE':
			return [...state,
				note(undefined, action)
			]

		case 'ARCHIVE_NOTE':
		case 'SET_NOTE_TITLE':
		case 'SET_NOTE_COLOR':
			return state.map( n => note(n,action))
		default:
			return state;
	}
}

export {notes};
