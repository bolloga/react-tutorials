import React, { useState, Fragment } from 'react';

function BasicHooks() {
    const initialState = 'Pony';
    const [state, setState] = useState(initialState);
    return (
        <div>
            <h5>Basic Hooks</h5>
            <fieldset>
                <legend>Pony transformer</legend>
                <p>Current state: {state}</p>
                <button onClick={() => setState('Unicorn')}>Transform</button>
            </fieldset>
        </div>
    )
}

function FunctionalUpdatesHooks() {
    const initialState = 'Pony';
    const [state, setState] = useState(initialState);
    return (
        <div>
            <h5>Functional updates</h5>
            <fieldset>
                <legend>FunctionalUpdatesHooks</legend>
                <p>Current state: {state}</p>
                <button onClick={() => setState((prevState) => prevState !== initialState ? initialState : 'Unicorn')}>Toggle</button>
            </fieldset>
        </div>
    )
}

function MergingWithUseState() {
    const initialGamePreferences = {
        champions: ['Soraka', 'Annie', 'Jinx'],
        gameModes: ['5v5', '3v3']
    };
    const [gamePreferences, setGamePreferences] = useState(initialGamePreferences);
    const [newChampion, setNewChampion] = useState('');
    return (
        <div>
            <h5>Merging With useState</h5>
            <fieldset>
                <legend>LoL object</legend>
                <b>Champions</b>
                <ul>
                    {gamePreferences.champions.map((champ) => <li key={champ}>{champ}</li>)}
                </ul>
                <b>Game modes</b>
                <ul>
                    {gamePreferences.gameModes.map((gameMode) => <li key={gameMode}>{gameMode}</li>)}
                </ul>
                <form onSubmit={(e, val) => {
                    e.preventDefault();
                    setGamePreferences((prevPref) => {
                        if (newChampion) {
                            prevPref.champions.push(newChampion);
                        }
                        return { ...prevPref };
                    })
                }}>
                    <label htmlFor="newChampion">Add new champion:</label>
                    <input name="newChampion" value={newChampion} onChange={(val) => setNewChampion(val.target.value)}></input>
                    <button type="submit" >Add</button>
                </form>
            </fieldset>
        </div>
    )
}

function LazyInitialState() {

    const someExpensiveComputation = () => {
        for (let index = 0; index < 1000; index++) {
            console.log('computing...');
        }
        return 'OK';
    }
    const [ticked, setTick] = useState(false);
    const [state] = useState(() => {
        const initialState = someExpensiveComputation();
        return initialState;
    })

    return (
        <Fragment>
            <div>
                <h5>Lazy Initial State</h5>
                <fieldset>
                    <legend>Initial state is only executed on the initial render</legend>
                    <label htmlFor="renderUpdate">Re-rendering doesn't log `computing...`</label>
                    <input id="renderUpdate" type="checkbox" value={ticked} onClick={(val) => setTick(val.target.checked)} />
                    {ticked ? <p>{state}</p> : null}
                </fieldset>
            </div>

        </Fragment>
    )
}

function App() {
    return (
        <Fragment>
            <BasicHooks />
            <FunctionalUpdatesHooks />
            <MergingWithUseState />
            <LazyInitialState />
        </Fragment>
    );
}

export default App;
