import React from "react";
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import ScaleLoader from "react-spinners/ScaleLoader";

const App = () => {
  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'rust', label: 'Rust' },
    { value: 'dart', label: 'Dart' },
    { value: 'scala', label: 'Scala' },
    { value: 'perl', label: 'Perl' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'bash', label: 'Bash' }
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#18181b', 
      borderColor: '#3f3f46',
      color: '#fff',
      width: "100%"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#18181b', 
      color: '#fff',
      width: "100%"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',  
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#27272a' : '#18181b',  // hover effect
      color: '#fff',
      cursor: 'pointer',


      
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
      width: "100%"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a1a1aa',
      width: "100%"
    }),
  };

   const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
     
  const [response, setResponse] = useState("");
  const ai = new GoogleGenAI({ apiKey: "AIzaSyBRJFC8wIqinY7qXyEi0by9LGvyDGbxYcM" });
  async function reviewCode() {
  try {
    setLoading(true);
    setResponse("");

    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY
    });

    const model = ai.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(`
You are an expert-level software developer.

Language: ${selectedOption.value}

Analyze the following code like a senior engineer:

${code}
    `);

    const text = result.response.text();
    setResponse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    setResponse("❌ Failed to generate response. Check API key or quota.");
  } finally {
    setLoading(false);
  }
}


  return (
    <div>
      <Navbar />
      <div className="main flex justify-between" style={{ height: "calc(100vh - 90px)" }}>
        <div className="left h-[87.5%] w-[50%]">

          <div className="tabs !mt-5 !px-5 !mb-3 w-full flex items-center gap-[10px]">
            <Select
              value={selectedOption}
              onChange={(e) => { setSelectedOption(e) }}
              options={options}
              styles={customStyles}
            />
            <button className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Fix Code</button>
            <button
  onClick={() => {
    if (!code.trim()) {
      alert("Please enter code first");
    } else {
      reviewCode();
    }
  }}
  className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800"
>
  Review
</button>

          </div>

          <Editor
            height="100%"
            theme="vs-dark"
            language={selectedOption.value}
            value={code}
            onChange={(value) => setCode(value ?? "")}
          />

        </div>

        <div className="right overflow-scroll !p-[10px] bg-zinc-900 w-[50%] h-[101%]">
          <div className="topTab border-b-[1px] border-t-[1px] border-[#27272a] flex items-center justif-between h-[60px]">
            <p className='font-[700] text-[17px]'>Response</p>
          </div>
          {loading && <ScaleLoader  color='#9333ea'/>}
          <Markdown>{response}</Markdown>


        </div>
      </div>


    </div>
  );
};

export default App;















