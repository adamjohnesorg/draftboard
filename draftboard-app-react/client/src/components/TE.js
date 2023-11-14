import React, { useState } from 'react'

const TE = ({ rankedPlayers, stateChanger}) => 
{
  const [refresh, setRefresh] = useState(true)
  const [origin, setOrigin] = useState({})
  const [destination, setDestination] = useState({})
  const [justSwapped, setJustSwapped] = useState(false)

  function removePlayer(variable)
  {
    if (rankedPlayers.length === 0)
    {
      return
    }
    var index = rankedPlayers.indexOf(variable)
    if (index !== -1)
    {
      rankedPlayers.splice(index, 1)
      stateChanger(rankedPlayers)
      setRefresh(!refresh)
    }
  }

  if (typeof rankedPlayers === 'undefined')
  {
      return
  }

  function handleDragStart(e, player, index)
  {
    setOrigin(player)
  }

  function handleDragEnter(e, player, index)
  {
    setDestination(player)
  }

  function handleDragEnd(e, index)
  {
    e.preventDefault()
    if (rankedPlayers.indexOf(destination) > rankedPlayers.indexOf(origin))
    {
      rankedPlayers.splice(rankedPlayers.indexOf(destination), 1, origin)
      rankedPlayers.splice(rankedPlayers.indexOf(origin), 1, destination)
    }
    else
    {
      rankedPlayers.splice(rankedPlayers.indexOf(origin), 1, destination)
      rankedPlayers.splice(rankedPlayers.indexOf(destination), 1, origin)
    }
    setRefresh(!refresh)
  }

  const handleTouch = (e, player) => 
  {
    if (origin === player)
    {
      return
    }
    else if ((!justSwapped) && (origin.first !== undefined))
    {
      if (rankedPlayers.indexOf(player) > rankedPlayers.indexOf(origin))
      {
        rankedPlayers.splice(rankedPlayers.indexOf(player), 1, origin)
        rankedPlayers.splice(rankedPlayers.indexOf(origin), 1, player)
      }
      else
      {
        rankedPlayers.splice(rankedPlayers.indexOf(origin), 1, player)
        rankedPlayers.splice(rankedPlayers.indexOf(player), 1, origin)
      }
      setOrigin({})
      setJustSwapped(true)
      return
    }
    else
    {
      setOrigin(player)
      setJustSwapped(false)
    }
  }

  const filteredPlayers = rankedPlayers.filter(player => {
    if (player.position === 'TE')
    {
      return player
    }
    return null
  })

  return (
  <>
    <div id = 'filteredDiv'>
      <table className = 'wholeTable' id = 'ranksTable'>
        <caption id='captionRankings'>TE Rankings</caption>
        <thead>
            <tr className='rankedColumnsRow'>
                <th className='rtColumnTitle' id='rtButtonColumn'>Remove</th>
                <th className='rtColumnTitle' id='rtRankColumn'>Rank</th>
                <th className='rtColumnTitle' id='rtNameColumn'>Name</th>
                <th className='rtColumnTitle' id='rtPositionColumn'>Position</th>
                <th className='rtColumnTitle' id='rtTeamColumn'>Team</th>
                <th className='rtColumnTitle' id='rtAgeColumn'>Age</th>
                <th className='rtColumnTitle' id='rtYearsColumn'>Years Exp</th>
            </tr>
        </thead>
        <tbody>
          {
            filteredPlayers.map((player) => (
                <tr key={player._id} className='teRow' id={player.first + player.last + 'Rrow'}
                    draggable
                    onDragStart={(e) =>{handleDragStart(e, player, rankedPlayers.indexOf(player))}}
                    onDragEnter={(e) =>{handleDragEnter(e, player, rankedPlayers.indexOf(player))}}
                    onDragEnd={(e) =>{handleDragEnd(e, rankedPlayers.indexOf(player))}}>
                  {
                    <>
                      <td className='player'><button className='buttonClass' id='remove' onClick={() => removePlayer(player)}>-</button></td>
                      <td className='player'>{ filteredPlayers.indexOf(player) + 1}</td>
                      <td className='player'
                        id='rtPlayerName'
                        onTouchStart={(e) =>{handleTouch(e, player)}}>
                          { player.first + " " + player.last}
                      </td>
                      <td className='player'>{ player.position }</td>
                      <td className='player'>{ player.team }</td>
                      <td className='player'>{ player.age }</td>
                      <td className='player'>{ player.years_exp }</td>
                    </>
                  }          
                </tr>
          ))} 
        </tbody>
      </table>
    </div>
  </>
  )
}

export default TE