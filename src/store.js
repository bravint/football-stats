import { createContext } from 'react'

export const StoreContext = createContext();

export const URLReducer = (state, action) => {
    switch (action.type) {
        case "updateURL":
            const updatedState = action.payload
            return updatedState
        default: 
            return state   
    }
}