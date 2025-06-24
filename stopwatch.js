import React, { useState } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState({ hr: 0, min: 0, sec: 0, milli: 0 });
  const [status, setStatus] = useState(null);
  const [laps, setLaps] = useState([]);

  let updHr = time.hr;
  let updMin = time.min;
  let updSec = time.sec;
  let updMilli = time.milli;

  const start = () => {
    if (!status) {
      myFun();
      const intervalId = setInterval(myFun, 10);
      setStatus(intervalId);
    }
  };

  const stop = () => {
    clearInterval(status);
    setStatus(null);
  };

  const reset = () => {
    clearInterval(status);
    setStatus(null);
    setTime({ hr: 0, min: 0, sec: 0, milli: 0 });
    setLaps([]);
  };

  const myFun = () => {
    if (updMilli === 100) {
      updMilli = 0;
      updSec++;
    }
    if (updSec === 60) {
      updSec = 0;
      updMin++;
    }
    if (updMin === 60) {
      updMin = 0;
      updHr++;
    }
    updMilli++;
    setTime({ hr: updHr, min: updMin, sec: updSec, milli: updMilli });
  };

  const lap = () => {
    const formattedTime = `${String(time.hr).padStart(2, '0')} : ${String(time.min).padStart(2, '0')} : ${String(time.sec).padStart(2, '0')} : ${String(time.milli).padStart(2, '0')}`;
    setLaps(prev => [...prev, formattedTime]);
  };

  return (
    <>
      <div className='container' style={{ textAlign: 'center' }}>
        <h1>
          {`${time.hr} : ${time.min} : ${time.sec} : ${time.milli}`}
        </h1>
        <div className='buttons' style={{ marginBottom: '20px' }}>
          <button className='start' onClick={start}>Start</button>
          <button className='stop' onClick={stop}>Stop</button>
          <button className='lap' onClick={lap} disabled={!status}>Lap</button>
          <button className='reset' onClick={reset}>Reset</button>
        </div>

        <h3>Laps</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {laps.map((lapTime, index) => (
            <li key={index}>Lap {index + 1}: {lapTime}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Stopwatch;
