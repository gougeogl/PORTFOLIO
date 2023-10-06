/**************************************************************************************
 ◘ filename: useProjectsContext.js 
 ◘ Description:
    Custom hook that provides access to the global projects state in the OddJobber App 
 ***************************************************************************************/
import { useContext } from "react";
import { ProjectsContext } from "../contexts/Projects.context";

const useProjectsContext = () => {
    const context = useContext(ProjectsContext);
    if(!context){
        throw new Error('useProjectsContext must be used within an ProjectsContextProvider component');
    }
    return context;
}

export default useProjectsContext;