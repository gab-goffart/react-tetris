import {shapes, colors} from '../models/tetromino'

const ROWS = 20
const COLS = 10

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
	isDead: false
}

export const GameReducer = (state, action) => {
	let newState = {...state}
	//don't do anything if not playing

		

	newState.board = undraw(newState.board, newState.active, newState.position)

	switch (action) {
		case 'MOVE_LEFT': {
			if(!newState.isPlaying) {
				break
			}

			newState.position.x--
			if(checkCollision(newState.board, newState.active, newState.position)) {
				newState.position.x++
			}
			break
		}
		case 'MOVE_RIGHT': {
			if(!newState.isPlaying) {
			return newState
			}

			newState.position.x++
			if(checkCollision(newState.board, newState.active, newState.position)) {
				newState.position.x--
			}

			break
		}
		case 'MOVE_DOWN': {
			if(!newState.isPlaying) {
				break
			}

			newState.position.y++

			if(checkCollision(newState.board, newState.active, newState.position)) {
				newState.position.y--
				if(!canLock(newState.position)) {
					newState.isPlaying = false
					newState.isDead = true
					return newState
				}
				
				newState.board = draw(newState.board, newState.active, newState.position, newState.color)
				newState.position.x = 3
				newState.position.y = 0
				newState.score += 50

				const c = flushRows(newState.board)
				if(c.nb > 0) {
					newState.board = c.board
				console.log("flushed")

					newState.time = newState.time - c.nb * 2
					newState.score += 400 * Math.pow(2, c.nb)
				}

				newState.index = newState.nextIndex
				newState.activeIndex = 0
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
		case 'DROP': {
			if(!newState.isPlaying) {
				return newState
			}
			while(!checkCollision(newState.board, newState.active, newState.position)) {
				newState.position.y++
				//try to lock the piece
			}
			newState.position.y--

   			if(!canLock(newState.position)) {
				newState.isPlaying = false
				newState.isDead = true
				return newState
			}
			
			newState.board = draw(newState.board, newState.active, newState.position, newState.color)
			newState.position.x = 3
			newState.position.y = 0			
			newState.score += 50

			const c = flushRows(newState.board)
			if(c.nb > 0) {
				newState.board = c.board
				newState.time = newState.time - c.nb * 2
				newState.score += 400 * Math.pow(2, c.nb)
			}

			newState.index = newState.nextIndex
			newState.activeIndex = 0
			newState.shape = newState.nextShape
			newState.active = newState.nextActive
			newState.color = newState.nextColor

			newState.nextIndex = Math.floor(Math.random() * shapes.length)
			newState.nextShape = shapes[newState.nextIndex]
			newState.nextActive = newState.nextShape[0]
			newState.nextColor = colors[newState.nextIndex]
			break
		}
		case 'ROTATE': {
			if(!newState.isPlaying) {
				break
			}

			newState.activeIndex++
			newState.active = newState.shape[newState.activeIndex % newState.shape.length]
			if(checkCollision(newState.board, newState.active, newState.position)) {
				newState.activeIndex--
				newState.active = newState.shape[newState.activeIndex % newState.shape.length]
			}
			break
		}
		case 'TOGGLE': {
			if(newState.isDead) {
				break
			}
			newState.isPlaying = !newState.isPlaying
			break
		}
		case 'RESET':  {
			newState.position.x = 3
			newState.position.y = 0
			newState.time = initialState.time
			newState.board = resetBoard(newState.board)

			newState.index = Math.floor(Math.random() * shapes.length)
			newState.shape = shapes[newState.index]
			newState.active = newState.shape[0]
			newState.color = colors[newState.index]

			newState.nextIndex = Math.floor(Math.random() * shapes.length)
			newState.nextShape = shapes[newState.nextIndex]
			newState.nextActive = shapes[newState.nextIndex][0]
			newState.nextColor = colors[newState.nextIndex]

			newState.score = 0
			newState.isPlaying = true
			newState.isDead = false
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
	for(let i = 0; i < board.length; i++) {
		for(let j = 0; j < board[i].length; j++) {
			if(board[i][j] === null) {
				full = false
			}
		} 

		if(full) {
			nb++
			board = flushRow(board, i)
		}
		full = true
	}
	
	return {nb: nb, board: board}

}

const flushRow = (board, index) => {
	for(let i = index; i > 0; i--) {
		board[i] = [...board[i - 1]]
	}

	for(let i = 0; i < board[0].length; i++) {
		board[0][i] = null
	}

	return board
}

const resetBoard = (board) => {
	for(let i = 0; i < board.length; i++) {
		for(let j = 0; j < board[i].length; j++) {
			board[i][j] = null
		}
	}

	return board
}