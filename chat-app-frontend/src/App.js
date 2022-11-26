import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Chat from "./Pages/Chat";
import { useSelector } from "react-redux";
import { AppContext, socket } from "./context/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const [theme, setTheme] = useState("light");
  const user = useSelector((state) => state.user);

  const toggleTheme = () => {
    setTheme((current)=> (current === "light" ? "dark" : "light"))
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        socket,
        rooms,
        setRooms,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        newMessages,
        setNewMessages,
      }}
    >
      <BrowserRouter>
        <div className="App" id={theme}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            {!user && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
