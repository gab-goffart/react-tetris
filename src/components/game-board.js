import React, {useEffect, useRef} from 'react'

const GameBoard = ({board}) => {
	
	const canvas = useRef(null)

	useEffect(() => {
		const ctx = canvas.current.getContext("2d")

		ctx.fillStyle="#fff"
		ctx.lineWidth = "10"
		ctx.strokeRect(0, 0, 350, 700)
		ctx.fillRect(100, 100, 100, 100)
	})

	return (
		<div className="columns is-centered">
	        <div className="column is-6">
	            <div className="box has-background-grey columns is-centered">
	                <canvas ref={canvas} height="700px" width="350px"></canvas> 
	            </div>
	        </div>
	    </div>
    )
}

export default GameBoard