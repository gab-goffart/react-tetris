import React from 'react'

const Score = ({score}) => {

	return(
		<div className="score box has-background-warning has-text-centered">
			<h3 className="title is-3">
				Your score : <br/>
				{score}
			</h3>
		</div>
	)
}

export default Score