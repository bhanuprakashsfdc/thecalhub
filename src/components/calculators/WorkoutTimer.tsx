import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

function WorkoutTimer() {
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [displayTime, setDisplayTime] = useState({ m: 30, s: 0 });
  
  useEffect(() => {
    let interval: number;
    if (isRunning && (displayTime.m > 0 || displayTime.s > 0)) {
      interval = window.setInterval(() => {
        setDisplayTime(prev => {
          if (prev.s === 0 && prev.m === 0) {
            setIsRunning(false);
            return prev;
          }
          if (prev.s === 0) {
            return { m: prev.m - 1, s: 59 };
          }
          return { m: prev.m, s: prev.s - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, displayTime]);
  
  const start = () => {
    setDisplayTime({ m: minutes, s: seconds });
    setIsRunning(true);
  };
  
  const reset = () => {
    setIsRunning(false);
    setDisplayTime({ m: minutes, s: seconds });
  };
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Activity className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Workout Timer</span></div>
      <div className="text-6xl font-bold text-white mono text-center mb-8">{String(displayTime.m).padStart(2, '0')}:{String(displayTime.s).padStart(2, '0')}</div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input className="bg-surface-container-highest border-none rounded-lg py-3 px-3 text-white mono text-center" type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} placeholder="Min" />
        <input className="bg-surface-container-highest border-none rounded-lg py-3 px-3 text-white mono text-center" type="number" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} placeholder="Sec" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={start} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl">Start</button>
        <button onClick={reset} className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl">Reset</button>
      </div>
    </div>
  );
}
export default WorkoutTimer;