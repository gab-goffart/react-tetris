import React, {useRef, useEffect} from 'react'

const SQ = 35

const NextPiece = ({piece, color}) => {
	let ctx = null
	let empty = []
	let canvas = useRef(null)

	for(let i = 0; i < 4; i++) {
		empty[i] = []
		for(let j = 0; j < 4; j++){
			empty[i][j] = null
		}
	}


	useEffect(() => {
		ctx = canvas.current.getContext("2d")
		ctx.lineWidth = "2"
		ctx.strokeStyle = "#fff"
		ctx.fillStyle = "#000"
		ctx.fillRect(0, 0, canvas.current.width, canvas.current.height)
		for(let i = 0; i < piece.length; i++) {
			for(let j = 0; j < piece[i].length; j++) {
				if(piece[i][j]) {
					ctx.fillStyle = color
					ctx.fillRect(j * SQ, i * SQ, SQ, SQ)
					ctx.strokeRect(j * SQ, i * SQ, SQ, SQ)
				}
			}
		}
	}, [piece])

	return (
		<div className="tile is-child notification is-warning">
			<h3 className="title is-3">Your next piece :</h3>
			<canvas ref={canvas} height={SQ * 4} width={SQ * 4}></canvas>
		</div>
	)
}

export default NextPiece