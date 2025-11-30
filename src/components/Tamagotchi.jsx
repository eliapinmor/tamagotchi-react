import { useState, useEffect, useRef } from "react";

export function Tamagotchi() {
  const [hunger, setHunger] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [health, setHealth] = useState(100);
  const [tamagotchiState, setTamagotchiState] = useState("happy");
  const timer = useRef();

  const getProgressColor = (value) => {
    if (value > 60) return "bg-green-500"; // Verde para valores altos
    if (value > 20) return "bg-yellow-500"; // Amarillo para valores medios
    return "bg-red-500"; // Rojo para valores bajos
  };

  const updateTamagotchiState = () => {
    if (health < 30) return "sad";
    if (hunger < 30) return "mad";
    if (happiness < 30) return "bored";
    return "happy";
  };
  useEffect(() => {
    setTamagotchiState(updateTamagotchiState());
  }, [hunger, happiness, health]);

  const feed = () => {
    setHunger((prevHunger) => Math.min(prevHunger + 20, 100));
    setHealth((prevHealth) => Math.min(prevHealth + 5, 100));
    setHappiness((prevHappiness) => Math.min(prevHappiness + 5, 100));
  };
  const play = () => {
    setHappiness((prevHappiness) => Math.min(prevHappiness + 20, 100));
    setHunger((prevHunger) => Math.max(prevHunger - 5, 0));
    setHealth((prevHealth) => Math.max(prevHealth - 5, 0));
  };
  const sleep = () => {
    setHealth((prevHealth) => Math.min(prevHealth + 10, 100));
    setHunger((prevHunger) => Math.max(prevHunger - 5, 0));
    setHappiness((prevHappiness) => Math.max(prevHappiness - 5, 0));
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      setHappiness((happiness) => happiness - 5);
      setHealth((health) => health - 1);
      setHunger((hunger) => hunger - 1);
    }, 3000);

    return () => clearInterval(timer.current);
  }, []);
  // Funciones de interacción aquí...
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Tamagotchi</h1>
      <div className="flex justify-center mb-4">
        <img
          src={`/tamagotchi-sprites/Mametchi_${tamagotchiState}.webp`}
          alt={tamagotchiState}
          className="w-32 h-32 tamagotchi-img"
        />
      </div>
      <div className="space-y-3">
        {/* Barras de estado con estilos de Tailwind */}
        <div className="flex items-center">
          <label className="mr-2 font-medium">Hunger:</label>
          <div className="bg-gray-300 h-4 rounded overflow-hidden">
            <div
              className={`${getProgressColor(hunger)} h-full`}
              style={{ width: `${hunger}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={hunger}
              readOnly
              className="w-full appearance-none bg-transparent absolute top-0 left-0 h-4 pointer-events-none"
            />
          </div>
        </div>
        <div className="flex items-center">
          <label className="mr-2 font-medium">Happiness:</label>
          <div className="flex-1 bg-gray-300 h-4 rounded overflow-hidden">
            <div
              className="bg-blue-500 h-full"
              style={{ width: `${happiness}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={happiness}
              readOnly
              className="w-full appearance-none bg-transparent absolute top-0 left-0 h-4 pointer-events-none"
            />
          </div>
        </div>
        <div className="flex items-center">
          <label className="mr-2 font-medium">Health:</label>
          <div className="flex-1 bg-gray-300 h-4 rounded overflow-hidden">
            <div
              className="bg-red-500 h-full"
              style={{ width: `${health}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={health}
              readOnly
              className="w-full appearance-none bg-transparent absolute top-0 left-0 h-4 pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        {/* Botones con estilos de Tailwind */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={feed}
        >
          Feed
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={play}
        >
          Play
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          onClick={sleep}
        >
          Sleep
        </button>
      </div>
    </div>
  );
}
