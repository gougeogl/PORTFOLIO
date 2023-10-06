/***********************************************************
 ◘ filename: index.js
 ◘ Description: 
    The required index file for the OddJobber App frontend
    React JS server. Included are the global context provider
    wrappers required in order for child components to have
    access to the global states
 ***********************************************************/

// React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Date / Time picker
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// Contexts
import { AuthenticationContextProvider } from './contexts/Authentication.context';
import { ErrorContextProvider } from './contexts/Error.context';
import { PageContextProvider } from "./contexts/Page.context";
import { SkillsContextProvider } from './contexts/Skills.context';
import { WorkersContextProvider } from './contexts/Workers.context';
import { ProjectsContextProvider } from './contexts/Projects.context';

// Main application
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <ErrorContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <PageContextProvider>
            <SkillsContextProvider>
              <WorkersContextProvider>
                <ProjectsContextProvider>
                  <App />
                </ProjectsContextProvider>
              </WorkersContextProvider>
            </SkillsContextProvider>
          </PageContextProvider>
        </LocalizationProvider>
      </ErrorContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
);

