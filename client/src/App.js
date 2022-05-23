import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/layout/Layout';
import Home from "./components/layout/Home";
import Wecare from "./components/layout/Wecare";
import Break from './components/layout/Break';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import About from './components/layout/About';
import Dashboard from './components/layout/Dashboard';
import { AuthContextProvider } from './components/store/auth-context';
import AuthContext from './components/store/auth-context';

//Auth component for acccessing private routes
const RequireAuth = () => {
  const authCtx = useContext(AuthContext);
  if (!authCtx.token) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};

function App() {

  return (
    <AuthContextProvider>
      <Layout />
      <Routes>
        {/* public routes*/ }
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/home' element={ <Dashboard /> } />
        <Route path='/about' element={ <About /> } />
        {/* private routes*/ }
        <Route path='/' element={ <RequireAuth /> }>
          <Route index element={ <Home /> } />
          <Route path='backcare' element={ <Wecare /> } />
          <Route path='break' element={ <Break /> } />
        </Route>
      </Routes>
    </AuthContextProvider >
  );

}

export default App;