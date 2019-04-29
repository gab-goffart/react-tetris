import React from 'react'
import Score from './score'
import NextPiece from './next-piece'
import Menu from './menu'
import GameState from './game-state'

const SideMenu = ({state, dispatch}) => {

	return (
		<div className="tile">
			<div className="tile is-parent">
				<NextPiece piece={state.nextActive} color={state.nextColor}></NextPiece>
			</div>
			<div className="tile is-parent is-vertical">
				<Score score={state.score}></Score>
				<GameState isPlaying={state.isPlaying}></GameState>
				<Menu dispatch={dispatch}></Menu>
			</div>
		</div>
	)
}

export default SideMenu