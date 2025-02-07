import { useState } from "react";
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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filter.minPrice}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filter.maxPrice}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label
            htmlFor="minSize"
            className="block text-sm font-medium text-gray-700"
          >
            Min Size
          </label>
          <input
            type="number"
            id="minSize"
            name="minSize"
            value={filter.minSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label
            htmlFor="maxSize"
            className="block text-sm font-medium text-gray-700"
          >
            Max Size
          </label>
          <input
            type="number"
            id="maxSize"
            name="maxSize"
            value={filter.maxSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label
            htmlFor="rooms"
            className="block text-sm font-medium text-gray-700"
          >
            Rooms
          </label>
          <select
            id="rooms"
            name="rooms"
            value={filter.rooms}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value={1}>1room</option>
            <option value={2}>2rooms</option>
            <option value={3}>3rooms+</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
      >
        検索
      </button>
    </form>
  );
};

export default Filter;
