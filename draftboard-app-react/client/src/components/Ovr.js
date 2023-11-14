import React, { useState } from 'react'
import '../styling/tabs.scss'

const Ovr = ({ rankedPlayers, stateChanger, playersTable, setPlayerStates }) => 
{
    const [refresh, setRefresh] = useState(true)
    const [origin, setOrigin] = useState({})
    const [destination, setDestination] = useState({})
    const [justSwapped, setJustSwapped] = useState(false)

    if (typeof rankedPlayers === 'undefined')
    {
        return
    }

    function checkPlayerOff(variable)
    {
      var checkedRow = document.getElementById(variable.first + variable.last + 'Rrow')
      if (checkedRow.style.textDecoration !== 'none' && checkedRow.style.textDecoration !== 'line-through 2px')
      {
        //first time entering the table
        checkedRow.style.textDecoration = 'none'
      }
      if (checkedRow.style.textDecoration === 'none')
      {
        checkedRow.style.textDecoration = 'line-through 2px'
      }
      else
      {
        checkedRow.style.textDecoration = 'none'
      }
    }

    function removePlayer(variable)
    {
      if (rankedPlayers.length === 0)
      {
        return
      }
      var index = rankedPlayers.indexOf(variable)
      if (index !== -1)
      {
        playersTable.splice(variable.search_rank, 0, variable)
        setPlayerStates([...playersTable])
        rankedPlayers.splice(index, 1)
        stateChanger(rankedPlayers)
      }
    }

    function handleDragStart(player)
    {
      setOrigin(player)
    }

    function handleDragEnter(e, player)
    {
      setDestination(player)
    }

    function handleDragEnd(e)
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
        console.log(rankedPlayers.indexOf(player))
        console.log(rankedPlayers.indexOf(origin))
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

    function renderRankings(player)
    {
      if (player.position === 'QB')
      {
        return <tr key={player._id} className='qbRow' id={player.first + player.last + 'Rrow'}
                draggable
                onDragStart={(e) =>{handleDragStart(player)}}
                onDragEnter={(e) =>{handleDragEnter(e, player)}}
                onDragEnd={(e) =>{handleDragEnd(e)}}>
              {
                <>
                  <td className='player'>
                    <button className='buttonClass' id='remove' onClick={() => removePlayer(player)}>-</button>
                  </td>
                  <td className='player'>{ rankedPlayers.indexOf(player) + 1}</td>
                  <td className='player'
                    id='rtPlayerName'
                    onTouchStart={(e) =>{handleTouch(e, player)}}>
                    {player.first + " " + player.last}
                  </td>
                  <td className='player'>{ player.position }</td>
                  <td className='player'>{ player.team }</td>
                  <td className='player'>{ player.age }</td>
                  <td className='player'>{ player.years_exp }</td>
                  <td className='player' id='checkButton'>
                    <button className='buttonClass' id='check' onClick={() => checkPlayerOff(player)}></button>
                  </td>
                </>
              }          
            </tr>
      }
      if (player.position === 'RB')
      {
        return <tr key={player._id} className='rbRow' id={player.first + player.last + 'Rrow'}
                draggable
                onDragStart={(e) => {handleDragStart(player)}}
                onDragEnter={(e) =>{handleDragEnter(e, player)}}
                onDragEnd={(e) =>{handleDragEnd(e)}}>
              {
                <>
                  <td className='player'><button className='buttonClass' id='remove' onClick={() => removePlayer(player)}>-</button></td>
                  <td className='player'>{ rankedPlayers.indexOf(player) + 1}</td>
                  <td className='player'
                    id='rtPlayerName'
                    onTouchStart={(e) =>{handleTouch(e, player)}}>
                    {player.first + " " + player.last}
                  </td>
                  <td className='player'>{ player.position }</td>
                  <td className='player'>{ player.team }</td>
                  <td className='player'>{ player.age }</td>
                  <td className='player'>{ player.years_exp }</td>
                  <td className='player' id='checkButton'>
                    <button className='buttonClass' id='check' onClick={() => checkPlayerOff(player)}></button>
                  </td>
                </>
              }          
            </tr>
      }
      if (player.position === 'WR')
      {
        return <tr key={player._id} className='wrRow' id={player.first + player.last + 'Rrow'}
                draggable
                onDragStart={(e) => {handleDragStart(player)}}
                onDragEnter={(e) =>{handleDragEnter(e, player)}}
                onDragEnd={(e) =>{handleDragEnd(e)}}>
              {
                <>
                  <td className='player'><button className='buttonClass' id='remove' onClick={() => removePlayer(player)}>-</button></td>
                  <td className='player'>{ rankedPlayers.indexOf(player) + 1}</td>
                  <td className='player'
                    id='rtPlayerName'
                    onTouchStart={(e) =>{handleTouch(e, player)}}>
                    {player.first + " " + player.last}
                  </td>
                  <td className='player'>{ player.position }</td>
                  <td className='player'>{ player.team }</td>
                  <td className='player'>{ player.age }</td>
                  <td className='player'>{ player.years_exp }</td>
                  <td className='player' id='checkButton'>
                    <button className='buttonClass' id='check' onClick={() => checkPlayerOff(player)}></button>
                  </td>
                </>
              }          
            </tr>
      }
      if (player.position === 'TE')
      {
        return <tr key={player._id} className='teRow' id={player.first + player.last + 'Rrow'}
                draggable
                onDragStart={(e) => {handleDragStart(player)}}
                onDragEnter={(e) =>{handleDragEnter(e, player)}}
                onDragEnd={(e) =>{handleDragEnd(e)}}>
              {
                <>
                  <td className='player'><button className='buttonClass' id='remove' onClick={() => removePlayer(player)}>-</button></td>
                  <td className='player'>{ rankedPlayers.indexOf(player) + 1}</td>
                  <td className='player'
                    id='rtPlayerName'
                    onTouchStart={(e) =>{handleTouch(e, player)}}>
                    {player.first + " " + player.last}
                  </td>
                  <td className='player'>{ player.position }</td>
                  <td className='player'>{ player.team }</td>
                  <td className='player'>{ player.age }</td>
                  <td className='player'>{ player.years_exp }</td>
                  <td className='player' id='checkButton'>
                    <button className='buttonClass' id='check' onClick={() => checkPlayerOff(player)}></button>
                  </td>
                </>
              }          
            </tr>
      }
      if (player.position === 'K')
      {
        return <tr key={player._id} className='kRow' id={player.first + player.last + 'Rrow'}
                draggable
                onDragStart={(e) => {handleDragStart(player)}}
                onDragEnter={(e) =>{handleDragEnter(e, player)}}
                onDragEnd={(e) =>{handleDragEnd(e)}}>
              {
                <>
                  <td className='player'><button className='buttonClass' id='remove' onClick={() => removePlayer(player)}>-</button></td>
                  <td className='player'>{ rankedPlayers.indexOf(player) + 1}</td>
                  <td className='player'
                    id='rtPlayerName'
                    onTouchStart={(e) =>{handleTouch(e, player)}}>
                    {player.first + " " + player.last}
                  </td>
                  <td className='player'>{ player.position }</td>
                  <td className='player'>{ player.team }</td>
                  <td className='player'>{ player.age }</td>
                  <td className='player'>{ player.years_exp }</td>
                  <td className='player' id='checkButton'>
                    <button className='buttonClass' id='check' onClick={() => checkPlayerOff(player)}></button>
                  </td>
                </>
              }          
            </tr>
      }
    }

    return (
    <>
      <div id = 'filteredDiv'>
        <table className='wholeTable' id = 'ranksTable'>
        <caption id='captionRankings'>Overall Rankings</caption>
          <thead>
              <tr className='rankedColumnsRow'>
                  <th className='rtColumnTitle' id='rtButtonColumn'>Remove</th>
                  <th className='rtColumnTitle' id='rtRankColumn'>Rank</th>
                  <th className='rtColumnTitle' id='rtNameColumn'>Name</th>
                  <th className='rtColumnTitle' id='rtPositionColumn'>Position</th>
                  <th className='rtColumnTitle' id='rtTeamColumn'>Team</th>
                  <th className='rtColumnTitle' id='rtAgeColumn'>Age</th>
                  <th className='rtColumnTitle' id='rtYearsColumn'>Years Exp</th>
                  <th className='rtColumnTitle' id='rtCheckColumn'>
                    <img id='checkboxImg' src={require('../imgs/checkbox.AVIF')} alt='checkbox'/>
                  </th>
              </tr>
          </thead>
          <tbody>
          {
            rankedPlayers.map((player) => (
            renderRankings(player)
          ))} 
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Ovr