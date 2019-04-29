import React from 'react'

const Menu = ({dispatch}) => {

	return (
		<div className="tile is-child notification is-warning">
			<h3 className="title is-3">Menu</h3>
			<div className="buttons">
				<button className="button is-fullwidth is-inverted is-outlined is-warning" onClick={(e) => {dispatch("RESET")}}>Reset</button>
				<button className="button is-fullwidth is-inverted is-outlined is-warning" onClick={(e) => {dispatch("TOGGLE")}}>Play / Pause</button>
			</div>
		</div>
	)
}

export default Menu