import React, {useEffect, useRef, useState} from 'react'

const SQ = 40

const GameBoard = ({state, dispatch}) => {
	const canvas = useRef(null)
	let [ctx, setCtx] = useState(null)
	let [animation, setAnimation] = useState(null)

	useEffect(() => {
		ctx = canvas.current.getContext("2d")
		setCtx(ctx)
		ctx.lineWidth = "2"
	}, [])

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
	useEffect(() => {

		animation = setInterval(moveDown, state.time)
		setAnimation(animation)

		return () => {
			setAnimation(a => {
				window.clearInterval(a)
				return null
			})
		}

	}, [state.time])


	const moveDown = () => {
		dispatch("MOVE_DOWN")
	}

	return (
		<div className="board box has-background-info has-text-centered">
        	<canvas ref={canvas} height={20 * SQ} width={10 * SQ}></canvas> 
	    </div>
    )
}

export default GameBoard