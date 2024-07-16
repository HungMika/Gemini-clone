import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Settings from "./components/Settings/Settings";

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <>
      <Sidebar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <Main darkTheme={darkTheme} />
      <Settings darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
    </>
  );
};
export default App;
