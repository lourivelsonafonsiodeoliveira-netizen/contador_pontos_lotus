const { useState, useEffect } = React;

function JiuJitsuScoreboard() {
  const [athlete1, setAthlete1] = useState({ name: 'Atleta 1', points: 0, advantages: 0, penalties: 0 });
  const [athlete2, setAthlete2] = useState({ name: 'Atleta 2', points: 0, advantages: 0, penalties: 0 });
  const [time, setTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [editingTime, setEditingTime] = useState(false);
  const [tempMinutes, setTempMinutes] = useState(5);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addPoints = (athlete, points) => {
    if (athlete === 1) {
      setAthlete1(prev => ({ ...prev, points: prev.points + points }));
    } else {
      setAthlete2(prev => ({ ...prev, points: prev.points + points }));
    }
  };

  const removePoints = (athlete, points) => {
    if (athlete === 1) {
      setAthlete1(prev => ({ ...prev, points: Math.max(0, prev.points - points) }));
    } else {
      setAthlete2(prev => ({ ...prev, points: Math.max(0, prev.points - points) }));
    }
  };

  const addAdvantage = (athlete) => {
    if (athlete === 1) {
      setAthlete1(prev => ({ ...prev, advantages: prev.advantages + 1 }));
    } else {
      setAthlete2(prev => ({ ...prev, advantages: prev.advantages + 1 }));
    }
  };

  const removeAdvantage = (athlete) => {
    if (athlete === 1) {
      setAthlete1(prev => ({ ...prev, advantages: Math.max(0, prev.advantages - 1) }));
    } else {
      setAthlete2(prev => ({ ...prev, advantages: Math.max(0, prev.advantages - 1) }));
    }
  };

  const addPenalty = (athlete) => {
    if (athlete === 1) {
      setAthlete1(prev => ({ ...prev, penalties: prev.penalties + 1 }));
    } else {
      setAthlete2(prev => ({ ...prev, penalties: prev.penalties + 1 }));
    }
  };

  const removePenalty = (athlete) => {
    if (athlete === 1) {
      setAthlete1(prev => ({ ...prev, penalties: Math.max(0, prev.penalties - 1) }));
    } else {
      setAthlete2(prev => ({ ...prev, penalties: Math.max(0, prev.penalties - 1) }));
    }
  };

  const resetMatch = () => {
    setAthlete1(prev => ({ ...prev, points: 0, advantages: 0, penalties: 0 }));
    setAthlete2(prev => ({ ...prev, points: 0, advantages: 0, penalties: 0 }));
    setTime(tempMinutes * 60);
    setIsRunning(false);
  };

  const handleTimeChange = () => {
    setTime(tempMinutes * 60);
    setEditingTime(false);
  };

  const getWinner = () => {
    if (athlete1.points > athlete2.points) return athlete1.name;
    if (athlete2.points > athlete1.points) return athlete2.name;
    if (athlete1.advantages > athlete2.advantages) return athlete1.name;
    if (athlete2.advantages > athlete1.advantages) return athlete2.name;
    if (athlete1.penalties < athlete2.penalties) return athlete1.name;
    if (athlete2.penalties < athlete1.penalties) return athlete2.name;
    return 'Empate';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            🏆 LOTUS CLUB SJC
          </h1>
          <p className="text-2xl text-yellow-400 font-semibold mb-1">Campeonato Interno de Jiu-Jitsu</p>
        </div>

        {/* Cronômetro */}
        <div className="bg-black bg-opacity-50 rounded-2xl p-6 mb-6 text-center">
          <div className="text-8xl md:text-9xl font-bold text-white mb-4 font-mono tracking-wider">
            {formatTime(time)}
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all"
            >
              {isRunning ? '⏸ Pausar' : '▶ Iniciar'}
            </button>
            <button
              onClick={resetMatch}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all"
            >
              🔄 Reset
            </button>
            <button
              onClick={() => setEditingTime(!editingTime)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all"
            >
              ⏱ Ajustar Tempo
            </button>
          </div>
          {editingTime && (
            <div className="mt-4 flex justify-center gap-3 items-center">
              <input
                type="number"
                value={tempMinutes}
                onChange={(e) => setTempMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 px-4 py-2 rounded-lg text-2xl font-bold text-center bg-gray-800 text-white"
              />
              <span className="text-white text-xl">minutos</span>
              <button
                onClick={handleTimeChange}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold"
              >
                OK
              </button>
            </div>
          )}
        </div>

        {/* Placar Principal */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Atleta 1 */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 shadow-2xl">
            <input
              type="text"
              value={athlete1.name}
              onChange={(e) => setAthlete1(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-white bg-opacity-20 text-white text-3xl md:text-4xl font-bold text-center p-4 rounded-xl mb-6 border-2 border-white border-opacity-30"
              placeholder="Nome do Atleta 1"
            />

            <div className="text-center mb-6">
              <div className="text-9xl font-bold text-white mb-2">{athlete1.points}</div>
              <div className="text-2xl text-blue-200 font-semibold">PONTOS</div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              <button onClick={() => addPoints(1, 2)} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-4 rounded-lg font-bold text-xl">+2</button>
              <button onClick={() => addPoints(1, 3)} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-4 rounded-lg font-bold text-xl">+3</button>
              <button onClick={() => addPoints(1, 4)} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-4 rounded-lg font-bold text-xl">+4</button>
              <button onClick={() => removePoints(1, 1)} className="bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white py-4 rounded-lg font-bold text-xl">-1</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black bg-opacity-30 rounded-xl p-4 text-center">
                <div className="text-yellow-300 text-sm font-semibold mb-2">VANTAGENS</div>
                <div className="text-4xl font-bold text-white mb-2">{athlete1.advantages}</div>
                <div className="flex gap-2">
                  <button onClick={() => addAdvantage(1)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-xl">+</button>
                  <button onClick={() => removeAdvantage(1)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-xl">−</button>
                </div>
              </div>

              <div className="bg-black bg-opacity-30 rounded-xl p-4 text-center">
                <div className="text-red-300 text-sm font-semibold mb-2">PUNIÇÕES</div>
                <div className="text-4xl font-bold text-white mb-2">{athlete1.penalties}</div>
                <div className="flex gap-2">
                  <button onClick={() => addPenalty(1)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-xl">+</button>
                  <button onClick={() => removePenalty(1)} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-xl">−</button>
                </div>
              </div>
            </div>
          </div>

          {/* Atleta 2 */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 shadow-2xl">
            <input
              type="text"
              value={athlete2.name}
              onChange={(e) => setAthlete2(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-white bg-opacity-20 text-white text-3xl md:text-4xl font-bold text-center p-4 rounded-xl mb-6 border-2 border-white border-opacity-30"
              placeholder="Nome do Atleta 2"
            />

            <div className="text-center mb-6">
              <div className="text-9xl font-bold text-white mb-2">{athlete2.points}</div>
              <div className="text-2xl text-red-200 font-semibold">PONTOS</div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              <button onClick={() => addPoints(2, 2)} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-4 rounded-lg font-bold text-xl">+2</button>
              <button onClick={() => addPoints(2, 3)} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-4 rounded-lg font-bold text-xl">+3</button>
              <button onClick={() => addPoints(2, 4)} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-4 rounded-lg font-bold text-xl">+4</button>
              <button onClick={() => removePoints(2, 1)} className="bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white py-4 rounded-lg font-bold text-xl">-1</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black bg-opacity-30 rounded-xl p-4 text-center">
                <div className="text-yellow-300 text-sm font-semibold mb-2">VANTAGENS</div>
                <div className="text-4xl font-bold text-white mb-2">{athlete2.advantages}</div>
                <div className="flex gap-2">
                  <button onClick={() => addAdvantage(2)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-xl">+</button>
                  <button onClick={() => removeAdvantage(2)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-xl">−</button>
                </div>
              </div>

              <div className="bg-black bg-opacity-30 rounded-xl p-4 text-center">
                <div className="text-red-300 text-sm font-semibold mb-2">PUNIÇÕES</div>
                <div className="text-4xl font-bold text-white mb-2">{athlete2.penalties}</div>
                <div className="flex gap-2">
                  <button onClick={() => addPenalty(2)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-xl">+</button>
                  <button onClick={() => removePenalty(2)} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-xl">−</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vencedor */}
        {time === 0 && (
          <div className="bg-yellow-500 rounded-2xl p-8 text-center shadow-2xl animate-pulse">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              🏆 VENCEDOR: {getWinner()} 🏆
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(JiuJitsuScoreboard));