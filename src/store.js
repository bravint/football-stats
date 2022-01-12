import { createContext } from 'react'

export const StoreContext = createContext();

export const initialState = {
    filteredMatches: [],
    postponedMatches: [],
    cancelledMatches: [],
    matchStatus: 'all',
    sortType: 'date'
  }

export const filteredMatchesReducer = (state, action) => {
    switch (action.type) {
        case "update/filteredMatches":
            const updatedState = action.payload
            return updatedState
        default: 
            return state   
    }
}

export const postponedMatchesReducer = (state, action) => {
    switch (action.type) {
        case "update/postponedMatches":
            const updatedState = action.payload
            return updatedState
        default: 
            return state   
    }
}

export const cancelledMatchesReducer = (state, action) => {
    switch (action.type) {
        case "update/cancelledMatches":
            const updatedState = action.payload
            return updatedState
        default: 
            return state   
    }
}

export const matchStatusReducer = (state, action) => {
    switch (action.type) {
        case "update/matchStatus":
            const updatedState = action.payload
            return updatedState
        default: 
            return state   
    }
}

export const sortTypeReducer = (state, action) => {
    switch (action.type) {
        case "update/sortType":
            const updatedState = action.payload
            return updatedState
        default: 
            return state   
    }
}

const combineReducers = reducers => {
    return (state = {}, action) => {
      const newState = {}
      for (let key in reducers) {
        newState[key] = reducers[key](state[key], action)
      }
      return newState
    }
  }
  
  export const rootReducer = combineReducers({
    filteredMatches: filteredMatchesReducer,
    postponedMatches: postponedMatchesReducer,
    cancelledMatches: cancelledMatchesReducer,
    matchStatus: matchStatusReducer,
    sortType: sortTypeReducer
  })
