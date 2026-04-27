import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Timer, Settings } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerConfig {
  work: number;
  shortBreak: number;
  longBreak: number;
}

const DEFAULT_CONFIG: TimerConfig = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
};

const MODE_LABELS: Record<TimerMode, string> = {
  work: 'Focus Time',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

export default function PomodoroTimer() {
  const [config, setConfig] = useState<TimerConfig>(() => {
    const saved = localStorage.getItem('thecalhub-pomodoro-config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });
  const [timeLeft, setTimeLeft] = useState(config.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem('thecalhub-pomodoro-config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    setTimeLeft(config[mode] * 60);
    setIsRunning(false);
  }, [mode, config]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleB4uX7nW8X1+fW5wd3qIi4qIiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYqJiYmKiYmJiYm');
      audio.play().catch(() => {});
      
      if (mode === 'work') {
        const newSessions = sessions + 1;
        setSessions(newSessions);
        if (newSessions % 4 === 0) {
          setMode('longBreak');
        } else {
          setMode('shortBreak');
        }
      } else {
        setMode('work');
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, mode, sessions]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => setIsRunning(!isRunning);
  
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(config[mode] * 60);
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
  };

  const progress = (timeLeft / (config[mode] * 60)) * 100;

  return (
    <>
      <Helmet>
        <title>Free Online Pomodoro Timer | Focus Timer | TheCalHub</title>
        <meta name="description" content="Free online Pomodoro timer - boost productivity with 25/5 work/break intervals. Customizable timer with audio notifications." />
        <meta name="keywords" content="pomodoro timer, focus timer, productivity timer, work timer, break timer" />
        <link rel="canonical" href="https://thecalhub.com/pomodoro-timer.html" />
      </Helmet>

      <div className="min-h-screen bg-neutral-900 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-800/50 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center">
              <Timer className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-white font-bold text-lg">Pomodoro Timer</h1>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {showSettings && (
          <div className="bg-neutral-800/30 border-b border-white/5 p-4">
            <div className="max-w-md mx-auto grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-neutral-400 block mb-2">Focus (min)</label>
                <input
                  type="number"
                  value={config.work}
                  onChange={(e) => setConfig({ ...config, work: parseInt(e.target.value) || 25 })}
                  className="w-full bg-neutral-700 border border-white/10 rounded px-3 py-2 text-white"
                  min="1"
                  max="60"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-2">Short Break</label>
                <input
                  type="number"
                  value={config.shortBreak}
                  onChange={(e) => setConfig({ ...config, shortBreak: parseInt(e.target.value) || 5 })}
                  className="w-full bg-neutral-700 border border-white/10 rounded px-3 py-2 text-white"
                  min="1"
                  max="30"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-2">Long Break</label>
                <input
                  type="number"
                  value={config.longBreak}
                  onChange={(e) => setConfig({ ...config, longBreak: parseInt(e.target.value) || 15 })}
                  className="w-full bg-neutral-700 border border-white/10 rounded px-3 py-2 text-white"
                  min="1"
                  max="60"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="flex gap-2 mb-8">
            {(['work', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === m
                    ? 'bg-primary-fixed text-white'
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                }`}
              >
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>

          <div className="relative w-72 h-72 mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="144"
                cy="144"
                r="130"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-neutral-700"
              />
              <circle
                cx="144"
                cy="144"
                r="130"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 130}
                strokeDashoffset={2 * Math.PI * 130 * (1 - progress / 100)}
                className="text-primary-fixed transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold text-white font-mono">{formatTime(timeLeft)}</span>
              <span className="text-neutral-500 mt-2">{MODE_LABELS[mode]}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleStartPause}
              className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center hover:bg-primary-fixed/80 transition-colors"
            >
              {isRunning ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
            <button
              onClick={handleReset}
              className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors"
            >
              <RotateCcw className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-neutral-500">
            <Coffee className="w-4 h-4" />
            <span className="text-sm">Sessions completed: {sessions}</span>
          </div>
        </div>
      </div>
    </>
  );
}