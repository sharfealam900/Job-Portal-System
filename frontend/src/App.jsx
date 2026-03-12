import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import SignupPage from './components/auth/Signup'
import Jobs from './components/Jobs'
import LoginPage from './components/auth/LogIn'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import Postjob from './components/admin/Postjob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import SavedJobs from "./components/SavedJobs"


//Route Part
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },


  //For admin use
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },

  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },

  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },

  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },

  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><Postjob /></ProtectedRoute>
  },

  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },

  {
    path: "/saved/jobs",  //saved route
    element: <SavedJobs />
  }

])


function App() {
  return <RouterProvider router={appRouter} />
}

export default App
