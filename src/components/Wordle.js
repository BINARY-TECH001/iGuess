import react, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution }){

    const { currentGuess, handleKeyUp, guesses, isCorrect, usedKeys, turn } = useWordle(solution)
    const [ showModal, setShowModal ] = useState(false)

    useEffect(()=>{
        window.addEventListener('keyup', handleKeyUp)
        if(isCorrect){
            setTimeout(()=> setShowModal(true), 1000)
            window.removeEventListener('keyup', handleKeyUp)
        }

        if(turn > 5){
            setTimeout(()=> setShowModal(true), 1000)
            window.removeEventListener('keyup', handleKeyUp)
        }
        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [handleKeyUp, isCorrect])

    // useEffect(()=>{
    //     console.log(guesses, turn, isCorrect, solution)
    // }, [guesses, turn, isCorrect, solution])

    return( 
        <>
        {/* <div> currentGuess - {currentGuess} </div>
        <div> solution - {solution} </div> */}
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
        <Keypad usedKeys={usedKeys} />
        { showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
        </>
    )
}