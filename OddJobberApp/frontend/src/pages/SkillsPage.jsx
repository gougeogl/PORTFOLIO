/************************************************************************
 ◘ filename: SkillsPage.jsx 
 ◘ Description:
    Skills page for the OddJobber App. Contains forms to create or
    search for a skill
 ************************************************************************/

// React
import { useEffect } from "react";

// Custom Hooks
import useSkills from "../hooks/useSkills";

// Custom Components
import PageLayout from "../layouts/PageLayout";
import SkillForm from "../components/skills/SkillForm";
import Skill from '../components/skills/Skill';
import SkillSearch from "../components/skills/SkillSearch";

const SkillsPage = () => {
    const { skills, getSkills } = useSkills();
    
    useEffect(() => {
        const initSkills = async() => {
            await getSkills();
        }
        initSkills();
    }, []);
    
    return(
        <PageLayout 
            form={<SkillForm />}
            search={<SkillSearch />}
        >
            {skills && skills.map((skill) => (
                <Skill key={skill._id} skill={skill} />
            ))}
        </PageLayout>
    )
}

export default SkillsPage;