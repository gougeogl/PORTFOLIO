/***********************************************************************************
 ◘ filename: useSkills.js 
 ◘ Description:
    Collection of functions used to make backend api calls for 'Skill'
    data manipulation in the OddJobber App. The hook acts as a type of frontend api. 
    Errors are dispatched to the custom global error state object.
 ***********************************************************************************/
import { useState } from "react";
import useErrorContext from "./useErrorContext";
import useSkillsContext from "./useSkillsContext";

const useSkills = () => {
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch: dispatchErrors } = useErrorContext(); 
    const { skills, dispatch: dispatchSkills } = useSkillsContext();

    // GET all skills
    const getSkills = async() => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/skill/all');
            const skills = await req.json();

            if(!req.ok){
                throw skills
            } else if(req.ok){
                dispatchSkills({ type: 'SET_SKILLS', skills: skills });
                setIsLoading(false);
            }
            
        } catch(error){
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // GET one skill
    const getSkillByName = async(name) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/skill/name/' + name);
            const user = await req.json();

            if(!req.ok){
                throw user;
            } else if(req.ok){
                setIsLoading(false);
                return user;
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // CREATE skill
    const createSkill = async(name, description, level, csrf) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/skill/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    description,
                    level,
                    csrf
                })
            });
            const skill = await req.json();

            if(!req.ok){
                throw skill;
            } else if(req.ok){
                dispatchSkills({ type: 'ADD_SKILL', skill: skill })
                setIsLoading(false);
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // UPDATE skill
    const updateSkill = async(id, name, description, picture, level, csrf) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/skill/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    name,
                    description,
                    picture,
                    level,
                    csrf
                })
            });
            const updatedSkill = await req.json();

            if(!req.ok){
                throw updatedSkill;
            } else if(req.ok){
                dispatchSkills({ type: 'UPDATE_SKILL', skill: updatedSkill })
                setIsLoading(false);
                getSkills();
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // DELETE skill
    const deleteSkill = async(id, csrf) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/skill/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, csrf })
            });
            const skill = await req.json();

            if(!req.ok){
                throw skill;
            } else if(req.ok){
                dispatchErrors({ type: 'CLEAR_ERROR' });
                dispatchSkills({ type: 'REMOVE_SKILL', skill: skill });
                setIsLoading(false);
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    return { 
        isLoading,
        skills,
        getSkills, 
        getSkillByName,
        createSkill, 
        updateSkill,
        deleteSkill
    }
}

export default useSkills;