import { useSelector } from 'react-redux'

function App() {

    return (
        <div>
            <h1>01 - READ VALUE FROM STORE</h1>
            <h2>wartość value1 w store: {useSelector((state) => state.testValue.value1)}</h2>
        </div>
    );
}

export default App;
