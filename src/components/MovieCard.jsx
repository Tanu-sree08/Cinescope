import React from 'react'
import {useState,useEffect} from 'react'
import starIcon from '../assets/star.svg';
import {useWatchlist} from '../context/WatchlistContext'


const MovieCard = ( {movie} ) => {
  const { title, vote_average, poster_path, release_date, original_language, id } = movie;
  const { isLiked, toggleLike } = useWatchlist();
  const liked = isLiked(movie.id);

  const handleWatchlistToggle = () => {
    toggleLike(movie);
  };
    
  
  return (
    <div className="movie-card">
      <img
        src={poster_path ?
          `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}
      />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src={starIcon} alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>

          <span>•</span>
            <button onClick={handleWatchlistToggle}>{liked?"❤️":"🤍"}</button>
        </div>
      </div>
    </div>
  )
}
export default MovieCard












