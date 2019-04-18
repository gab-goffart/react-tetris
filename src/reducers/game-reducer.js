import {shapes, colors} from '../models/tetromino'

const ROWS = 20
const COLS = 10
const EMPTY = "#fff"

const index = Math.floor(Math.random() * shapes.length)
const nextIndex = Math.floor(Math.random() * shapes.length)

let board = []
for(let i = 0; i < ROWS; i++) {
	board[i] = []
	for(let j = 0; j < COLS; j++) {
		board[i][j] = null
	}
}

export const initialState = {
	index: index,
	activeIndex: 0,
	shape: shapes[index],
	active: shapes[index][0],
	color: colors[index],
	nextIndex: nextIndex,
	nextShape: shapes[nextIndex],
	nextActive: shapes[nextIndex][0],
	nextColor: colors[nextIndex],
	position: {
		x: 3,
		y: 0,
	},
	board: board,
	score: 0,
	time: 1000,
	isPlaying: true,
}

export const GameReducer = (state, action) => {
	let newState = {...state}
	//don't do anything if not playing
	if(!newState.isPlaying) {
		return newState
	}

	newState.board = undraw(newState.board, newState.active, newState.position)

	switch (action) {
		case 'MOVE_LEFT': {
			newState.position.x--
			break
		}
		case 'MOVE_RIGHT': {
			newState.position.x++

			break
		}
		case 'MOVE_DOWN': {
			newState.position.y++

			if(checkCollision(newState.board, newState.active, newState.position)) {
				newState.position.y--
				//try to lock the piece
				if(!canLock(newState.position)) {
					//newState.isPlaying = false
					newState.score = 0
					newState.position = {x: 3, y: 0}
					newState.board = resetBoard(newState.board)
					return newState
				}
				
				newState.board = draw(newState.board, newState.active, newState.position, newState.color)
				newState.position.x = 3
				newState.position.y = 0

				newState.index = newState.nextIndex
				newState.shape = newState.nextShape
				newState.active = newState.nextActive
				newState.color = newState.nextColor

				newState.nextIndex = Math.floor(Math.random() * shapes.length)
				newState.nextShape = shapes[newState.nextIndex]
				newState.nextActive = shapes[newState.nextIndex][0]
				newState.nextColor = colors[newState.nextIndex]

			}

			break
		}
		case 'ROTATE': {

			break
		}
		case 'GAME_OVER': {
			newState.isPlaying = false
			break
		}
		case 'TOGGLE': {

			break
		}
		case 'RESET':  {

			break
		}
		default: {
			break
		}
	}
	newState.board = draw(newState.board, newState.active, newState.position, newState.color)
	return newState
}


const undraw = (board, piece, position) => {
	return draw(board, piece, position, null)
}

const draw = (board, piece, position, color) => {
	for(let i = 0; i < piece.length; i++) {
		for(let j = 0; j < piece[i].length; j++) {
			if(!piece[i][j]) {
				continue
			}
			board[position.y + i][position.x + j] = color
		}
	}
	return board
}

const checkCollision = (board, piece, position) => {
	for(let i = 0; i < piece.length; i++) {
		for(let j = 0; j < piece[i].length; j++) {

			if(!piece[i][j]) {
	  			continue
			}

			if(position.y + i >= ROWS) {
		  		return true
			}

			if(position.x + j < 0 || position.x + j >= COLS) {
		  		return true
			}

			if(board[position.y + i][position.x + j]) {
		  		return true
			}
		}
	}
	return false
}

const canLock = (position) => {
	return position.y !== 0
}


const flushRows = (board) => {
	let full = true
	let nb = 0

	for(let i = 0; i < board; i++) {
		for(let j = 0; j < board[i].length; j++) {
			if(board[i][j] === EMPTY) {
				full = false
			}
		} 

		if(full) {
			nb++
			flushRow(board, i)
		}
	}
	
	return {nb: nb, board: board}

}

const flushRow = (board, index) => {
	for(let i = index; i > 0; i++) {
		board[i] = board[i - 1]
	}

	for(let i = 0; i < board[0].length; i++) {
		board[0][i] = EMPTY
	}
}

const resetBoard = (board) => {
	for(let i = 0; i < board.length; i++) {
		for(let j = 0; j < board[i].length; j++) {
			board[i][j] = null
		}
	}

	return board
}