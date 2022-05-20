import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/layout/Layout';
import Home from "./components/layout/Home";
import Timer from "./components/layout/Timer";
import Wecare from "./components/layout/Wecare";
import Break from './components/layout/Break';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/layout/Dashboard';
import { AuthContextProvider } from './components/store/auth-context';
import AuthContext from './components/store/auth-context';

const RequireAuth = () => {

  const authCtx = useContext(AuthContext);

  console.log('token', authCtx.token);
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
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/home' element={ <Dashboard /> } />
        <Route path='/' element={ <RequireAuth /> }>
          <Route index element={ <Home /> } />
          <Route path='timer' element={ <Timer /> } />
          <Route path='backcare' element={ <Wecare /> } />
          <Route path='break' element={ <Break /> } />
        </Route>
      </Routes>
    </AuthContextProvider >
  );
};

export default App;
