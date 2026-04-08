import React from 'react';
import Calendar from './components/Calendar';
import { EventProvider } from './context/EventContext';

function App() {
  return (
    <EventProvider>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-slate-950">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="w-full max-w-5xl bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-white/10 relative z-10">
          <Calendar />
        </div>
        
        {/* Footer info for aesthetics */}
        <p className="mt-8 text-sm text-slate-400 font-medium relative z-10 tracking-wide">
          Frontend Engineering Challenge &middot; Interactive Calendar
        </p>
      </div>
    </EventProvider>
  );
}

export default App;
