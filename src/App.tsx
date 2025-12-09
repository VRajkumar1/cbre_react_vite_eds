import { useState } from "react";
import { EmeraldButton } from "@emerald-react/button";
import reactLogo from "./assets/react.svg";
import EmeraldLogo from "./assets/emerald-logo.png";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://docs.emerald.cbre.com/" target="_blank">
          <img
            src={EmeraldLogo}
            className="logo emerald"
            alt="Emerald Design System logo"
          />
        </a>
      </div>
      <h1>Vite + React + EDS</h1>
      <div className="card">
        <EmeraldButton onClick={() => setCount((count) => count + 1)}>count is {count}</EmeraldButton>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React & Emerald logos to learn more
      </p>
    </>
  );
}

export default App;
