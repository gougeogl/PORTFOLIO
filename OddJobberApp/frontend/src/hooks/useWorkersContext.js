/**********************************************************************************
 ◘ filename: useWorkersContext.js 
 ◘ Description:
    Custom hook to provide access to the global workers state in the OddJobber App 
 ***********************************************************************************/
import { useContext } from "react";
import { WorkersContext } from "../contexts/Workers.context";

const useWorkersContext = () => {
    const context = useContext(WorkersContext);
    if(!context){
        throw new Error('useWorkersContext must be used within an WorkersContextProvider component');
    }
    return context;
}

export default useWorkersContext;