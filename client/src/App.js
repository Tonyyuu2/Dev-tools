import "./App.css";
import Form from './components/add_journal/Form'
import Timer from "./components/pomodoro/Timer";
import Settings from "./components/pomodoro/Settings";
import Settingscontext from "./components/pomodoro/Settingscontext";
import { useState } from "react"

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <>
    <main>
      <Settingscontext.Provider value={{
        showSettings,
        workMinutes,
        breakMinutes,
        setShowSettings,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </Settingscontext.Provider>
    </main>
    <div>
      <Form/>
    </div>
    </>
  );
}
export default App;
