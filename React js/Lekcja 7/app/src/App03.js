import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './slices/CounterSlice'

function App(params) {
    const dispatch = useDispatch()
    const counter = useSelector((state) => state.counter.value)
    return (
        <div>
            <h1>{params.title ? params.title : "03 - DISPATCH ACTION"}</h1>
            <h2>counter value: {counter}</h2>
            <button className='button' onClick={() => dispatch(decrement())} >-</button><button className='button' onClick={() => dispatch(increment())} >+</button>
        </div>
    );
}

export default App;
