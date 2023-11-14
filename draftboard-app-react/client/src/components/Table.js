import React, { useState, useEffect } from 'react'
import Rankings from './Rankings'
import '../styling/table.scss'

const Table = ({ searchQuery, playersTable, setPlayerStates}) =>
{
    const [rankPlayers, setRankPlayers] = useState([])
    const [tableState, setTableState] = useState('All')
    const [addAmount, setAddAmount] = useState(1)
    const [width, setWidth] = useState(window.innerWidth)

    function handleWindowSizeChange() {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

    const isMobile = width <= 768
    const filteredPlayers = playersTable.filter(player => {
        const real_name = player.first + " " + player.last
        return real_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               player.position.toLowerCase().includes(searchQuery.toLowerCase())
    })



    function addPlayers(variable)
    {
        if (playersTable.length === 0)
        {
            return
        }
        var index = playersTable.indexOf(variable)
        var toBeAdded = []
        if (Number(addAmount) === 1)
        {
            if (rankPlayers.includes(variable))
            {
                return
            }
            setRankPlayers([...rankPlayers, variable])
            setPlayerStates(playersTable.splice(playersTable.indexOf(variable), 1))
        }
        else
        {
            if (playersTable.length <= addAmount)
            {
                return
            }
            for (let i = 0; i < addAmount; i++)
            {
                toBeAdded.push(playersTable[index])
                index += 1
            }
            setRankPlayers([...rankPlayers, ...toBeAdded])
            setPlayerStates(playersTable.splice(index - addAmount, addAmount))
        }

        switch (tableState)
        {
           case 'QB': sortPlayersQB()
           break
           case 'RB': sortPlayersRB()
           break
           case 'WR': sortPlayersWR()
           break
           case 'TE': sortPlayersTE()
           break
           case 'Flex': sortPlayersFlex()
           break
           case 'K': sortPlayersK()
           break
           case 'All': resetPlayers()
           break
           default:
            return null
        }
    }

    function comparePositionsQB( a, b )
    {
        if ( a.position === 'QB')
        {
            return -1
        }
        else 
        {
            return 1
        }
    }

    function comparePositionsRB( a, b )
    {
        if ( a.position === 'RB')
        {
            return -1
        }
        else 
        {
            return 1
        }
    }

    function comparePositionsWR( a, b )
    {
        if ( a.position === 'WR')
        {
            return -1
        }
        else 
        {
            return 1
        }
    }
    
    function comparePositionsTE( a, b )
    {
        if ( a.position === 'TE')
        {
            return -1
        }
        else 
        {
            return 1
        }
    }

    function comparePositionsFlex( a, b )
    {
        if (a.position === 'WR' || a.position === 'RB' || a.position === 'TE')
        {
            return -1
        }
        else 
        {
            return 1
        }
    }

    function comparePositionsK( a, b )
    {
        if ( a.position === 'K')
        {
            return -1
        }
        else 
        {
            return 1
        }
    }

    function resetToNormal(a, b)
    {
        if (isMobile)
        {
            if ( a.search_rank < b.search_rank)
            {
                return -1
            }
            else
            {
                return 1
            }
        }
        else
        {
            if ( a.search_rank <= b.search_rank)
            {
                return -1
            }
            else
            {
                return 1
            }
        }
    }
    
    function sortPlayersQB()
    {
        resetPlayers()
        setTableState('QB')
        setPlayerStates(playersTable.sort( comparePositionsQB )) 
        setPlayerStates(playersTable.sort( comparePositionsQB ))
        // having 2 consecutive sorts is NOT a typo. IOS and Android use .sort differently
        // than desktop javascript. Don't ask me why this works, but having 2 sort calls is
        // 100% NECESSARY for this to work on mobile.
    }

    function sortPlayersRB()
    {
        resetPlayers()
        setTableState('RB')
        setPlayerStates(playersTable.sort( comparePositionsRB ))
        setPlayerStates(playersTable.sort( comparePositionsRB ))
        // having 2 consecutive sorts is NOT a typo. IOS and Android use .sort differently
        // than desktop javascript. Don't ask me why this works, but having 2 sort calls is
        // 100% NECESSARY for this to work on mobile.
    }

    function sortPlayersWR()
    {
        resetPlayers()
        setTableState('WR')
        setPlayerStates(playersTable.sort( comparePositionsWR ))
        setPlayerStates(playersTable.sort( comparePositionsWR ))
        // having 2 consecutive sorts is NOT a typo. IOS and Android use .sort differently
        // desktop javascript. Don't ask me why this works, but having 2 sort calls is
        // 100% NECESSARY for this to work on mobile.
    }

    function sortPlayersTE()
    {
        resetPlayers()
        setTableState('TE')
        setPlayerStates(playersTable.sort( comparePositionsTE ))
        setPlayerStates(playersTable.sort( comparePositionsTE ))
        // having 2 consecutive sorts is NOT a typo. IOS and Android use .sort differently
        // than desktop javascript. Don't ask me why this works, but having 2 sort calls is
        // 100% NECESSARY for this to work on mobile.
    }

    function sortPlayersFlex()
    {
        resetPlayers()
        setTableState('Flex')
        setPlayerStates(playersTable.sort( comparePositionsFlex ))
        setPlayerStates(playersTable.sort( comparePositionsFlex ))
        // having 2 consecutive sorts is NOT a typo. IOS and Android use .sort differently
        // than desktop javascript. Don't ask me why this works, but having 2 sort calls is
        // 100% NECESSARY for this to work on mobile.
    }

    function sortPlayersK()
    {
        resetPlayers()
        setTableState('K')
        setPlayerStates(playersTable.sort( comparePositionsK ))
        setPlayerStates(playersTable.sort( comparePositionsK ))
        // having 2 consecutive sorts is NOT a typo. IOS and Android use .sort differently
        // than desktop javascript. Don't ask me why this works, but having 2 sort calls is
        // 100% NECESSARY for this to work on mobile.
    }

    function resetPlayers()
    {
        setTableState('All')
        setPlayerStates(playersTable.sort( resetToNormal ))
    }

    function renderTable(player)
    {
        if (player.position === 'QB')
        {
            return <tr key={player._id} className='qbRow' id={player.first + player.last + 'Trow'}>
                <td className='player'><button id='addButton' onClick={() =>{addPlayers(player)}}>+</button></td>
                <td className='player' id='playerName'>{player.first} {player.last}</td>
                <td className='player'>{player.position}</td>
                <td className='player'>{player.team}</td>
                <td className='player'>{player.age}</td>
                <td className='player'>{player.years_exp}</td>
            </tr>
        }
        if (player.position === 'RB')
        {
            return <tr key={player._id} className='rbRow' id={player.first + player.last + 'Trow'}>
                <td className='player'><button id='addButton' onClick={() =>{addPlayers(player)}}>+</button></td>
                <td className='player' id='playerName'>{player.first} {player.last}</td>
                <td className='player'>{player.position}</td>
                <td className='player'>{player.team}</td>
                <td className='player'>{player.age}</td>
                <td className='player'>{player.years_exp}</td>
            </tr>
        }
        if (player.position === 'WR')
        {
            return <tr key={player._id} className='wrRow' id={player.first + player.last + 'Trow'}>
                <td className='player'><button id='addButton' onClick={() =>{addPlayers(player)}}>+</button></td>
                <td className='player' id='playerName'>{player.first} {player.last}</td>
                <td className='player'>{player.position}</td>
                <td className='player'>{player.team}</td>
                <td className='player'>{player.age}</td>
                <td className='player'>{player.years_exp}</td>
            </tr>
        }
        if (player.position === 'TE')
        {
            return <tr key={player._id} className='teRow' id={player.first + player.last + 'Trow'}>
                <td className='player'><button id='addButton' onClick={() =>{addPlayers(player)}}>+</button></td>
                <td className='player' id='playerName'>{player.first} {player.last}</td>
                <td className='player'>{player.position}</td>
                <td className='player'>{player.team}</td>
                <td className='player'>{player.age}</td>
                <td className='player'>{player.years_exp}</td>
            </tr>
        }
        if (player.position === 'K')
        {
            return <tr key={player._id} className='kRow' id={player.first + player.last + 'Trow'}>
                <td className='player'><button id='addButton' onClick={() =>{addPlayers(player)}}>+</button></td>
                <td className='player' id='playerName'>{player.first} {player.last}</td>
                <td className='player'>{player.position}</td>
                <td className='player'>{player.team}</td>
                <td className='player'>{player.age}</td>
                <td className='player'>{player.years_exp}</td>
            </tr>
        }
        //should never get here
        return null
    }

    const sortPlayers = (selectObject) =>
    {
        var value = selectObject.target.value
        switch (value)
        {
            case 'All':
                resetPlayers()
                break
            case 'QB':
                sortPlayersQB()
                break
            case 'RB':
                sortPlayersRB()
                break
            case 'WR':
                sortPlayersWR()
                break
            case 'TE':
                sortPlayersTE()
                break
            case 'Flex':
                sortPlayersFlex()
                break
            case 'K':
                sortPlayersK()
                break
            default:
                return null
        }
    }

    return (
        <>
            <div id = 'tableDiv'>
                <table className = 'wholeTable'>
                    <thead>
                        <tr id='tableColumnsRow'>
                            <th className='columnTitle' id='add'>
                                Add Amount<br></br>
                                <label id='positionsLabel'>
                                    <select id='dropdown' onChange={(e) => setAddAmount(e.target.value)}>
                                        <option className='dropdownOption' value='1'>1</option>
                                        <option className='dropdownOption' value='10'>10</option>
                                        <option className='dropdownOption' value='50'>50</option>
                                    </select>
                                </label></th>
                            <th className='columnTitle' id='nameColumn'>Name</th>
                            <th className='columnTitle' id='positionColumn'>
                                Position<br></br>
                                <label id='positionsLabel'>
                                    <select id='dropdown' onChange={e => sortPlayers(e)}>
                                        <option className='dropdownOption' value='All'>All</option>
                                        <option className='dropdownOption' value='QB'>QB</option>
                                        <option className='dropdownOption' value='RB'>RB</option>
                                        <option className='dropdownOption' value='WR'>WR</option>
                                        <option className='dropdownOption' value='TE'>TE</option>
                                        <option className='dropdownOption' value='Flex'>Flex</option>
                                        <option className='dropdownOption' value='K'>K</option>
                                    </select>
                                </label>
                            </th>
                            <th className='columnTitle' id='teamColumn'>Team</th>
                            <th className='columnTitle' id='ageColumn'>Age</th>
                            <th className='columnTitle' id='yearsColumn'>Years Exp</th>
                        </tr>
                    </thead>
                    <tbody>
                        { filteredPlayers.map((player) => (
                            renderTable(player)
                        ))}
                    </tbody>
                </table>
            </div>
            <Rankings rankedPlayers = { rankPlayers } stateChanger = { setRankPlayers } playersTable = { playersTable }
            setPlayerStates = { setPlayerStates }/>
        </>
    )
}

export default Table