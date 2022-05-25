import { bank1, bank2 } from "./data.js";

function DrumMachine(){
    const [volume, setVolume] = React.useState(0.5);
    const [bank, setBank] = React.useState(bank1);
    return(
        <div>
            <h1 className="text-center mt-3">DRUM MACHINE</h1>
            <div id="drum-machine" className="mt-3"> 
                <div id="grid-container">               
                    {bank.map(item => (<Pad clip={item} vol={volume} key={item.id}/>))}  
                </div>
                <div id="display-text">
                    <p id="text"></p>
                </div> 
                <div id="display-volume">
                    <h4>Volume:</h4> 
                    <input type="range" id="volume" step="0.01" min="0" max="1" value={volume} onChange={(e)=>setVolume(e.target.value)}></input>
                </div>
                <div id="display-bank">
                    <h4>Bank:</h4>
                    <label className="switch">
                      <input type="checkbox" onClick={()=>setBank(bank === bank1 ? bank2 : bank1)}/>
                      <span className="slider"></span>
                    </label>
                </div>
             </div>        
        </div>
    )
}

function Pad(props){
    function playSound(){
        const audio = document.getElementById(props.clip.keyTrigger);  
        audio.play();
        audio.volume = props.vol;
        const element = document.getElementById(props.clip.id);
        element.style.backgroundColor = "orange";
        setTimeout(()=> element.style.backgroundColor = "grey", 200);
        document.getElementById("text").innerHTML = props.clip.id;
    }

    document.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(event) {
        if(event.keyCode === props.clip.keyCode){
            playSound();
        }
    }
    return(
        <div>
            <button className="drum-pad" id={props.clip.id} onClick={playSound}>{props.clip.keyTrigger}</button>
              <audio id={props.clip.keyTrigger} src={props.clip.url}></audio>          
        </div>
    )
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));