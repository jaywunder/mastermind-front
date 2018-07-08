import React, { Component } from 'react'
import Peg from './Peg'

class PegSelector extends Component {
  constructor(...args) {
    super(...args)

    this.pegsWrapper = React.createRef()
    this.state = {
      activePeg: Peg.colorToIndex(this.props.initialColor || Peg.colors.RED),
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.activePeg !== prevState.activePeg) {
      const newColor = Peg.indexToColor(this.state.activePeg)
      this.props.onPegChange && this.props.onPegChange(newColor)
    }
  }

  // componentDidMount() {
  //   this.pegsWrapper.current.addEventListener('scroll', this.handleDOMScroll)
  // }
  //
  // componentWillUnmount() {
  //   this.pegsWrapper.current.removeEventListener('scroll', this.handleDOMScroll)
  // }


  handleScrollUp = () =>
    this.setState(({activePeg}) => ({activePeg: Math.max(activePeg - 1, 0)}))

  handleScrollDown = () =>
    this.setState(({activePeg}) => ({activePeg: Math.min(activePeg + 1, Object.keys(Peg.colors).length - 1)}))

  // handleDOMScroll = event => {
  //   event.preventDefault()
  //   console.log('current', this.pegsWrapper.current.scrollTop)
  //   console.log('event', event)
  // }

  render () {
    return <div className="PegSelector">
      <button onClick={this.handleScrollUp}>⬆️</button>
      <div className="pegs-wrapper" ref={this.pegsWrapper}>
        <div className="pegs" style={{'--active-peg': this.state.activePeg}}>
          {Object.values(Peg.colors).map((color, i) =>
            <Peg color={color} key={i} />
          )}
        </div>
      </div>
      <button onClick={this.handleScrollDown}>⬇️</button>
    </div>
  }
}

export default class TurnSelector extends Component {
  constructor(...args) {
    super(...args)

    const pegs = []
    for (let i = 0; i < this.props.initialPegsAmount; i++) {
      pegs.push(Peg.colors.RED)
    }

    this.state = { pegs }
  }

  handlePegChange = i => color =>
    this.setState(({pegs}) => {
      pegs[i] = color
      pegs = pegs.concat()
      return { pegs }
    })

  handleSubmitGuess = () => {
    this.props.onSubmitGuess(this.state.pegs)
  }

  render () {
    return <div className="TurnSelector">
      {this.state.pegs.map((color, i) =>
        <PegSelector key={i}
          initialColor={color}
          onPegChange={this.handlePegChange(i)}
        />
      )}

      <button
        className="guess-button"
        onClick={this.handleSubmitGuess}
      >🤔</button>
    </div>
  }
}
