import React, {useReducer, useEffect} from 'react'
import GameBoard from './components/game-board'
import Modal from './components/modal'
import Score from './components/score'
import NextPiece from './components/next-piece'
import Menu from './components/menu'
import GameState from './components/game-state'
import './app.css'
import {initialState, GameReducer} from './reducers/game-reducer'

const App = (props) => {
    const [state, dispatch] = useReducer(GameReducer, initialState)
	
	useEffect(() => {
		
		document.addEventListener('keydown', keyDownHandler)
		
		return () => {
			document.removeEventListener('keydown', keyDownHandler)
		}
	}, [])

	const keyDownHandler = (e) => {
		switch(e.keyCode) {
			case 32: {
				dispatch("DROP")
				
				break
			}
			case 37: {
				dispatch("MOVE_LEFT")

				break
			}
			case 38: {
				dispatch("ROTATE")

				break
			}
			case 39: {
				dispatch("MOVE_RIGHT")

				break
			}
			case 40: {
				dispatch("MOVE_DOWN")
				break
			}
			default: {

				break
			}
		}
	}

    return (
        <div className="container">
	        <div className="grid">
		        <h1 className="has-text-centered main-header">Tetris game</h1>
        		<GameBoard state={state} dispatch={dispatch}></GameBoard>
				<NextPiece piece={state.nextActive} color={state.nextColor}></NextPiece>
				<Score score={state.score}></Score>
				<GameState gameState={state.isDead ? "Dead" : state.isPlaying ? "Playing" : "Paused"}></GameState>
				<Menu dispatch={dispatch}></Menu>
	        </div>
            <Modal isPlaying={state.isPlaying} isDead={state.isDead} score={state.score} dispatch={dispatch}></Modal>
        </div>
    )
}

export default App