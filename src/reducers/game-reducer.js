import React, {useReducer} from 'react'
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
		board[i][j] = EMPTY
	}
}

export const initialState = {
	index: index,
	activeIndex: 0,
	shape: shapes[index],
	activeShape: shapes[index][0],
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
}

export const GameReducer = (state, action) => {
	switch (action) {
		case 'MOVE_LEFT': {

			break
		}
		case 'MOVE_RIGHT': {

			break
		}
		case 'MOVE_DOWN': {

			break
		}
		case 'GAME_OVER': {

			break
		}
		case 'TOGGLE': {

			break
		}
		default: {
			break
		}
	}
}


const move = (board, piece, newPos) => {

}

const flushRows = (board) => {
	let full = true
	let rows = 0

	for(let i = 0; i < board; i++) {
		for(let j = 0; j < board[i].length; j++) {
			if(board[i][j] === EMPTY) {
				full = false
			}
		} 

		if(full) {
			rows++
			flushRow(board, i)
		}
	}
	
	return {rows: rows, board: board}

}

const flushRow = (board, index) => {
	for(let i = index; i > 0; i++) {
		board[i] = board[i - 1]
	}

	for(let i = 0; i < board[0].length; i++) {
		board[0][i] = EMPTY
	}
}