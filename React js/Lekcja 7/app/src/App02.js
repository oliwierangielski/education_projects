import { useSelector } from 'react-redux'

function App() {
    return (
        <div>
            <h1>02 - THREE REDUCERS</h1>
            <h2>array w store: {JSON.stringify(useSelector((state) => state.arrayVal.value1))}</h2>
            <h2>object w store: {JSON.stringify(useSelector((state) => state.objectVal.value1))}</h2>
            <h2>array of objects w store: {JSON.stringify(useSelector((state) => state.arrayOfObjectsVal.value1))}</h2>
        </div>
    );
}

export default App;
