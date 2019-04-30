import React from 'react'

const GameState = ({gameState}) => {
	return (
		<div className="state box has-background-warning has-text-centered">
			<h3 className="title is-3">Currently {gameState}</h3>
		</div>
	)

}

export default GameState