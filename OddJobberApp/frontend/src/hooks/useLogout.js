/****************************************************************
 ◘ filename: useLogout.js 
 ◘ Description:
    Custom hook used for logouts in the OddJobber App. 
    The hook calls the backend api using Javascript's fetch api. 
    Failures are dispatched to the global custom error state.
 ***************************************************************/
import useAuthenticationContext from "./useAuthenticationContext";
import useErrorContext from './useErrorContext';

const useLogout = () => {
    const { user, dispatch } = useAuthenticationContext();
    const { dispatch: dispatchError } = useErrorContext();

    const logout = async() => {
        dispatchError({ type: 'CLEAR_ERROR'});

        const req = await fetch('/api/user/logout', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'csrf-token': user.csrfToken 
            }
        });

        const json = await req.json();

        if(!req.ok){
            dispatchError({ type: 'SET_ERROR', payload: json.errors });
        } else if(req.ok){
            dispatch({ type: 'LOGOUT' });
        }
    }

    return logout;
}

export default useLogout;