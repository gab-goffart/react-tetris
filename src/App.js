import React, {useReducer, useEffect} from 'react'
import GameBoard from './components/game-board'
import SideMenu from './components/side-menu'
import Modal from './components/modal'
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
        <section className="section">
        	<div className="columns">
	        	<div className="column is-6 is-offset-3">
		        	<h1 className="title is-1">
		        	    Tetris game
		        	</h1>
			        <div className="tile is-ancestor notification is-info">
		        		<GameBoard state={state} dispatch={dispatch}></GameBoard>
						<SideMenu state={state} dispatch={dispatch}></SideMenu>
			        </div>
	        	</div>
        	</div>
            <Modal isPlaying={state.isPlaying} isDead={state.isDead} score={state.score} dispatch={dispatch}></Modal>
        </section>
    )
}

export default App