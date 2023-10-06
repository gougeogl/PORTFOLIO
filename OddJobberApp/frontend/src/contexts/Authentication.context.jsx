/*************************************************************
 ◘ filename: Authentication.context.jsx 
 ◘ Description:
    Global React state for Authentication. Includes the
    needed reducer, context object, and context provider
    wrapper needed. Used by the OddJobber App. 
 *************************************************************/

// React
import { useEffect, createContext, useReducer } from "react";

const AuthenticationContext = createContext();

const authenticationReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'UPDATE':
            return {
                user: action.update
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state;
    }
}

const AuthenticationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authenticationReducer, {
        user: null
    })

    useEffect(() => {
        const authenticate = async() => {
            const req = await fetch('/api/user/authenticate', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                }
            });
            const user = await req.json();

            if(req.ok){
                dispatch({ type: 'LOGIN', payload: user });
            }
        }

        authenticate();

    }, []);

    return(
        <AuthenticationContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthenticationContext.Provider>
    );
}

export { AuthenticationContext, authenticationReducer, AuthenticationContextProvider }