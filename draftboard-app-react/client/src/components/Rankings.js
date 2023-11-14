import Tabs from './Tabs'
import '../styling/rankings.scss'

const Rankings = ({ rankedPlayers, stateChanger, playersTable, setPlayerStates }) => 
{

  return (
    <>
      <div id = 'rankingsDiv'>
        <div id='splitterDiv'>
              <h1 id='rankingsHeader'>Rankings</h1>
        </div>
        <Tabs rankedPlayers = { rankedPlayers } stateChanger = { stateChanger } playersTable = { playersTable }
        setPlayerStates = { setPlayerStates }/>
      </div>
    </>
  )
}

export default Rankings