import React from 'react'

const Menu = ({dispatch}) => {

	return (
		<div className="menu box has-background-warning has-text-centered">
			<h3 className="title is-3">Menu</h3>
			<div className="buttons is-vertical">
				<button className="button is-fullwidth is-rounded" onClick={(e) => {dispatch("RESET"); ; document.activeElement.blur()}}>Reset</button>
				<button className="button is-fullwidth is-rounded" onClick={(e) => {dispatch("TOGGLE"); document.activeElement.blur()}}>Play / Pause</button>
			</div>
		</div>
	)
}

export default Menu
