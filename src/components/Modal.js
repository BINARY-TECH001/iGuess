import React from 'react'

const Modal = ({ isCorrect, turn, solution }) => {
  return (
    <div className='modal'>
      {isCorrect && (
        <div>
            <h1> You Win! 😍</h1>
            <hr/>
            <p className='solution'> <span className='answer'> Answer is : </span> {solution} </p>
            <p> You found the solution <b>{turn}</b> guess </p>
        </div>
      )}
      
      {!isCorrect && (
        <div>
            <h1> Nevermind! 😒 </h1>
            <hr/>
            <p className='solution'> <span className='answer'> Answer is : </span> {solution} </p>
            <p> Better luck next time </p>
        </div>
      )}
    </div>
  )
}

export default Modal
