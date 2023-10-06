/*************************************************************
 ◘ filename: Page.context.jsx 
 ◘ Description:
    Global React state for the PageNav component. Includes the
    needed reducer, context object, and context provider
    wrapper needed. Used by the OddJobber App. 

 ◘ Coupling:
    Component: <PageNav>
 *************************************************************/

// React
import { createContext, useReducer } from "react";

const PageContext = createContext();

const pageReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_TABS':
            return {
                tabIndex: action.tabIndex
            }
        default:
            return state;
    }
}

const PageContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pageReducer, { 
        tabIndex: 0
    });

    return(
        <PageContext.Provider value={{ ...state, dispatch }}>
            { children }
        </PageContext.Provider>
    );
}

export { PageContext, pageReducer, PageContextProvider }