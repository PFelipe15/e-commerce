import React from 'react';
import { FaFileAlt } from 'react-icons/fa';

export default function Vendas() {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Vendas</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600">
          <FaFileAlt />
          <span>Gerar Relatório</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="text-left py-2 px-3">ID da Venda</th>
              <th className="text-left py-2 px-3">Cliente</th>
              <th className="text-left py-2 px-3">Total</th>
              <th className="text-left py-2 px-3">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-2 px-3">1</td>
              <td className="py-2 px-3">Cliente A</td>
              <td className="py-2 px-3">$100.00</td>
              <td className="py-2 px-3">2024-06-01</td>
            </tr>
            <tr>
              <td className="py-2 px-3">2</td>
              <td className="py-2 px-3">Cliente B</td>
              <td className="py-2 px-3">$75.00</td>
              <td className="py-2 px-3">2024-06-02</td>
            </tr>
            {/* Mais linhas conforme necessário */}
          </tbody>
        </table>
      </div>
    </section>
  );
}
