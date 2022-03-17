import React from 'react';
import {MapGenerator} from "./components/MapGenerator/MapGenerator";
import {FetchData} from "./components/FetchData/FetchData";

function App() {
    return (
        <div className='app'>
            <MapGenerator />
            <FetchData />
        </div>
    );
}

export default App;
