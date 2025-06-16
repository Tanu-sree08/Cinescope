import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='persistent-header'>
      <div className='persistent-header-links'>
        <h2>Cine<span className="text-gradient">scope</span></h2>
        <Link to='/'>Home</Link>
        <Link to='/watchlist'>Watchlist</Link>
      </div>
    </div>
  )
}

export default Header
