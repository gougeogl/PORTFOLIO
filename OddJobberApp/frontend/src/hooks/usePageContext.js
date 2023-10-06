/************************************************************
 ◘ filename: usePageContext.js 
 ◘ Description:
    Custom hook that provides access to the global page 
    (tabIndex) state in the OddJobber App. 
    Used by the <PageNav> component. 
 ************************************************************/
import { useContext } from "react";
import { PageContext } from "../contexts/Page.context";

const usePageContext = () => {
    const context = useContext(PageContext);
    if(!context){
        throw new Error('usePageContext must be used within an PageContextProvider component');
    }
    return context;
}

export default usePageContext;