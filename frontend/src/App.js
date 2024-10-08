import "./App.css";
import PlayerList from "./components/PlayerList";
import Auction from "./pages/Auction";
import HomePage from "./pages/HomePage";
import { BrowserRouter,Route,Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/" element={<HomePage />}  />
        <Route path="/auction" element={<Auction />}  />
        <Route path='/PlayerList' element={<PlayerList/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
