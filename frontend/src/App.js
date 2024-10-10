import "./App.css";
import PlayerList from "./components/PlayerList";
import Auction from "./pages/Auction";
import HomePage from "./pages/HomePage";
import TeamsPage from "./components/TeamList";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import SelectedPlayers from "./pages/SelectedList";
import PlayersPool from "./pages/PlayerPool";
import AuctionResults from "./pages/AuctionResult";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlayerListPage from "./pages/SoldPlayers";

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
        <Route path="/soldplayers" element={<PlayerListPage/>}/>
        </Routes>
        <ToastContainer 
          position="top-left" // Position of the toast notifications
          autoClose={3000} // Duration before the toast disappears
          hideProgressBar={false} // Show the progress bar
          newestOnTop={false} // Display newest toast on top
          closeOnClick // Close on click
          rtl={false} // Right-to-left layout
          pauseOnFocusLoss // Pause when the window is not focused
          draggable // Allow dragging the toast
          pauseOnHover // Pause when hovering over the toast
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
