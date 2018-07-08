import React, { Component } from 'react'
import Peg from './Peg'

const Turn = ({ turn }) => <div className="Turn">

  <div className="guess">
    {turn.guess.map((color, i) => <Peg color={color} key={i}/>)}
  </div>

  <div className="response">
    {turn.response && turn.response.map((state, i) =>
        <div key={i}
          style={{
            backgroundColor: state === '1' ? 'black' : 'white'
          }}
        ></div>)}
  </div>

</div>

export default Turn
