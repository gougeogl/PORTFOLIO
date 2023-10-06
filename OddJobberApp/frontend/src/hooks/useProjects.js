/***********************************************************************************
 ◘ filename: useProjects.js 
 ◘ Description:
    Collection of functions used to make backend api calls for 'Project'
    data manipulation in the OddJobber App. The hook acts as a type of frontend api. 
    Errors are dispatched to the custom global error state object.
 ***********************************************************************************/

// React
import { useState } from "react";

// Custom Hooks
import useErrorContext from "./useErrorContext";
import useProjectsContext from "./useProjectsContext";
import useAuthenticationContext from "./useAuthenticationContext";

const useProjects = () => {
    const { user } = useAuthenticationContext();
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch: dispatchErrors } = useErrorContext(); 
    const { projects, dispatch: dispatchProjects } = useProjectsContext();

    // GET all projects
    const getProjects = async() => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/project/all', {
                method: 'GET',
                headers: { 'csrf-token': user.csrfToken }
            });
            const projects = await req.json();

            if(!req.ok){
                throw projects;
            } else if(req.ok){
                setIsLoading(false);
                dispatchProjects({ type: 'SET_PROJECTS', projects: projects });
            }
            
        } catch(error){
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // GET one project
    const getProjectById = async(id) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/project/id/' + id, {
                method: 'GET',
                headers: { 'csrf-token': user.csrfToken }
            });
            const project = await req.json();

            if(!req.ok){
                throw project;
            } else if(req.ok){
                setIsLoading(false);
                return project;
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // CREATE project
    const createProject = async(contact_id, description, deadline, csrf) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/project/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contact_id,
                    description,
                    deadline,
                    csrf
                })
            });
            const project = await req.json();

            if(!req.ok){
                throw project;
            } else if(req.ok){
                dispatchProjects({ type: 'ADD_PROJECT', project: project });
                setIsLoading(false);
                getProjects();
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // UPDATE 1 project's attributes (except workers &/or skills)
    const updateProject = async(project_id, contact_id, description, deadline, status, csrf) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/project/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    project_id,
                    contact_id,
                    description,
                    deadline,
                    status,
                    csrf
                })
            });
            const updatedProject = await req.json();

            if(!req.ok){
                throw updatedProject;
            } else if(req.ok){
                dispatchProjects({ type: 'UPDATE_PROJECT', project: updatedProject });
                setIsLoading(false);
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // UPDATE add 1 worker to project
    const addWorker = async(project_id, worker_id, csrf) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/project/add-worker', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    project_id,
                    worker_id,
                    csrf
                })
            });
            const updatedProject = await req.json();

            if(!req.ok){
                throw updatedProject;
            } else if(req.ok){
                dispatchProjects({ type: 'UPDATE_PROJECT', project: updatedProject})
                setIsLoading(false);
                getProjects();
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // UPDATE remove 1 worker from project
    const removeWorker = async(project_id, worker_id, csrf) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/project/remove-worker', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    project_id,
                    worker_id,
                    csrf
                })
            });
            const updatedProject = await req.json();

            if(!req.ok){
                throw updatedProject
            } else if(req.ok){
                dispatchProjects({ type: 'UPDATE_PROJECT', project: updatedProject });
                setIsLoading(false);
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // UPDATE add 1 skill to project
    const addProjectSkill = async(project_id, skill_id, csrf) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/project/add-skill', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    project_id,
                    skill_id,
                    csrf
                })
            });
            const updatedProject = await req.json();

            if(!req.ok){
                throw updatedProject
            } else if(req.ok){
                dispatchProjects({ type: 'UPDATE_PROJECT', project: updatedProject });
                setIsLoading(false);
                getProjects();
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // UPDATE remove 1 skill from project
    const removeProjectSkill = async(project_id, skill_id, csrf) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/project/remove-skill', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    project_id,
                    skill_id,
                    csrf
                })
            });
            const updatedProject = await req.json();

            if(!req.ok){
                throw updatedProject
            } else if(req.ok){
                dispatchProjects({ type: 'UPDATE_PROJECT', project: updatedProject });
                setIsLoading(false);
                getProjects();
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    // DELETE project
    const deleteProject = async(id, csrf) => {
        try {
            setIsLoading(true);
            dispatchErrors({ type: 'CLEAR_ERROR' });

            const req = await fetch('/api/project/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, csrf })
            });
            const project = await req.json();

            if(!req.ok){
                throw project;
            } else if(req.ok){
                dispatchErrors({ type: 'CLEAR_ERROR' });
                dispatchProjects({ type: 'REMOVE_PROJECT', project: project });
                setIsLoading(false);
            }

        } catch(error) {
            dispatchErrors({ type: 'SET_ERROR', payload: error.errors });
            setIsLoading(false);
        }
    }

    return { 
        isLoading,
        projects,
        getProjects, 
        getProjectById,
        createProject,
        updateProject,
        addWorker,
        removeWorker,
        addProjectSkill,
        removeProjectSkill,
        deleteProject
    }
}

export default useProjects;