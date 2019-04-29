import React from 'react'

const GameState = ({isPlaying}) => {
	return (
		<div className="tile is-child notification is-warning">
			<h3 className="title is-3">Currently {isPlaying ? "playing" : "paused"}</h3>
		</div>
	)

}

export default GameState