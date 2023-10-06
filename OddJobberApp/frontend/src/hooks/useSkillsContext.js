/************************************************************************************
 ◘ filename: useSkillsContext.js 
 ◘ Description:
    Custom hook that provides access to the global skills state in the OddJobber App 
 ************************************************************************************/
import { useContext } from "react";
import { SkillsContext } from "../contexts/Skills.context";

const useSkillsContext = () => {
    const context = useContext(SkillsContext);
    if(!context){
        throw new Error('useSkillsContext must be used within an SkillsContextProvider component');
    }
    return context;
}

export default useSkillsContext;