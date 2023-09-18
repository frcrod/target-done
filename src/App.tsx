import React from "react";
import { ConfigProvider } from "antd";
import Landing from "./Pages/Landing";
import TodoContext from "./Contexts/TodoContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ConfigProvider theme={{ token: { fontFamily: "Montserrat" } }}>
        <TodoContext>
          <Landing />
        </TodoContext>
      </ConfigProvider>
    </div>
  );
}

export default App;
