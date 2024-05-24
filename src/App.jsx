import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AllJobsPage from './pages/AllJobsPage';
import AddJobPage from './pages/AddJobPage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import JobDetailsPage, {jobLoader} from './pages/JobDetailsPage';
import { toast } from 'react-toastify';
import EditJobPage from './pages/EditJobPage';



const App = () => {
 //Add New Job
  const addJob = async (newJob) => {
    await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
    toast.success('Job added successfully');
    return;
  };

  //Delete a Job
  const deleteJob = async (id) => {
    const response = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    })
    return;
  };

  //Update a Job
  const updateJob = async (id,updatedJob) => {
    const response = await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedJob)
    })
    return;
  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path='/jobs' element={<AllJobsPage />}/>
      <Route path='/job/:id' element={<JobDetailsPage deleteJob={deleteJob}/>} loader={jobLoader}/>
      <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>}/>
      <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/>}  loader={jobLoader}/>
      <Route path='*' element={<NotFoundPage />}/>
    </Route>
    
  )
  );

  return <RouterProvider router={router} />;
}

export default App