/*************************************************************
 ◘ filename: Skills.context.jsx 
 ◘ Description:
    Global React state for Skills. Includes the
    needed reducer, context object, and context provider
    wrapper needed. Used by the OddJobber App. 
 *************************************************************/

// React
import { createContext, useReducer } from "react";

const SkillsContext = createContext();

const skillsReducer = (state, action) => {
    switch(action.type){
        case 'SET_SKILLS':
            return {
                skills: action.skills
            }
        case 'ADD_SKILL':
            return {
                skills: [...state.skills, action.skill]
            }
        case 'REMOVE_SKILL': 
            const filteredSkills = state.skills.filter(skill => skill._id !== action.skill._id);
            return {
                skills: [...filteredSkills]
            }
        case 'UPDATE_SKILL':
            const unalterdSkills = state.skills.filter(skill => skill._id !== action.skill._id);
            return {
                skills: [...unalterdSkills, action.skill]
            }
        case 'CLEAR_SKILLS':
            return {
                skills: []
            }
        default:
            return state;
    }
}

const SkillsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(skillsReducer, {
        skills: []
    })

    return(
        <SkillsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </SkillsContext.Provider>
    );
}

export { SkillsContext, skillsReducer, SkillsContextProvider }