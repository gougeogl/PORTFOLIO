/*********************************************************************************
 ◘ filename: useAuthenticationContext.js 
 ◘ Description:
    Custom hook that provides access to the global user authentication state. 
    Used throughout the OddJobber App to enforce authentication and/or
    authorization.
 *********************************************************************************/
import { useContext } from "react";
import { AuthenticationContext } from "../contexts/Authentication.context";

const useAuthenticationContext = () => {
    const context = useContext(AuthenticationContext);
    if(!context){
        throw new Error('useAuthenticationContext must be used within an AuthenticationContextProvider component');
    }
    return context;
}

export default useAuthenticationContext;