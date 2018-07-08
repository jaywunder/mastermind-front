import React, { Component } from 'react'
import TurnSelector from './TurnSelector'
import Turn from './Turn'
import Peg from './Peg'
import './App.css'

import {
  wasmBooted,
  add,
  step,
  make_game_state as makeGameState,
  init_mastermind as initMastermind
} from '../mastermind/src/lib.rs'

const GAME_STATES = {
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
}

const range = n => [...new Array(n)]
const arraysEqual = arr0 => arr1 =>
  arr0.length === arr1.length &&
  arr0.map((n, i) => arr1[i] === n).indexOf(false) === -1

export default class App extends Component {

  constructor(...args) {
    super(...args)
    this.pegsAmount = 4
    this.maxTurns = 12
    this.state = this.getStartState()
  }

  getStartState = () => {
    this.loadMastermind()

    let nulls = range(this.pegsAmount).map(() => null)
    let turns = range(this.maxTurns).map(() => ({ guess: nulls.concat(), response: [] }))

    return {
      currentTurn: 0,
      gameState: 'playing',
      turns,
    }
  }

  async loadMastermind() {
    await wasmBooted
    initMastermind(this.getRandomAnswer())
  }

  getRandomAnswer () {
    return range(this.pegsAmount)
      .map(i => Math.round(Math.random() * 8))
      .reduce((sum, elem) => sum + elem + ' ', '')
  }

  handleSubmitGuess = guess =>
    this.setState(({ turns, currentTurn }) => {
      const nextTurns = turns.concat()

      let turnExists = false
      for (let turn of turns) {
        if (arraysEqual(turn.guess)(guess)) turnExists = true
      }

      if (!turnExists && currentTurn <= turns.length) {
        nextTurns[currentTurn] = {
          guess: guess.concat(),
          response: step(guess.reduce(
            (sum, c) => sum + Peg.colorToChar(c), ''
          )).split(''),
        }

        if (nextTurns[currentTurn].response.filter(s => s === '1').length === this.pegsAmount) { // TODO MORE GENERIC
          return { gameState: GAME_STATES.WON }
        }

        return {
          currentTurn: currentTurn + 1,
          turns: nextTurns,
        }
      }
    })

  handleRestart = () => this.setState(this.getStartState)

  render() {
    if (this.state.currentTurn > this.state.turns.length) {
      this.setState({ gameState: GAME_STATES.LOST })
    }

    switch (this.state.gameState) {
      case GAME_STATES.PLAYING: return (
        <div className="App">
          <div className="turns">
            {this.state.turns.map((turn, i) => <Turn turn={turn} key={i}/>)}
          </div>

          <TurnSelector
            initialPegsAmount={this.pegsAmount}
            onSubmitGuess={this.handleSubmitGuess}
          />
        </div>
      )
      case GAME_STATES.WON: return (
        <div className="App">
          u won
          <button onClick={this.handleRestart}>restart</button>
        </div>
      )
      case GAME_STATES.LOST: return (
        <div className="App">
          u lose
          <button onClick={this.handleRestart}>restart</button>
        </div>
      )

    }
  }
}
