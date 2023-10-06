/************************************************************************
 ◘ filename: ProjectsPage.jsx 
 ◘ Description:
    Projects page for the OddJobber App. Contains forms to create a
    project or do searches for projects, skills, and workers.
 ************************************************************************/

// React
import { Fragment, useEffect } from "react";

// Custom Hooks
import useProjects from "../hooks/useProjects";

// Custom Components
import PageLayout from "../layouts/PageLayout";
import Project from "../components/projects/Project";
import CreateProjectForm from "../components/projects/CreateProjectForm";
import ProjectSearch from "../components/projects/ProjectSearch";
import SkillSearch from "../components/skills/SkillSearch";
import WorkerSearch from "../components/workers/WorkerSearch";

const SearchBlock = () => {
    return(
        <Fragment>
            <ProjectSearch />
            <SkillSearch />
            <WorkerSearch />
        </Fragment>
    )
}

const ProjectsPage = () => {
    const { projects, getProjects } = useProjects();

    useEffect(() => {
        const initProjects = async() => {
            await getProjects();
        }
        initProjects();
    }, []);

    return(
        <PageLayout 
            form={<CreateProjectForm />}
            search={<SearchBlock />}
        >
            {projects && projects.map((project) => (
                <Project key={project._id} project={project} />
            ))}
        </PageLayout>
    )
}

export default ProjectsPage;