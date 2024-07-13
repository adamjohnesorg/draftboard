import React, { useState, useEffect } from 'react'
import Ovr from './Ovr'
import QB from './QB'
import RB from './RB'
import WR from './WR'
import TE from './TE'
import Flex from './Flex'
import K from './K'
import '../styling/tabs.scss'
import * as html2canvas from 'html2canvas'

const Tabs = ({ rankedPlayers, stateChanger, playersTable, setPlayerStates }) => 
{
    const [currentTab, setCurrentTab] = useState('first-tab')
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

    //const isMobile = width <= 768
    
    const toggleTab = () => {

        let ovrTab = document.getElementById('ovrTab')
        let qbTab = document.getElementById('qbTab')
        let rbTab = document.getElementById('rbTab')
        let wrTab = document.getElementById('wrTab')
        let teTab = document.getElementById('teTab')
        let kTab = document.getElementById('flexTab')
        let flexTab = document.getElementById('kTab')

        if (ovrTab) //if DOM has loaded
        {
          ovrTab.style = 'background-color: white'
          qbTab.style = 'background-color: white'
          rbTab.style = 'background-color: white'
          wrTab.style = 'background-color: white'
          teTab.style = 'background-color: white'
          kTab.style = 'background-color: white'
          flexTab.style = 'background-color: white'
        }
        switch (currentTab)
        {
          case 'first-tab':
            if (ovrTab)
            {
              ovrTab.style = 'background-color:#d4d1e5'
            }
            return <Ovr rankedPlayers={ rankedPlayers } stateChanger = { stateChanger }
            playersTable = { playersTable } setPlayerStates = { setPlayerStates }/>

          case 'second-tab':
            document.getElementById('qbTab').style = 'background-color:#d4d1e5'
            return <QB rankedPlayers={ rankedPlayers } stateChanger = { stateChanger }
            playersTable = { playersTable } setPlayerStates = { setPlayerStates }/>

          case 'third-tab':
            document.getElementById('rbTab').style = 'background-color:#d4d1e5'
            return <RB rankedPlayers={ rankedPlayers } stateChanger = { stateChanger }
            playersTable = { playersTable } setPlayerStates = { setPlayerStates }/>

          case 'fourth-tab':
            document.getElementById('wrTab').style = 'background-color:#d4d1e5'
            return <WR rankedPlayers={ rankedPlayers } stateChanger = { stateChanger }
            playersTable = { playersTable } setPlayerStates = { setPlayerStates }/>

          case 'fifth-tab':
            document.getElementById('teTab').style = 'background-color:#d4d1e5'
            return <TE rankedPlayers={ rankedPlayers } stateChanger = { stateChanger }
            playersTable = { playersTable } setPlayerStates = { setPlayerStates }/>

          case 'sixth-tab':
            document.getElementById('flexTab').style = 'background-color:#d4d1e5'
            return <Flex rankedPlayers={ rankedPlayers } stateChanger = { stateChanger }
            playersTable = { playersTable } setPlayerStates = { setPlayerStates }/>

          case 'seventh-tab':
            document.getElementById('kTab').style = 'background-color:#d4d1e5'
            return <K rankedPlayers={ rankedPlayers } stateChanger = { stateChanger }
            playersTable = { playersTable } setPlayerStates = { setPlayerStates }/>
          default:
            return null;
        }
    }
  
    function clearRankings()
    {
        let length = rankedPlayers.length
        for (let i = length - 1; i >= 0; i--)
        {
          playersTable.splice(rankedPlayers[i].search_rank - 1, 0, rankedPlayers[i])
          setPlayerStates([...playersTable])
          rankedPlayers.splice(i, 1)
          stateChanger(rankedPlayers)
        }
    }

    const printImage = () => 
    {
      const input = document.getElementById('ranksTable')
      /*
      var rowsPerPage = 35
      if (isMobile)
      {
        rowsPerPage = rowsPerPage / 2
      }
      */
      html2canvas(input)
        .then((canvas) => {
          const image = canvas.toDataURL("png");
          var a = document.createElement("a");
          a.setAttribute('download', 'FootballDraftBoardRankings.png');
          a.setAttribute('href', image);
          a.click()
          /*
          const pdf = new jsPDF('p', 'mm', 'a4');
          var width = pdf.internal.pageSize.getWidth();
          var height = pdf.internal.pageSize.getHeight() / (rowsPerPage / (rankedPlayers.length + 1))
          pdf.addImage(imgData, 'PNG', 0, 0, width, height);
          for (let i = 0; i < Math.floor(rankedPlayers.length / rowsPerPage); i++)
          {
            pdf.addPage()
            pdf.addImage(imgData, 'PNG', 0, -298 * (i + 1), width, height);
          }

          pdf.save("playerRankings.pdf");
          */
        })
    }

    return (
      <>
        <div id='adviceAndClearDiv'>
            <button id='printPdfButton' onClick={() => printImage()}>Download Rank Table</button>
            <span id='adviceDesktop'>Swap players in your rankings by dragging and dropping them around!</span>
            <span id='adviceMobile'>Swap players in your rankings by touching their NAMES!</span>
            <button className='buttonClass' id='clear' onClick={() => clearRankings()}>Clear Rankings</button>
        </div>
        <div id = 'tabsDiv'>
          <div className ='rowDiv' id='tabRowDiv'>
            <h3 className='tab' id='ovrTab' onClick={() => setCurrentTab('first-tab')}>All</h3>
            <h3 className='tab' id='qbTab' onClick={() => setCurrentTab('second-tab')}>QB</h3>
            <h3 className='tab' id='rbTab' onClick={() => setCurrentTab('third-tab')}>RB</h3>
            <h3 className='tab' id='wrTab' onClick={() => setCurrentTab('fourth-tab')}>WR</h3>
            <h3 className='tab' id='teTab' onClick={() => setCurrentTab('fifth-tab')}>TE</h3>
            <h3 className='tab' id='flexTab' onClick={() => setCurrentTab('sixth-tab')}>FLEX</h3>
            <h3 className='tab' id='kTab' onClick={() => setCurrentTab('seventh-tab')}>K</h3>
          </div>
          {toggleTab()}
        </div>
      </>
    )
  }

export default Tabs