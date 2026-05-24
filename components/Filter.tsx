import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { FilterOptions } from "../lib/types";

interface FilterProps {
  onFilterChange: (filter: FilterOptions) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 10000,
    minSize: 0,
    maxSize: 200,
    rooms: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: Number.parseInt(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filter);
  };

  const inputClass =
    "mt-1 block w-full rounded-xl border border-sumi-200 bg-white/80 backdrop-blur px-3 py-2 text-sm shadow-sm transition-all focus:outline-none focus:border-sakura-300 focus:ring-2 focus:ring-sakura-200/50";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-sumi-100 bg-white/70 backdrop-blur p-6 shadow-glow-soft"
    >
      <div className="flex items-center gap-2 mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-sumi-400">
        <SlidersHorizontal className="h-3 w-3" />
        Filters · 絞り込み
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="minPrice"
            className="block text-xs font-semibold text-sumi-700"
          >
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filter.minPrice}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="maxPrice"
            className="block text-xs font-semibold text-sumi-700"
          >
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filter.maxPrice}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="minSize"
            className="block text-xs font-semibold text-sumi-700"
          >
            Min Size (m²)
          </label>
          <input
            type="number"
            id="minSize"
            name="minSize"
            value={filter.minSize}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="maxSize"
            className="block text-xs font-semibold text-sumi-700"
          >
            Max Size (m²)
          </label>
          <input
            type="number"
            id="maxSize"
            name="maxSize"
            value={filter.maxSize}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="rooms"
            className="block text-xs font-semibold text-sumi-700"
          >
            Rooms
          </label>
          <select
            id="rooms"
            name="rooms"
            value={filter.rooms}
            onChange={handleChange}
            className={inputClass}
          >
            <option value={1}>1 room</option>
            <option value={2}>2 rooms</option>
            <option value={3}>3 rooms+</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="group mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sakura text-white py-2.5 text-sm font-bold shadow-glow btn-glow transition-all hover:-translate-y-0.5"
      >
        <Search className="h-4 w-4" />
        検索する
      </button>
    </form>
  );
};

export default Filter;
