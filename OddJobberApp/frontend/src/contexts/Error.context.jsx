/*************************************************************
 ◘ filename: Error.context.jsx 
 ◘ Description:
    Global React state for showing errors. Includes the
    needed reducer, context object, and context provider
    wrapper needed. Used by the OddJobber App. 

 ○ Notice: This context is called by custom hooks to update
           the error state

 ◘ Coupling:
    Component: <ErrorPane>
 *************************************************************/
import { createContext, useReducer } from "react";

const ErrorContext = createContext();

const errorReducer = (state, action) => {
    switch(action.type){
        case 'SET_ERROR':
            return {
                errors: action.payload,
                showErrors: true
            }
        case 'CLEAR_ERROR':
            return {
                errors: [],
                showErrors: false
            }
        default:
            return state;
    }
}

const ErrorContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(errorReducer, {
        errors: [],
        showErrors: false
    });

    return(
        <ErrorContext.Provider value={{ ...state, dispatch }}>
            { children }
        </ErrorContext.Provider>
    )
}

export { ErrorContext, errorReducer, ErrorContextProvider }