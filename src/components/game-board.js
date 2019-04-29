import React, {useEffect, useRef, useState} from 'react'

const SQ = 35

const GameBoard = ({state, dispatch}) => {
	const canvas = useRef(null)
	let [ctx, setCtx] = useState(null)
	let [animation, setAnimation] = useState(null)

	useEffect(() => {
		ctx = canvas.current.getContext("2d")
		setCtx(ctx)
		ctx.lineWidth = "2"
		animation = setInterval(moveDown, state.time)
		setAnimation(animation)

		return () => {
			setAnimation(a => {
				window.clearInterval(a)
				return null
			})
		}

	}, [state.time])

	useEffect(() => {
		ctx.fillStyle = "#000"
		ctx.strokeStyle = "#fff"
		ctx.fillRect(0, 0, 10 * SQ, 20 * SQ)

		for(let i = 0; i < state.board.length; i++) {
			for(let j = 0; j < state.board[i].length; j++) {
				if(state.board[i][j]) {
					ctx.fillStyle = state.board[i][j]
					ctx.fillRect(j * SQ, i * SQ, SQ, SQ)
					ctx.strokeRect(j * SQ, i * SQ, SQ, SQ)
				}
			}
		}


	})

	const moveDown = () => {
		dispatch("MOVE_DOWN")
	}

	return (
		<div className="tile is-parent has-text-centered notification is-info">
	        <div className="tile is-child">
            	<canvas ref={canvas} height={20 * SQ} width={10 * SQ}></canvas> 
	        </div>
	    </div>
    )
}

export default GameBoard