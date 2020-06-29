const initialState = {
    entries: [],
    posts: []
}

//action types
const ENTRIES = 'ENTRIES'

//action creators
export function getEntries(entries) {
    return {
        type: ENTRIES,
        payload: entries
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ENTRIES:
            return {...state, entries: action.payload}
        default:
            return state
    }
}