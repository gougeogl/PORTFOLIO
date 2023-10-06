/************************************************************************
 ◘ filename: AboutPage.jsx 
 ◘ Description:
    Page describing the OddJobber App for employers in terms of 
    function and design. Consists of 3 primary section:
        1. Description
        2. Design
        3. Documentation
 ************************************************************************/

// Custom Component: Layout
import HomeLayout from '../layouts/HomeLayout';

// Mui Components
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Link from '@mui/material/Link';

// IMAGES: AuthN components 
import DataFlow from '../images/documentation/flow/TypicalDataFlow.png';
import AuthNFlow from '../images/documentation/flow/AuthenticationFlowDiagram.png';
import ErrorFlow from '../images/documentation/flow/ErrorStateFlowDiagram.png';
import CSRFProtectionFlow from '../images/documentation/flow/CSRFProtectionFlow.png';
import ContextArch from '../images/documentation/context/ReactContextStateArchitectureCustomHooks.png';
import Contexts from '../images/documentation/context/Contexts.png';
import PageOrg from '../images/documentation/PageOrganization.png';
import ComponentCats from '../images/documentation/components/ComponentsCategories.png';
import AddSkillForm from '../images/documentation/components/AuthN/AddUserSkillForm.png';
import DeleteAccountForm from '../images/documentation/components/AuthN/DeleteAccountForm.png';
import ErrorPane from '../images/documentation/components/AuthN/ErrorPane.png';
import LoginForm from '../images/documentation/components/AuthN/LoginForm.png';
import SignupForm from '../images/documentation/components/AuthN/SignupForm.png';
import UpdateUserAttrsForm from '../images/documentation/components/AuthN/UpdateUserAttrsForm.png';
import UpdateUsernameForm from '../images/documentation/components/AuthN/UpdateUsernameForm.png';
import UpdateUserPasswordForm from '../images/documentation/components/AuthN/UpdateUserPasswordForm.png';
import UpdateUserPayRateForm from '../images/documentation/components/AuthN/UpdateUserPayRateForm.png';

// IMAGES: general components 
import CollapseWithButton from '../images/documentation/components/general/CollapseWithButton.png';
import CustomField from '../images/documentation/components/general/CustomField.png';
import DottedDivider from '../images/documentation/components/general/DottedDivider.png';
import LayoutGrid from '../images/documentation/components/general/LayoutGrid.png';
import ModalFormWrapper from '../images/documentation/components/general/ModalFormWrapper.png';
import Navbar from '../images/documentation/components/general/Navbar.png';
import PageNav from '../images/documentation/components/general/PageNav.png';
import RemoveButton from '../images/documentation/components/general/RemoveButton.png';

// IMAGES: project components 
import AddProjectSkillForm from '../images/documentation/components/projects/AddProjectSkillForm.png';
import AddProjectWorkerForm from '../images/documentation/components/projects/AddProjectWorkerForm.png';
import CreateProjectForm from '../images/documentation/components/projects/CreateProjectForm.png';
import Project from '../images/documentation/components/projects/Project.png';
import ProjectContents from '../images/documentation/components/projects/ProjectContents.png';
import ProjectSearch from '../images/documentation/components/projects/ProjectSearch.png';
import ProjectStatus from '../images/documentation/components/projects/ProjectStatus.png';
import UpdateProjectForm from '../images/documentation/components/projects/UpdateProjectForm.png';

// IMAGES: skills components 
import Skill from '../images/documentation/components/skills/Skill.png';
import SkillForm from '../images/documentation/components/skills/SkillForm.png';
import SkillLevel from '../images/documentation/components/skills/SkillLevel.png';
import SkillSearch from '../images/documentation/components/skills/SkillSearch.png';
import SkillsTable from '../images/documentation/components/skills/SkillsTable.png';
import UpdateSkillForm from '../images/documentation/components/skills/UpdateSkillForm.png';

// IMAGES: workers component 
import AddressTable from '../images/documentation/components/workers/AddressTable.png';
import PayRate from '../images/documentation/components/workers/PayRate.png';
import UserContact from '../images/documentation/components/workers/UserContact.png';
import Worker from '../images/documentation/components/workers/Worker.png';
import WorkerSearch from '../images/documentation/components/workers/WorkerSearch.png';
import WorkersTable from '../images/documentation/components/workers/WorkersTable.png';

// Styling
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { useTheme } from '@emotion/react';

const AboutPage = () => {
    return(
        <HomeLayout>
            <Grid container gap={1}>
                <Grid item>
                    <Typography variant="h3">
                        About the OddJobber App
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5" paragraph={true}>
                        Welcome hiring management staff and engineering personnel. Thank you for visiting this website. 
                        The purpose of the OddJobber App is to display my competance creating a stateful website utilyzing the MERN stack.
                        It is meant as a brief, yet practical portfolio of my technical ability.
                    </Typography>
                </Grid>
                <Contents />
                <Description />
                <Design />
                <Documentation />
            </Grid>
        </HomeLayout>
    )
}

const Contents = () => {
    return(
        <Grid item xs={12}>
            <Paper elevation={1}>
                <List>
                    <ListItem>
                        <Typography variant="h4">
                            Page Contents
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h6">
                            Description
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1">
                            An overview of the application including registration and basic usage.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h6">
                            Design 
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            Includes a brief description of the MERN stack, the error handling mechanisms used, and styling
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h6">
                            Documentation
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            Graphical documentation concerning the application architecture, typical data and error flow, authentication flow,
                            custom React components, custom React hooks, page organization, the global context states used, CSRF protection
                            architecture, and connection architecture from api to front-end hooks
                        </Typography>
                    </ListItem>
                </List>
            </Paper>
        </Grid>
    )
}

const Description = () => {
    return(
        <Grid item xs={12}>
            <Paper elevation={1}>
                <List>
                    <ListItem>
                        <Typography variant="h4">Description</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1">
                            The OddJobber App is a skills crowd-sourcing application connecting homeowners and handymen.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>-User Registration</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            Users register with a full name, email, username, and password. 
                            Optionally, a user can include a contact phone number and full address. 
                            Partial, or improper U.S. phone, state, or zipcodes are rejected.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>-Sessions & Security</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            Users are logged-in for one hour at a time. Session timeout will trigger an error pane.
                            Once the pane is closed, the user is redirected to the login page. 
                            The App includes single factor authentication only. 
                            The App also provides protection against Cross-Site-Request-Forgery (CSRF) attacks.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>-Usage</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1' paragraph={true}>
                            After registration, users can create projects and skills. 
                            Project creators are automatically assigned as project contacts. 
                            Minimally, other users will be able to see the project contact's email. 
                            Users may update their account with a phone number or address as desired.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1' paragraph={true}>
                            Project creators are encouraged to connect with potential employees before adding them to their projects. 
                            There is no messaging mechanism in this iteration of the App to notify users when they have been added to a project. 
                            Skills cannot be updated or deleted after they are in use by a user or required as part of a project. 
                            The project contact (creator) can update the skills, workers, deadline, status, and project description. 
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1' paragraph={true}>
                            Workers assigned to a project have no control over the project. 
                            Workers must contact the project contact regarding any issues.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>-Payments & Legal</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            There isn't a payment system in this version of the App. 
                            Workers set their expected hourly wage in their account settings. 
                            Payments and legal consequences have been abstracted away since this App is primarily for example purposes.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>-Account removal</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            If a user decides to delete their account all associated projects they created are destroyed.
                        </Typography>
                    </ListItem>
                </List>
            </Paper>
        </Grid>
    )
}

const Design = () => {
    return(
        <Grid item xs={12}>
            <Paper elevation={1}>
                <List>
                    <ListItem>
                        <Typography variant="h4">Design</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h5'>-- Overview --</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            The OddJobber App was built using the MERN stack. A MERN application consists
                            of a database tier (MongoDB), a backend server tier (Express JS, Node JS), and a frontend tier (React JS). 
                            The OddJobber App follows this design pattern. It is not an MVC (model-view-controller) design pattern. 
                            MVC serves backend web pages through a templating engine as a view. MERN organizes frontend code into React modules. 
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h5'>MERN</Typography>
                    </ListItem>
                    <ListItem variant='subtitle1'>
                        A set of technologies that include MongoDB, Express JS, React JS, and Node JS.
                        The MERN stack is used to create full-stack web applications with Javascript
                        as the common programming language for development.
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>
                            <ListItem component={Link} href="https://www.mongodb.com/">MongoDB</ListItem>
                            <ListItem component={Link} href="https://expressjs.com/">Express JS</ListItem>
                            <ListItem component={Link} href="https://react.dev/">React JS</ListItem>
                            <ListItem component={Link} href="https://nodejs.org/en">Node JS</ListItem>
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h5'>Creating an error handling system</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            Since the backend server code and the frontend React code pass data across the open internet,
                            there is no single error passing mechanism in MERN. Developers will use the built in error
                            handling middleware provided by the Express JS framework, but handling frontend errors is up
                            to the developer. 
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>-- Initial Considerations --</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            An MVC application that uses Express has the advantage of a built-in error handling mechanism. Since views
                            (pages) are served from the backend code, it is a simple matter of checking the data conditions returned by
                            the database of choice, and calling the 'next' function with the error object. The error handling routers
                            can then take over. A MERN application cannot send errors to the front end so easily since the front and backend
                            tiers are decoupled. Data is sent across the internet. An api such as fetch or Axios is required to retrieve
                            the data from the backend api server. So how was I accomplish that?
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h5'>
                            How to show backend errors from the api in a user friendly format on the frontend ?
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>
                            -- Custom Error Classes --
                        </Typography>
                    </ListItem>
                    <ListItem variant='subtitle1'>
                        The backend api was intentially designed to return either the data requested as JSON, or an appropriate error as JSON.
                        I had the option of using the native Javascript error object when throwing errors in the backend controllers,
                        but I wanted to make the calls self-documenting, faster to call, and reduce the amount of boiler plate code. Rather than
                        calling and sending `res.JSON( error: 'some error message' ) each time I needed to throw an error, I created a
                        set of error classes using Javascript inheritence. The error classes sent the class name as the type, an HTTP response
                        code, and the error message. By using inheritance, I could later call the 'instanceof' method to validate if the error
                        was of a certain class type that I had defined. These checks occured in the error handling middleware function in the
                        backend server api. Specific formats were then chosen for each error case as JSON, and returned in the response object
                        of Express. Frontend data requests that resulted in an error would then be handling errors in a known format and as JSON.
                        A further benefit of the custom error classes, was that I could visually tell which error case would be set since they 
                        were self-documenting.
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>
                            <ListItem component={Link} href="https://www.json.org/json-en.html">JSON</ListItem>
                            <ListItem component={Link} href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof">instanceof</ListItem>
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>
                            -- Input Sanitation & Validation --
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            Handling most errors in the backend meant that I did not have to perform frontend input validation, since any failed requests
                            were interrupted on the backend either by the Mongoose validators, or in conditions tested for in the controllers. 
                            Data sanitation occurs from using MongoDB, since it parses every input as string data, and interally converts it. 
                            In most cases, there is no need to explicitly sanitize data in MongoDB as with an SQL type database system.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>
                            -- Structuring MongoDB Documents using Mongoose --
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            SQL databases follow a strict data model defined by the table schema. A document such as a resume might require several
                            tables to store the data. The data is atomic in that each piece of information should not be repeated. Consistency across
                            the various tables must be `normalized` to ensure there is not redundancy, or wasted space. NO-SQL ()
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>
                            <ListItem component={Link} href="https://mongoosejs.com/">Mongoose</ListItem>
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>
                            -- Custom Javascript Error classes and the Express error handling function --
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            I created several Javascript classes for custom errors using class inheritence.
                            Every class contained a static method in order to call in instance of itself. 
                            The Express error handler function was able to identify these various errors through 
                            the Javascript 'instanceof' method, and forward the error as JSON (Javascript-Object-Notation).
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h5'>
                            Frontend Error State
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            React JS supplies a useContext hook which allows for the creation of global frontend state.
                            A context was created for errors in the frontend using the useContext hook. A React component
                            called ErrorPane displayed the errors to the user whenever the error context contained a
                            new value. The error context was set whenever error data was sent from the backend server.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <NewReleasesIcon />
                        <Typography variant='h6'>
                            Detailed Error-flow Scenario Failed create event
                        </Typography>
                        <NewReleasesIcon />
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1' paragraph={true}>
                            Suppose a create operation is executed by a user. 
                            After the form is submitted, the request eventually goes to MongoDB where the request is made. 
                            Failed create events will throw an error that is catch-able in the controller code. 
                            The failed create is returned by Mongoose when the 'Model.create()' method is executed in the controller. 
                            A specific custom error is used to throw the error to the Express error handler. 
                            The Express error handler parses the error converting it into JSON. The JSON error is returned to the caller. 
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1' paragraph={true}>
                            On the frontend, the Javascript native fetch api was used to make the call. 
                            Checking the 'response.ok' field of the response object returned by the fetch api determines whether an error occured. 
                            The frontend global error context includes a method to update the global error state. 
                            By convention this is named 'dispatch'.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1' paragraph={true}>
                            The dispatch function is actually using another 'reducer' function declared within the error context which will check the type, 
                            and update the state object based on the type entered. 
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1' paragraph={true}>
                            The ErrorPane component is a child component to the error context provider which wraps the entire frontend React app. 
                            Children inherit the global properties of the error context provider, and can see the updated global state. 
                            The component watches for the state change using the React hook useEffect.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1' paragraph={true}>
                            The change opens a panel on the left hand side of the screen populating the array of errors to the user. 
                            When the user clicks away from the panel, the dispatch fires again, this time clearing the global error state, and the panel is closed.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h5'>
                            Styling
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1' paragraph={true}>
                            Material UI (Mui), a Javascript library for React Components that follows Google's Material Design
                            specification was used to build most components.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1' paragraph={true}>
                            Mui version 5 has several mechanisms for customized component styling depending on the use case and specificity desired. 
                            Styles are backed by a company called Emotion. CSS (cascading-style-sheets), is included only in the required index.css file that was generated by Create-React-App.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h6'>
                            <ListItem component={Link} href="https://mui.com/">Material UI</ListItem>
                            <ListItem component={Link} href="https://emotion.sh/docs/introduction">Emotion</ListItem>
                            <ListItem component={Link} href="https://create-react-app.dev/">Create-React-App</ListItem>
                        </Typography>
                    </ListItem>
                </List>
            </Paper>
        </Grid>
    )
}

const Documentation = () => {
    const authN_Imgs = [
        { src: AddSkillForm, title: 'Add User Skill Form' }, 
        { src: DeleteAccountForm, title: 'Delete User Account Form' },
        { src: ErrorPane , title: 'Error Pane'},
        { src: LoginForm , title: 'Login Form'},
        { src: SignupForm , title: 'Signup Form'},
        { src: UpdateUserAttrsForm , title: 'Update User Attributes Form'},
        { src: UpdateUsernameForm , title: 'Update Username Form'},
        { src: UpdateUserPasswordForm , title: 'Update Password Form'},
        { src: UpdateUserPayRateForm , title: 'Update Pay-Rate Form'}
    ]

    const generalComponentsImgs = [
        {src: CollapseWithButton, title: 'Collapse with Button'},
        {src: CustomField, title: 'Custom Field'},
        {src: DottedDivider, title: 'Dotted Divider'},
        {src: LayoutGrid, title: 'Layout Grid'},
        {src: ModalFormWrapper, title: 'Modal Form Wrapper'},
        {src: Navbar, title: 'Navbar'},
        {src: PageNav, title: 'Page Nav'},
        {src: RemoveButton, title: 'Remove Button'}
    ];

    const projectImgs = [
        { src: AddProjectSkillForm, title: 'Add Project Skill Form' },
        { src: AddProjectWorkerForm, title: 'Add Project Worker Form' },
        { src: CreateProjectForm , title: 'Create Project Form' },
        { src: Project, title: 'Project' },
        { src: ProjectContents , title: 'Project Contents' },
        { src: ProjectSearch  , title: 'Project Search' },
        { src: ProjectStatus  , title: 'Project Status' },
        { src: UpdateProjectForm , title: 'Update Project Form' }
    ];

    const skillsImgs = [
        { src: Skill, title: 'Skill' },
        { src: SkillForm, title: 'Skill Form' },
        { src: SkillLevel , title: 'Skill Level' },
        { src: SkillSearch, title: 'Skill Search' },
        { src: SkillsTable, title: 'Skills Table' },
        { src: UpdateSkillForm, title: 'Update Skill Form' }
    ];

    const workersImgs = [
        { src: AddressTable, title: 'Address Table' },  
        { src: PayRate , title: 'Pay-Rate (hourly wage)' },
        { src: UserContact , title: 'User Contact' },
        { src: Worker, title: 'Worker' },
        { src: WorkerSearch, title: 'Worker Search' },
        { src: WorkersTable, title: 'Workers Table' }
    ];

    return(
        <Grid item xs={12}>
            <Paper elevation={1}>
                <List>
                    <ListItem>
                        <Typography variant='h4'>Documentation</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='h5'>Flow-Diagrams</Typography>
                    </ListItem>
                    <ListItem>
                        <Box 
                            component='img'
                            src={DataFlow}
                            loading='lazy'
                            sx={{ maxWidth: '100%', objectFit: 'scale-down' }}
                        />
                    </ListItem>
                    <ListItem>
                        <Box 
                            component='img'
                            src={AuthNFlow}
                            loading='lazy'
                            sx={{ margin: 'auto', maxWidth: '100%', objectFit: 'scale-down' }}
                        />
                    </ListItem>
                    <ListItem>
                        <Box 
                            component='img'
                            src={ErrorFlow}
                            loading='lazy'
                            sx={{ margin: 'auto', maxWidth: '100%', objectFit: 'scale-down' }}
                        />
                    </ListItem>
                    <ListItem>
                        <Box 
                            component='img'
                            src={CSRFProtectionFlow}
                            loading='lazy'
                            sx={{ margin: 'auto', maxWidth: '100%', objectFit: 'scale-down' }}
                        />
                    </ListItem>
                    <Divider sx={{ border: '2px solid black' }}/>
                    <ListItem>
                        <Typography variant='h5'>React Context</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            The frontend global state for page navigation tabs, skills, workers, projects
                             and errors were handled using React context. Pictured below we see that the 
                             OddJobber App is wrapped with several ContextProviders which subscribe to the
                             context states. Custom React hooks make the backend api calls which will retrieve 
                             the data from the server, and update the contexts as needed.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Box 
                            component='img'
                            src={ContextArch}
                            loading='lazy'
                            sx={{ maxWidth: '100%', objectFit: 'scale-down' }}
                        />
                    </ListItem>
                    <ListItem>
                        <Typography variant='subtitle1'>
                            A particular React context calls a reducer function which updates
                            the state object for that context. Pictured below are the
                            string values used when making a dispatch call e.g., a type value of 'CLEAR_ERROR'
                            is used to clear the error state. The string values are used in a switch statement
                            which determine how the state object is to be modified.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Box 
                            component='img'
                            src={Contexts}
                            loading='lazy'
                            sx={{ maxWidth: '100%', objectFit: 'scale-down' }}
                        />
                    </ListItem>
                    <Divider sx={{ border: '2px solid black' }}/>
                    <ListItem>
                        <Typography variant='h5'>Pages</Typography>
                    </ListItem>
                    <ListItem>
                        <Box 
                            component='img'
                            src={PageOrg}
                            loading='lazy'
                            sx={{ margin: 'auto', maxWidth: '100%', objectFit: 'scale-down' }}
                        />
                    </ListItem>
                    <Divider sx={{ border: '2px solid black' }}/>
                    <ListItem>
                        <Typography variant='h5'>React Components</Typography>
                    </ListItem>
                    <ListItem>
                        <Box 
                            component='img'
                            src={ComponentCats}
                            loading='lazy'
                            sx={{ margin: 'auto', maxWidth: '100%', objectFit: 'scale-down' }}
                        />
                    </ListItem>
                    <Divider sx={{ border: '2px solid black' }}/>
                    <ListItem>
                        <Typography variant='h6'>User & Authentication Components</Typography>
                    </ListItem>
                    { authN_Imgs.map((doc) => {
                        return <AccordianImage key={doc.title} src={doc.src} title={doc.title} />
                    })}
                    <Divider sx={{ border: '2px solid black' }}/>
                    <ListItem>
                        <Typography variant='h6'>General Components</Typography>
                    </ListItem>
                    { generalComponentsImgs.map((doc) => {
                        return <AccordianImage key={doc.title} src={doc.src} title={doc.title} />
                    })}
                    <Divider sx={{ border: '2px solid black' }}/>
                    <ListItem>
                        <Typography variant='h6'>Project Components</Typography>
                    </ListItem>
                    { projectImgs.map((doc) => {
                        return <AccordianImage key={doc.title} src={doc.src} title={doc.title} />
                    })}
                    <Divider sx={{ border: '2px solid black' }}/>
                    <ListItem>
                        <Typography variant='h6'>Skills Components</Typography>
                    </ListItem>
                    { skillsImgs.map((doc) => {
                        return <AccordianImage key={doc.title} src={doc.src} title={doc.title} />
                    })}
                    <Divider sx={{ border: '2px solid black' }}/>
                    <ListItem>
                        <Typography variant='h6'>Workers Components</Typography>
                    </ListItem>
                    { workersImgs.map((doc) => {
                        return <AccordianImage key={doc.title} src={doc.src} title={doc.title} />
                    })}
                </List>
            </Paper>
        </Grid>
    )
}

const AccordianImage = ({ src, title }) => {
    const theme = useTheme();
    return(
        <ListItem>
            <Accordion sx={{width: '100%'}}>
                <AccordionSummary
                    expandIcon={<ExpandCircleDownIcon />}
                    sx={{ 
                        backgroundColor: theme.palette.primary.dark,
                        color: theme.palette.secondary.main,
                     }}
                >
                    <Typography variant="subtitle1">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box 
                        component='img'
                        src={src}
                        loading='lazy'
                        sx={{ margin: 'auto', maxWidth: '100%', objectFit: 'scale-down' }}
                    />
                </AccordionDetails>
            </Accordion>
        </ListItem>
    )
}

export default AboutPage;