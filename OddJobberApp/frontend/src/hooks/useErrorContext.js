/****************************************************************
 ◘ filename: useErrorContext.js 
 ◘ Description:
    Custom hook that provides access to the global error state
    in the OddJobber App 
 ****************************************************************/
import { useContext } from "react";
import { ErrorContext } from "../contexts/Error.context";

const useErrorContext = () => {
    const context = useContext(ErrorContext);
    if(!context){
        throw new Error('useErrorContext must be used within and ErrorContextProvider component');
    }
    return context;
}

export default useErrorContext;