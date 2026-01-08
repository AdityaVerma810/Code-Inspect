import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from '@monaco-editor/react';

const App = () => {
  return (
    <div>
      <Navbar/>
      <div className="main flex justify-between" style={{ height: "calc(100vh - 90px" }}>
        <div className="left h-[87.5%] w-[50%]">
             <Editor height="100%" theme='vs-dark' language="javascript" value="// some comment"  />
        </div>
      </div>
       
  
    </div>
  );
};

export default App;
