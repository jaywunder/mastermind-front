import React, { Component } from 'react'

const Peg = ({ color }) =>
  <div className="Peg popout" style={{'--peg-color': Peg.renderColor(color) }} />


Peg.colors = {
  RED: Symbol('RED'),
  ORANGE: Symbol('ORANGE'),
  YELLOW: Symbol('YELLOW'),
  GREEN: Symbol('GREEN'),
  BLUE: Symbol('BLUE'),
  INDIGO: Symbol('INDIGO'),
  VIOLET: Symbol('VIOLET'),
  BLACK: Symbol('BLACK'),
  WHITE: Symbol('WHITE'),
}

Peg.renderColor = color => {
  switch (color) {
    case Peg.colors.RED: return '#E70000'
    case Peg.colors.ORANGE: return '#FF8C00'
    case Peg.colors.YELLOW: return '#FFEF00'
    case Peg.colors.GREEN: return '#00811F'
    case Peg.colors.BLUE: return '#0044FF'
    case Peg.colors.INDIGO: return '#A41F66'
    case Peg.colors.VIOLET: return '#760089'
    case Peg.colors.BLACK: return '#000000'
    case Peg.colors.WHITE: return '#FFFFFF'
    default: return '#888888'
  }
}

Peg.colorToIndex = color => {
  switch (color) {
    case Peg.colors.RED: return 0
    case Peg.colors.ORANGE: return 1
    case Peg.colors.YELLOW: return 2
    case Peg.colors.GREEN: return 3
    case Peg.colors.BLUE: return 4
    case Peg.colors.INDIGO: return 5
    case Peg.colors.VIOLET: return 6
    case Peg.colors.BLACK: return 7
    case Peg.colors.WHITE: return 8
  }
}

Peg.indexToColor = index => {
  switch (index) {
    case 0: return Peg.colors.RED
    case 1: return Peg.colors.ORANGE
    case 2: return Peg.colors.YELLOW
    case 3: return Peg.colors.GREEN
    case 4: return Peg.colors.BLUE
    case 5: return Peg.colors.INDIGO
    case 6: return Peg.colors.VIOLET
    case 7: return Peg.colors.BLACK
    case 8: return Peg.colors.WHITE
  }
}

Peg.charToColor = index => {
  switch (index) {
    case 'r': return Peg.colors.RED
    case 'o': return Peg.colors.ORANGE
    case 'y': return Peg.colors.YELLOW
    case 'g': return Peg.colors.GREEN
    case 'l': return Peg.colors.BLUE
    case 'i': return Peg.colors.INDIGO
    case 'p': return Peg.colors.VIOLET
    case 'b': return Peg.colors.BLACK
    case 'w': return Peg.colors.WHITE
  }
}

Peg.colorToChar = index => {
  switch (index) {
    case Peg.colors.RED: return 'r'
    case Peg.colors.ORANGE: return 'o'
    case Peg.colors.YELLOW: return 'y'
    case Peg.colors.GREEN: return 'g'
    case Peg.colors.BLUE: return 'l'
    case Peg.colors.INDIGO: return 'i'
    case Peg.colors.VIOLET: return 'p'
    case Peg.colors.BLACK: return 'b'
    case Peg.colors.WHITE: return 'w'
  }
}

export default Peg
