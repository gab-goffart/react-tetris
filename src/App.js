import React, {useReducer} from 'react'
import GameBoard from './components/game-board'
import {initialState, GameReducer} from './reducers/game-reducer'

const App = (props) => {
    const [state, dispatch] = useReducer(GameReducer, initialState)
    return (
        <section className="section">
            <h1 className="title is-1">
                all working
            </h1>
            <GameBoard state={state} dispacth={dispatch}></GameBoard>
        </section>
    )
}

export default App