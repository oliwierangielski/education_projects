import {  useSelector } from 'react-redux'
import App03 from './App03';
function App() {
    const counter = useSelector((state) => state.counter.value)
    let items = []
    for (let i = 1; i <= counter; i++) {
        items.push(<div className='item' key={i}>{i} : item</div>)
    }
    return (
        <>
            <App03 title="04 - ITEMS IN ARRAY" />
            <div>
                {items}
            </div>
        </>
    );
}

export default App;
