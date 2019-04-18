import React, {useReducer, useEffect} from 'react'
import GameBoard from './components/game-board'
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
				console.log("moving down")
				break
			}
			default: {

				break
			}
		}
	}

    return (
        <section className="section">
            <h1 className="title is-1">
                all working
            </h1>
            <GameBoard state={state} dispatch={dispatch}></GameBoard>
        </section>
    )
}

export default App