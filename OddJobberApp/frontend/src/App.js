/************************************************
 ◘ filename: App.js
 ◘ Description: 
    The OddJobber App front-end React JS server. 
    This file defines the frontend routes. 
 *************************************************/

// 3rd party
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Custom Hooks
import useAuthenticationContext from './hooks/useAuthenticationContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import WorkersPage from './pages/WorkersPage';
import AboutPage from './pages/AboutPage';

// Styling
import { ThemeProvider } from '@mui/material/styles';
import AppTheme from './themes/AppTheme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const { user } = useAuthenticationContext();

  return (
    <ThemeProvider theme={AppTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/login"
            element={ !user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={ !user ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/account"
            element={ user ? <AccountPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/skills"
            element={ user ? <SkillsPage /> : <Navigate to="/login"/>}
          />
          <Route
            path="/projects"
            element={ user ? <ProjectsPage /> : <Navigate to="/login"/>}
          />
          <Route
            path="/workers"
            element={ user ? <WorkersPage /> : <Navigate to="/login"/>}
          />
          <Route 
            path="/about"
            element={ user ? <AboutPage /> : <Navigate to="/login"/>}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
