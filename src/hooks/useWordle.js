import { useState } from 'react'

const useWordle = (solution) =>{

    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) //each guess is an array
    const [history, setHistory] = useState([]) //each guess is a string
    const [ isCorrect, setIsCorrect ] = useState(false)
    const [ usedKeys, setUsedKeys ] = useState({}) // {a: 'green', b:'yellow'}

    // format a guess into array of objects
    // e.g [{ word: 'a', color: 'red' }]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l) =>{
            return {key: l, color: "grey"}
        })
        // find any green letters
        formattedGuess.forEach((l, i)=>{
            if (solutionArray[i] === l.key){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        // Find any Yellow Letter
        formattedGuess.forEach((l, i)=>{
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })
        return formattedGuess
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution ) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) =>{
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses 
        })
        setHistory((prevHistory)=>{
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn)=>{
            return prevTurn + 1
        })
        setUsedKeys((prevUsedKeys)=>{
            let newKeys = {...prevUsedKeys}
            formattedGuess.forEach((l)=>{
                const currentColor = newKeys[l.key]
                if(l.color === 'green'){
                    newKeys[l.key] = 'green'
                    return
                }
                if(l.color === 'yellow' && currentColor !== 'green'){
                    newKeys[l.key] = 'yellow'
                    return
                }

                if(l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow'){
                    newKeys[l.key] = 'grey'
                }
            })
            return newKeys
        })
        setCurrentGuess('')
    }

    // handle keyup events and track current guess
    // if user presses enter, add the new guess

    const handleKeyUp = ({ key })=>{
        if (key === 'Enter'){
            // only add guess if turn is less than 5
            if(turn > 5){
                console.log('Used up all guess')
                return
            }
            // do not allow duplicate word
            if(history.includes(currentGuess)){
                console.log('U already tried that word')
                return
            }
            // check word is 5 chars long
            if(currentGuess.length !== 5){
                console.log('Word must be five char long')
                return
            }
           const formatted = formatGuess()
           addNewGuess(formatted)
        }

        if(key === 'Backspace'){
            setCurrentGuess((prev)=>{
                return prev.slice(0, -1)
            })
            return
        }
        if (/^[a-zA-Z]$/.test(key)){
            if (currentGuess.length < 5){
                setCurrentGuess((prev)=>{
                    return prev + key
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp}
}


export default useWordle