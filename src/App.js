import { Route, Router, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <div className="app__body">
          <Sidebar />

          <Routes>
            <Route path="/room/:roomId" element={<Chat />} />
            <Route path="/" element={<h1>Welcome</h1>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
