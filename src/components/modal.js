import React, {useEffect} from 'react'

const Modal = ({isDead, score, dispatch}) => {

	const resetHandler = (e) => {
		dispatch("RESET")
	}

	useEffect(() => {
		if(isDead) {
			document.querySelector(".modal").className += " is-visible"
		} else {
			document.querySelector(".modal").className = "modal";
		}
	}, [isDead])

	const closeModal = (e) => {
		document.querySelector(".modal").className = "modal";
	}
	
	return (
		<div className="modal" onClick={closeModal}>
			<div className="modal-content">
				<div className="modal-header">
					<h3>You died!</h3>
				</div>
				<div className="modal-body">
					<p>Looks like you died! :(  You scored {score}. Would you like to play again?</p>
				</div>
				<div className="modal-footer">
					<div className="buttons">
						<button className="button is-success is-rounded" onClick={resetHandler}>Yes</button>
						<button className="button is-danger is-rounded" onClick={closeModal}>No</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal