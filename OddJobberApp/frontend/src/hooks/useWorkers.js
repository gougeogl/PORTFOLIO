/***********************************************************************************
 ◘ filename: useWorkers.js 
 ◘ Description:
    Collection of functions used to make backend api calls for 'Worker'
    data manipulation in the OddJobber App. The hook acts as a type of frontend api. 
    Errors are dispatched to the custom global error state object.
 ************************************************************************************/
import { useState } from "react";
import useErrorContext from "./useErrorContext";
import useAuthenticationContext from "./useAuthenticationContext";
import useWorkersContext from "./useWorkersContext";

const useWorkers = () => {
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch: dispatchError } = useErrorContext(); 
    const { user: currentUser } = useAuthenticationContext();
    const { workers, dispatch: dispatchWorkers } = useWorkersContext();  

    // GET all users
    const getUsers = async() => {
        try {
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/user/all', {
                method: 'GET',
                headers: { 'csrf-token': currentUser.csrfToken }
            });
            const users = await req.json();

            if(!req.ok){
                throw users
            } else if(req.ok){

                let filteredWorkers = users.filter((user) => user._id !== currentUser._id);
                dispatchWorkers({ type: 'SET_WORKERS', workers: filteredWorkers });
                setIsLoading(false);
            }
            
        } catch(error){
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // GET one user [returns the user, DOES NOT affect current front-end state]
    const getUserById = async(id) => {
        try {
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/user/id/' + id, {
                method: 'GET',
                headers: { 'csrf-token': currentUser.csrfToken }
            });
            const user = await req.json();

            if(!req.ok){
                throw user;
            } else if(req.ok){
                setIsLoading(false);
                return user; 
            }

        } catch(error) {
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // UPDATE user rating
    const rateUser = async(id, rating, csrf) => {
        try {
            setIsLoading(true);
            dispatchError({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/user/update/rating', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    rating,
                    csrf
                })
            });
            const userUpdate = await req.json();

            if(!req.ok){
                throw userUpdate;
            } else if(req.ok){
                dispatchWorkers({ type: 'UPDATE_WORKER', worker: userUpdate });
                setIsLoading(false);
            }

        } catch(error) {
            dispatchError({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    return { 
        isLoading,
        workers,
        getUsers, 
        getUserById,
        rateUser
    }
}

export default useWorkers;