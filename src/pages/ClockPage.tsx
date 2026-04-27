import { useState, useEffect } from 'react';
import { Clock as ClockIcon, Calendar, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface TimeZone {
  name: string;
  zone: string;
}

const TIMEZONES: TimeZone[] = [
  { name: 'Local Time', zone: 'local' },
  { name: 'New York', zone: 'America/New_York' },
  { name: 'London', zone: 'Europe/London' },
  { name: 'Paris', zone: 'Europe/Paris' },
  { name: 'Tokyo', zone: 'Asia/Tokyo' },
  { name: 'Sydney', zone: 'Australia/Sydney' },
  { name: 'Dubai', zone: 'Asia/Dubai' },
  { name: 'Singapore', zone: 'Asia/Singapore' },
  { name: 'Mumbai', zone: 'Asia/Kolkata' },
];

export default function ClockPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDate, setShowDate] = useState(true);
  const [selectedTimezone, setSelectedTimezone] = useState('local');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeInZone = (zone: string) => {
    if (zone === 'local') return currentTime;
    return new Date(currentTime.toLocaleString('en-US', { timeZone: zone }));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const format24Hour = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const time = getTimeInZone(selectedTimezone);

  return (
    <>
      <Helmet>
        <title>World Clock | Current Time | TheCalHub</title>
        <meta name="description" content="Check current time across global time zones. Beautiful clock display with world time zones." />
        <meta name="keywords" content="world clock, current time, time zone, clock online" />
        <link rel="canonical" href="https://thecalhub.com/clock.html" />
      </Helmet>

      <div className="min-h-screen bg-neutral-900 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-800/50 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center">
              <ClockIcon className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-white font-bold text-lg">World Clock</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDate(!showDate)}
              className={`p-2 rounded-lg transition-colors ${
                showDate ? 'bg-primary-fixed/20 text-primary-fixed' : 'text-neutral-400 hover:text-white'
              }`}
              title="Toggle date"
            >
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center mb-12">
            <div className="text-[120px] font-light text-white leading-none tracking-tight font-mono">
              {formatTime(time)}
            </div>
            
            {showDate && (
              <div className="text-xl text-neutral-400 mt-4">
                {formatDate(time)}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const isToday = time.getDay() === i;
              return (
                <div
                  key={day}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-medium ${
                    isToday
                      ? 'bg-primary-fixed text-white'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}
                >
                  {day.charAt(0)}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTimezone('local')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimezone === 'local'
                  ? 'bg-primary-fixed text-white'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              <Globe className="w-4 h-4 inline mr-2" />
              Local
            </button>
            {TIMEZONES.slice(1).map((tz) => (
              <button
                key={tz.zone}
                onClick={() => setSelectedTimezone(tz.zone)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimezone === tz.zone
                    ? 'bg-primary-fixed text-white'
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                }`}
              >
                {tz.name}
              </button>
            ))}
          </div>

          <div className="mt-8 text-center text-neutral-500">
            <span className="text-2xl font-mono">{format24Hour(time)}</span>
            <span className="text-sm ml-2">(24-hour)</span>
          </div>
        </div>
      </div>
    </>
  );
}