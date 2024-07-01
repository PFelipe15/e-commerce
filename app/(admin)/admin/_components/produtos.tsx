import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

export default function Produtos() {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Produtos</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600">
          <FaPlusCircle />
          <span>Adicionar Produto</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="text-left py-2 px-3">Nome do Produto</th>
              <th className="text-left py-2 px-3">Preço</th>
              <th className="text-left py-2 px-3">Estoque</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-2 px-3">Produto A</td>
              <td className="py-2 px-3">$50.00</td>
              <td className="py-2 px-3">100</td>
            </tr>
            <tr>
              <td className="py-2 px-3">Produto B</td>
              <td className="py-2 px-3">$30.00</td>
              <td className="py-2 px-3">50</td>
            </tr>
            {/* Mais linhas conforme necessário */}
          </tbody>
        </table>
      </div>
    </section>
  );
}
