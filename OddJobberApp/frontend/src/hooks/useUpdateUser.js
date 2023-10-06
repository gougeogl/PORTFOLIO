/***********************************************************************************
 ◘ filename: useUpdateUser.js 
 ◘ Description:
    Collection of functions used to make backend api calls for 'User'
    data manipulation in the OddJobber App. The hook acts as a type of frontend api. 
    Errors are dispatched to the custom global error state object.
 ***********************************************************************************/
import { useState } from "react";
import useAuthenticationContext from "./useAuthenticationContext";
import useErrorContext from "./useErrorContext";

const useUpdateUser = () => {
    const [isLoading, setIsLoading] = useState(null);
    const { user, dispatch } = useAuthenticationContext();
    const { dispatch: dispatchError } = useErrorContext(); 

    //******************************************************
    const updateUsername = async(old_username, password, new_username, csrf) => {
        try{
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR'});

            const req = await fetch('/api/user/update/username', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    old_username,
                    password,
                    new_username,
                    csrf
                })
            });
            const user = await req.json();

            if(!req.ok){
                throw user;
            } else if(req.ok){
                dispatch({ type: 'UPDATE', update: user });
                setIsLoading(false);
            }

        } catch(error){
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }
    
    //****************************************************** 

    const updateUserPassword = async(username, old_password, new_password, csrf) => {
        try{
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR'});

            const req = await fetch('/api/user/update/password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    old_password,
                    new_password,
                    csrf
                })
            });
            const user = await req.json();

            if(!req.ok){
                throw user;
            } else if(req.ok){
                dispatch({ type: 'UPDATE', update: user });
                setIsLoading(false);
            }

        } catch(error){
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    const updateUserAttrs = async(
        id,
        firstName,
        lastName,
        picture,
        email,
        cell,
        street,
        city,
        state,
        zipcode,
        csrf
    ) => {
        try {
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR'});
    
            const req = await fetch('/api/user/update/attributes', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    id,
                    firstName,
                    lastName,
                    picture,
                    email,
                    cell,
                    street,
                    city,
                    state,
                    zipcode,
                    csrf,
                })
            });
            const user = await req.json();

            if(!req.ok){
                throw user;
            } else if(req.ok){
                dispatch({ type: 'UPDATE', update: user });
                setIsLoading(false);
            }

        } catch(error) {
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    const updateUserHourlyRate = async(username, password, hourly_rate, csrf) => {
        try{
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR'});

            const req = await fetch('/api/user/update/hourly-rate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    hourly_rate, 
                    csrf
                })
            });
            const user = await req.json();

            if(!req.ok){
                throw user;
            } else if(req.ok){
                dispatch({ type: 'UPDATE', update: user });
                setIsLoading(false);
            }

        } catch(error){
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    const addUserSkill = async(user_id, skill_id, csrf) => {
        try {
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR'});

            const req = await fetch('/api/user/update/skill/add', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id,
                    skill_id,
                    csrf
                })
            });
            const user = await req.json();

            if(!req.ok){
                throw user;
            } else if(req.ok){
                dispatch({ type: 'UPDATE', update: user });
                setIsLoading(false);
            }

        } catch(error){
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    const removeUserSkill = async(user_id, skill_id, csrf) => {
        try {
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR'});

            const req = await fetch('/api/user/update/skill/remove', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id,
                    skill_id,
                    csrf
                })
            });
            const user = await req.json();

            if(!req.ok){
                throw user;
            } else if(req.ok){
                dispatch({ type: 'UPDATE', update: user });
                setIsLoading(false);
            }
        } catch(error){
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    const deleteAccount = async(username, password, csrf) => {
        try {
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR'});

            const req = await fetch('/api/user/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username,
                    password,
                    csrf
                })
            });
            const user = await req.json();

            if(!req.ok){
                throw user;
            } else if(req.ok){
                dispatch({ type: 'UPDATE', update: user });
                dispatch({ type: 'LOGOUT' });
                setIsLoading(false);
            }

        } catch(error){
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    return { 
        isLoading,
        user, 
        updateUsername,
        updateUserPassword,
        updateUserHourlyRate,
        addUserSkill,
        removeUserSkill,
        updateUserAttrs,
        deleteAccount
    }
}

export default useUpdateUser;