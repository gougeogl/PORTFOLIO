/*************************************************************
 ◘ filename: Projects.context.jsx 
 ◘ Description:
    Global React state for Projects. Includes the
    needed reducer, context object, and context provider
    wrapper needed. Used by the OddJobber App. 
 *************************************************************/

// React
import { createContext, useReducer } from "react";

const ProjectsContext = createContext();

const projectsReducer = (state, action) => {
    switch(action.type){
        case 'SET_PROJECTS':
            return {
                projects: action.projects
            }
        case 'ADD_PROJECT':
            return {
                projects: [action.project, ...state.projects]
            }
        case 'REMOVE_PROJECT': 
            const filteredProjects = state.projects.filter(project => project._id !== action.project._id);
            return {
                projects: [...filteredProjects]
            }
        case 'UPDATE_PROJECT':
            const updatedProjects = state.projects.map((project) => {
                if(project._id === action.project._id){
                    return action.project;
                }
                return project;
            });
            return {
                projects: updatedProjects
            }
        case 'CLEAR_PROJECTS':
            return {
                projects: []
            }
        default:
            return state;
    }
}

const ProjectsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(projectsReducer, {
        projects: []
    })

    return(
        <ProjectsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </ProjectsContext.Provider>
    );
}

export { ProjectsContext, projectsReducer, ProjectsContextProvider }