/*********************************************************************
 ■ Filename: PageNav.jsx
 ◘ Description:
    • React Component
    • Mui Button group used to navigate across pages while maintaining
      the page context state

◘ Custom Dependencies: ø none
◘ State: √ 
    ○ Global : √ 
    ○ Local  : ø 
• Theme: √
**********************************************************************/

// 3rd Party
import { Link } from "react-router-dom";

// Custom Hooks
import usePageContext from "../../hooks/usePageContext";

// Mui Components
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Icons & Styling
import BungalowIcon from '@mui/icons-material/Bungalow';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { useTheme } from "@emotion/react";

const PageNav = () => {
    const theme = useTheme();
    const { tabIndex, dispatch } = usePageContext();

    const handleChange = (e, newValue) => {
        dispatch({ type: 'CHANGE_TABS', tabIndex: newValue });
    }
    
    return(
        <Tabs
            value={tabIndex}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            centered
            sx={{
                mt: '1vh',
                ml: '1%',
                mr: '1%',
                width: 'inherit',
                borderStyle: 'inset',
                borderWidth: 'thick',
                borderColor: theme.palette.primary.dark,
                borderRadius: '2px'
            }}
        >
            <PageTab value={0} label="Home" to="/" icon={<BungalowIcon />} />
            <PageTab value={1} label="About" to="/about" icon={<ImportContactsIcon />} />
            <PageTab value={2} label="Projects" to="/projects" icon={<ConstructionIcon />} />
            <PageTab value={3} label="Skills" to="/skills" icon={<CarpenterIcon />} />
            <PageTab value={4} label="Workers" to="/workers" icon={<EngineeringIcon />} />
        </Tabs>
    );
}

const PageTab = (props) => {
    return(
        <Tab
            component={Link}
            {...props}
        />
    );
}

export default PageNav;