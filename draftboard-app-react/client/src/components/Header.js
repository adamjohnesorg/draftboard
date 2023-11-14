import React from 'react'
import ffTitle from '../imgs/draftboardclean.AVIF'
import '../styling/header.scss'

function Header() 
{

  return (
    <>
      <div id = 'headerDiv'>
          <header id ='headerBar'>
              <img className = 'titleLogo' src={ ffTitle } alt = 'logo'/>
              <h1 className='headerPageTitle' id = 'headerTxt'>Fantasy Football Rankings Draftboard</h1>
              <img className = 'titleLogo' id='right' src={ ffTitle } alt = 'logo'/>
          </header>
      </div>
    </>
  )
}

export default Header