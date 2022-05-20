import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/layout/Home";
import Timer from "./components/layout/Timer";
import Wecare from "./components/layout/Wecare";
import Break from "./components/layout/Break";
import About from "./components/layout/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="timer" element={<Timer />} />
          <Route path="backcare" element={<Wecare />} />
          <Route path="break" element={<Break />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
