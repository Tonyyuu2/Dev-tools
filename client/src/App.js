import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from "./components/layout/Home";
import Timer from "./components/layout/Timer";
import Wecare from "./components/layout/WeCare";
import Break from './components/layout/Break';
import Dashboard from './components/layout/Dashboard';
import Journal from './components/journal/Journal';
import TodoList from './components/to-do-list/TodoList';
import Backcare from './components/backcare/Backcare';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Backcare /> } >
          <Route index element={ <Home /> } />
          <Route path='timer' element={ <Timer /> } />
          <Route path='wecare' element={ <Wecare /> } />
          <Route path='break' element={ <Break /> } />
        </Route>
      </Routes>
    </>
  );
};

export default App;
