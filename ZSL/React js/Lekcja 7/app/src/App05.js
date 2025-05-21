import { useDispatch, useSelector } from 'react-redux'
import { addRandomLetter, removeFirstLetter, removeLastLetter } from './slices/TextSlice'

function App() {
    const dispatch = useDispatch()
    const counter = useSelector((state) => state.alphabet.value)
    return (
        <div>
            <h1>05 - ALPHABET </h1>
            <button className='button' onClick={() => dispatch(addRandomLetter())} >add random letter</button>
            <button className='button' onClick={() => dispatch(removeLastLetter())} >remove last</button>
            <button className='button' onClick={() => dispatch(removeFirstLetter())} >remove first</button>
            <div className='heroText'>text: {counter}</div>
        </div>
    );
}

export default App;
