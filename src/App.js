import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./Components/Chat";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Login from "./Components/Login";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="app">
        {user ? (
          <>
            <Header />
            <div className="app__body">
              <Sidebar />

              <Routes>
                <Route path="/room/:roomId" element={<Chat />} />
                <Route path="/" element={<h1>Welcome</h1>} />
              </Routes>
            </div>
          </>
        ) : (
          <Login />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
