import { useState, type FormEvent } from "react"


interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <div>
       <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Buscar ciudad..."
        className="border px-4 py-2 rounded w-full"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Buscar</button>
    </form>
    </div>
  )
}

