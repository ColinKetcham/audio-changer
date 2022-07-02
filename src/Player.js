import './App.css';
import * as Tone from 'tone';

function Player({ music }) {
  var player = new Tone.Player({
    url: music,
    loop: true,
  }).toDestination();

  let pitchShift09 = new Tone.PitchShift({
    pitch: '1.805',
  }).toDestination();

  let pitchShift075 = new Tone.PitchShift({
    pitch: '4.879',
  }).toDestination();
  let pitchShift05 = new Tone.PitchShift({
    pitch: '11.931',
  }).toDestination();
  let normalShift = new Tone.PitchShift({
    pitch: '0',
  }).toDestination();

  // GUI //

  const handleClick = async () => {
    // player.stop();
    // console.log('clicked');
    await Tone.start();
    player.playbackRate = 1;
    player.disconnect();
    player.connect(normalShift);
    await player.start();
    console.log('playing');
  };
  const handleClick2 = async () => {
    // player.stop();
    // console.log('clicked');
    await Tone.start();
    player.playbackRate = 0.75;
    player.disconnect();
    player.connect(pitchShift075);
    await player.start();
    console.log('playing');
  };
  const handleClick3 = async () => {
    // player.stop();
    // console.log('clicked');
    await Tone.start();
    player.playbackRate = 0.5;
    player.disconnect();
    player.connect(pitchShift05);
    await player.start();
    console.log('playing');
  };
  const handleClick4 = async () => {
    // player.stop();
    // console.log('clicked');
    await Tone.start();
    player.playbackRate = 0.9;
    player.disconnect();
    player.connect(pitchShift09);
    await player.start();
    console.log('playing');
  };

  const handleStop = () => {
    player.stop();
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>play</button>
        <button onClick={handleClick4}>play 0.9</button>
        <button onClick={handleClick2}>play 0.75</button>
        <button onClick={handleClick3}>play 0.5</button>
        <button onClick={handleStop}>stop</button>
      </div>
    </>
  );
}

export default Player;
