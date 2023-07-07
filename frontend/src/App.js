import React from 'react'
import { Routes as Switch , Route} from 'react-router-dom'
import Navbar from './layouts/Navbar'
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Verification from './components/auth/Verification'
import ForgortPassword from './components/auth/ForgortPassword'
import ResetPassword from './components/auth/ResetPassword'
import ChangePassword from './components/auth/ChangePassword'
import Error from './layouts/Error'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreatePrediction from './components/predictions/CreatePrediction'
import ListPredictions from './components/predictions/ListPredictions'
import ViewPrediction from './components/predictions/ViewPrediction'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route element={<Home/>} path='/'/>
        <Route element={<Register/>} path='/register' />
        <Route element={<Login/>} path='/login'/>
        <Route element={<Verification/>} path='/verify/:uidb4/:token' />
        <Route element={<ForgortPassword/>} path='/forgot-password'/>
        <Route element={<ResetPassword/>} path='/password-reset/:uidb4/:token'/>
        <Route element={<ChangePassword/>} path='/change-password' />
        <Route element={<CreatePrediction/>} path='/create' />
        <Route element={<ListPredictions/>} path='/results' />
        <Route element={<ViewPrediction/>} path='/result/:id'/>
        <Route element={<Error/>} path='*' />
      </Switch>
      <ToastContainer/>
    </div>
  )
}

export default App
