import React from 'react'

const Modal = ({isDead, isPlaying, score, dispatch}) => {
	let classes = "modal"

	if(isDead) {
		classes += " is-active"
	}

	const resetHandler = (e) => {
		dispatch("RESET")
	}

	return (
		<div className={classes}>
			<div className="modal-background"></div>
			<div className="modal-card">
				<header className="modal-card-head">
					You are dead!
				</header>
				<section className="modal-card-body">
					Looks like you died. Your score is {score}. Would you like to play another game?
				</section>
				<footer className="modal-card-foot">
					<button className="button is-outlined" onClick={resetHandler}>Play again</button>
				</footer>
			</div>
		</div>
	)
}

export default Modal