import "./App.css";
import PlayerList from "./components/PlayerList";
import Auction from "./pages/Auction";
import HomePage from "./pages/HomePage";
import TeamsPage from "./components/TeamList";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import SelectedPlayers from "./pages/SelectedList";
import PlayersPool from "./pages/PlayerPool";
import AuctionResults from "./pages/AuctionResult";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/" element={<HomePage />}  />
        <Route path="/auction" element={<Auction />}  />
        <Route path='/PlayerList' element={<PlayerList/>}/>
        <Route path="/teams" element={<TeamsPage/>}/>
        <Route path="/SelectedList" element={<SelectedPlayers/>}/>
        <Route path="/playersPool" element={<PlayersPool/>}/>
        <Route path="/auctionresult" element={<AuctionResults/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
