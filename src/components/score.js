import React from 'react'

const Score = ({score}) => {

	return(
		<div className="tile is-child notification is-warning">
			<h3 className="title is-3">
				Your score : <br/>
				{score}
			</h3>
		</div>
	)
}

export default Score