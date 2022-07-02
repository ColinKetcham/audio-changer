import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

import Player from './Player';

const Microphone = () => {
  const [recording, setRecording] = useState('Record');
  const [mic, setMic] = useState(new Tone.UserMedia());
  const [recorder, setRecorder] = useState(new Tone.Recorder());
  const [meter, setMeter] = useState(new Tone.Meter());
  const [player, setPlayer] = useState(new Tone.Meter());
  const [audioUrl, setAudio] = useState('');

  mic.connect(meter);
  mic.connect(recorder);

  const startRecording = async () => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    await mic.open();
    // await mic.open().then(() => {
    //   setInterval(() => console.log(meter.getValue()), 100);
    // });

    await recorder.start();
    console.log(recorder.state);

    setRecording('Recording');
  };

  const stopRecording = async () => {
    await mic.close();
    console.log(recorder.state);
    var data = await recorder.stop();

    console.log('data', data);
    var blobUrl = URL.createObjectURL(data);
    console.log('blobladsfasdf', blobUrl);
    setAudio(blobUrl);
    setRecording('Record');
    // let player = new Tone.Player(blobUrl, () => {}).toDestination();

    // player.start();
  };

  const playRecording = async () => {
    // console.log('starting play');
    // const buffer = await new Tone.ToneAudioBuffer(
    //   audioUrl,
    //   () => {
    //     console.log('loaded');
    //   },
    //   () => {
    //     console.log('errorrred');
    //   }
    // );
    // console.log('buffer', buffer);
    // console.log('playing');
    const player = new Tone.Player(audioUrl, () => {
      console.log('player loaded');
      player.start();
    }).toDestination();

    // player.start();
  };

  useEffect(() => {
    console.log('audioUrl', audioUrl);
  }, [audioUrl]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button onClick={startRecording}>{recording}</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <button onClick={playRecording}>Play Recording</button>
      </div>
      <Player music={audioUrl} />
    </div>
  );
};

export default Microphone;
