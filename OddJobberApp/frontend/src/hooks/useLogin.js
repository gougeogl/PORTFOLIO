/****************************************************************
 ◘ filename: useLogin.js 
 ◘ Description:
    Custom hook used for logins in the OddJobber App. 
    The hook calls the backend api using Javascript's fetch api. 
    Failures are dispatched to the global error state.
 ***************************************************************/
import { useState } from "react";
import useAuthenticationContext from "./useAuthenticationContext";
import useErrorContext from "./useErrorContext";

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthenticationContext();
    const { dispatch: dispatchError } = useErrorContext(); 

    const login = async(username, password) => {
        try {
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR'});
    
            const req = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
            });
            const user = await req.json();

            if(!req.ok){
                throw user;
            } else if(req.ok){
                console.log(user);
                dispatch({ type: 'LOGIN', payload: user });
                setIsLoading(false);
            }

        } catch(error) {
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    return { login, isLoading }
}

export default useLogin;
