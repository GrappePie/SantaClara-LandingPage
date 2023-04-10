import { createStore, applyMiddleware } from 'redux';
import { ThunkMiddleware } from 'redux-thunk';

// Define tu función reducer
function reducer(state = { hidden: false}, action) {
    switch (action.type) {
        case 'HIDE':
            return { ...state, hidden: true };
        case 'SHOW':
            return { ...state, hidden: false };
        default:
            return state;
    }
}

// Crea un store que use tu reducer y el middleware thunk
const store = createStore(reducer, applyMiddleware(ThunkMiddleware));

export default store;