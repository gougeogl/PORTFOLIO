/************************************************************************
 ◘ filename: WorkersPage.jsx 
 ◘ Description:
    Workers page for the OddJobber App. Contains forms to create or
    search for a worker
 ************************************************************************/

// React
import { useEffect } from "react";

// Custom Hooks
import useWorkers from "../hooks/useWorkers";

// Custom Components
import PageLayout from "../layouts/PageLayout";
import Worker from "../components/workers/Worker";
import WorkerSearch from "../components/workers/WorkerSearch";

const WorkersPage = () => {
    const { workers, getUsers } = useWorkers();

    useEffect(() => {
        const initWorkers = async() => {
            await getUsers();
        }
        initWorkers();
    }, []);

    return(
        <PageLayout 
            search={<WorkerSearch />}
        >
            {workers && workers.map((worker) => (
                <Worker key={worker._id} worker={worker} />
            ))}
        </PageLayout>
    )
}

export default WorkersPage;