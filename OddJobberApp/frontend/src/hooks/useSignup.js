/*******************************************************************
 ◘ filename: useSignup.js 
 ◘ Description:
    Custom hook used for account registration in the OddJobber App. 
    The hook calls the backend api using Javascript's fetch api. 
    Failures are dispatched to the global error state.
 *******************************************************************/
import { useState } from "react";
import useAuthenticationContext from "./useAuthenticationContext";
import useErrorContext from "./useErrorContext";

const useSignup = () => {
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthenticationContext();
    const { dispatch: dispatchError } = useErrorContext(); 

    const signup = async(
        username,
        password,
        firstName,
        lastName,
        picture,
        email,
        cell,
        street,
        city,
        state,
        zipcode
        ) => {
        try {
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR'});
    
            const req = await fetch('/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    username,
                    password,
                    firstName,
                    lastName,
                    picture,
                    email,
                    cell,
                    street,
                    city,
                    state,
                    zipcode
                 })
            });
            const user = await req.json();
    
            if(!req.ok){
                throw user
            } else if(req.ok){
                dispatch({ type: 'LOGIN', payload: user });
                setIsLoading(false);
            }
        } catch(error) {
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    return { signup, isLoading }
}

export default useSignup;