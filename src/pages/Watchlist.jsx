import React, { useEffect, useState } from 'react';
import { getWatchlist } from '../appwrite';
import MovieCard from '../components/MovieCard';
import {Link} from 'react-router-dom';
import Search from '../components/Search'

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [hasLiked,setHasLiked]=useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWatchlist();
      setWatchlist(data);
      
    };
    fetchData();
  }, []);

  return (
<div className='wrapper'>
     <div className="watchlist space-y-9">
    <h2>Your Watchlist</h2>

    
    {watchlist.length === 0 ? (
      <p className="text-gray-500">No movies added yet!</p>
    ) : (
      <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie}  hideOnUnlike  />

        ))}
      </ul>
    )}
  </div>


</div>
 


  );
};

export default Watchlist;
