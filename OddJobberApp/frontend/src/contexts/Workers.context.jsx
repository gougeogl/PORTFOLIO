/*************************************************************
 ◘ filename: Workers.context.jsx 
 ◘ Description:
    Global React state for Worker. Includes the
    needed reducer, context object, and context provider
    wrapper needed. Used by the OddJobber App. 
 *************************************************************/

// React
import { createContext, useReducer } from "react";

const WorkersContext = createContext();

const workersReducer = (state, action) => {
    switch(action.type){
        case 'SET_WORKERS':
            return {
                workers: action.workers
            }
        case 'ADD_WORKER':
            return {
                workers: [action.worker, ...state.workers]
            }
        case 'REMOVE_WORKER': 
            const filteredWorkers = state.workers.filter(worker => worker._id !== action.worker._id);
            return {
                workers: [...filteredWorkers]
            }
        case 'UPDATE_WORKER':
            const updatedWorkers = state.workers.map((worker) => {
                if(worker._id === action.worker._id){
                    return action.worker;
                }
                return worker;
            });
            return {
                workers: updatedWorkers
            }
        case 'CLEAR_WORKERS':
            return {
                workers: []
            }
        default:
            return state;
    }
}

const WorkersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workersReducer, {
        workers: []
    })

    return(
        <WorkersContext.Provider value={{ ...state, dispatch }}>
            { children }
        </WorkersContext.Provider>
    );
}

export { WorkersContext, workersReducer, WorkersContextProvider }