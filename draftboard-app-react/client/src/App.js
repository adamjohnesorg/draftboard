import React, { useState } from 'react'
import Header from './components/Header'
import Search from './components/Search'
import Footer from './components/Footer'
import './styling/app.scss'
import playersData from './data/newplayers.json'

const App = () => 
{

  const [players, setPlayers] = useState(playersData.players)

  if (players.length > 1)
  {
    return (
        <>
          <div className='container'>
              <Header/>
              <Search players = { players } setPlayerStates = { setPlayers }/>
              <Footer/>
          </div>
        </>
    )
  }

  return null
}


export default App