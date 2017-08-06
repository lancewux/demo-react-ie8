
import { combineReducers } from 'redux'

export default combineReducers({
  person,
  animal
})

const person = (state = [], action) => {
	switch (action.type) {
		case 'ADD': 
			return [...state, action.person]
		case 'DELETE':
			return state.slice(0, state.length - 2)
		default:
			return state
	}
}

const animal = (state = [], action) => {
	switch (action.type) {
		case 'ADD': 
			return [...state, action.animal]
		case 'DELETE':
			return state.length - 1 > 0 ? state.slice(0, state.length - 2) : []
		default:
			return state
	}
}
