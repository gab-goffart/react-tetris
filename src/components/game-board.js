import React, {useEffect, useRef} from 'react'

const SQ = 35
let x = 3
let y = 0

const GameBoard = ({state, dispatch}) => {
	const canvas = useRef(null)
	let start = Date.now()
	let ctx

	useEffect(() => {
		ctx = canvas.current.getContext("2d")
		
		window.requestAnimationFrame(draw)
	})

	const draw = () => {
		ctx.fillStyle="#fff"
		ctx.lineWidth = "10"
		ctx.strokeRect(0, 0, 350, 700)
		const now = Date.now()
		if(now - start < 700) {
			window.requestAnimationFrame(draw)
			return
		}

		start = Date.now()
		ctx.lineWidth = "5"
		ctx.fillRect(x * SQ, y * SQ,  SQ, SQ)
		ctx.strokeRect(x * SQ, y * SQ,  SQ, SQ)
		window.requestAnimationFrame(draw)

	}

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