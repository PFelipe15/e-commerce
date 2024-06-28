'use client'
import { SetStateAction, useState } from "react";




export default function Filter() {
    const [filter, setFilter] = useState('all')

    const handleFilterChange = (e: { target: { value: SetStateAction<string>; }; }) => {
      setFilter(e.target.value);
    };
    return (
      <>
        <div className="w-full flex justify-center mb-4">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="all">Todos</option>
            <option value="vestido">Vestidos</option>
            <option value="crooped">Crooped</option>
            <option value="Calcados">Calcados</option>
          </select>
        </div>
      </>
    );
}