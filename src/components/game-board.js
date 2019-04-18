import React, {useEffect, useRef, useState} from 'react'

const SQ = 35

const GameBoard = ({state, dispatch}) => {
	const canvas = useRef(null)
	let start = Date.now()
	let [ctx, setCtx] = useState(null)

	useEffect(() => {
		ctx = canvas.current.getContext("2d")
		setCtx(ctx)
		ctx.lineWidth = "2"
		
		window.requestAnimationFrame(draw)
	}, [state.time])

	useEffect(() => {
		ctx.clearRect(0, 0, 350, 700)

		for(let i = 0; i < state.board.length; i++) {
			for(let j = 0; j < state.board[i].length; j++) {
				if(state.board[i][j]) {
					ctx.fillStyle = state.board[i][j]
					ctx.fillRect(j * SQ, i * SQ, SQ, SQ)
					ctx.strokeRect(j * SQ, i * SQ, SQ, SQ)
				}
			}
		}

	}, [state])

	const draw = () => {

		const now = Date.now()

		if(now - start > state.time) {
			start = Date.now()
			dispatch("MOVE_DOWN")
		}

		window.requestAnimationFrame(draw)

	}

	

	return (
		<div className="columns is-centered">
	        <div className="column is-6">
	            <div className="box has-background-grey columns is-centered">
	                <canvas ref={canvas} height="700px" width="350px" style={canvasStyle}></canvas> 
	            </div>
	        </div>
	    </div>
    )
}

const canvasStyle = {
	border: "10px solid black"
}

export default GameBoard