import React, { createContext, useContext, useEffect, useState } from 'react';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../appwrite';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const list = await getWatchlist();
      setWatchlist(list);
    };
    fetch();
  }, []);

  const isLiked = (id) => {
    return watchlist.some(movie => movie.id === id);
  };

  const toggleLike = async (movie) => {
    const liked = isLiked(movie.id);

    if (liked) {
      await removeFromWatchlist(movie.id);
      setWatchlist(prev => prev.filter(item => item.id !== movie.id));
    } else {
      await addToWatchlist(movie);
      setWatchlist(prev => {
        if (prev.some(item => item.id === movie.id)) return prev; 
        return [...prev, movie];
      });
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, isLiked, toggleLike }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
