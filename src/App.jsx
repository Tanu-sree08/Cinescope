import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useWatchlist, WatchlistProvider } from './context/WatchlistContext.jsx';
import bg from './assets/hero.png'
import Home from './pages/Home.jsx';
import Watchlist from './pages/Watchlist.jsx'
import Header from './components/Header.jsx'



function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
<Router>
      <Header/>
      <div className=" px-4"> 
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/watchlist" element={<Watchlist searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;