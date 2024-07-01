import React from 'react';

export default function Card({ title, value }:{title:string, value:string}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}
