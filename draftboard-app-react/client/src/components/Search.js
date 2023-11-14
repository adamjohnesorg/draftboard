import React, { useState } from 'react'
import Table from './Table'
import '../styling/search.scss'

function Search({ players, setPlayerStates}) 
{

    const [query, setQuery] = useState("")

    return (
    <>
        <div id = 'searchDiv'>
            <p id = 'searchTitle'>Search for Player:</p>
            <input 
                id = 'searchBar'
                type = 'search'
                value = {query}
                onChange = {e => setQuery(e.target.value)}
            />
        </div>
        <div className='rowDiv'>
            <Table searchQuery = { query } playersTable = { players } setPlayerStates = { setPlayerStates }/>
        </div>
    </>
  )
}

export default Search