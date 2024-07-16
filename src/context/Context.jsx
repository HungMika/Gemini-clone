import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState(""); //input prompt from users
  const [recentPrompt, setRecentPrompt] = useState(""); //display recent chat in same conversation
  const [prevPrompts, setPrevPrompts] = useState([]); //save recent chat to sidebar
  const [showResult, setShowResult] = useState(false); //show the result of user's request
  const [loading, setLoading] = useState(false); //display loading animation
  const [resultData, setResultData] = useState(""); //display the resultData from current chat window

  const [openSetting, setOpenSetting] = useState(false);
  const [extended, setExtended] = useState(false); //extend sidebar

  const delayPara = (index, nextWord) => {
    setTimeout(function (params) {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let res;
    if (prompt !== undefined) {
      res = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      res = await runChat(input);
    }

    //make the answer has no specific char
    let resArray = res.split("**");
    let newRes = "";
    for (let i = 0; i < resArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newRes += resArray[i];
      } else {
        newRes += "<b>" + resArray[i] + "</b>";
      }
    }
    let newResponse = newRes.split("*").join("</br>");
    let newArray = newResponse.split(" ");
    for (let i = 0; i < newArray.length; i++) {
      const nextWord = newArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    recentPrompt,
    setRecentPrompt,
    input,
    setInput,
    onSent,
    showResult,
    loading,
    resultData,
    newChat,
    openSetting,
    setOpenSetting,
    extended,
    setExtended,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
