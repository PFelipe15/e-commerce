'use client'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { mês: 'Janeiro', vendas: 1000 },
  { mês: 'Fevereiro', vendas: 2000 },
  { mês: 'Março', vendas: 1500 },
  { mês: 'Abril', vendas: 3000 },
  { mês: 'Maio', vendas: 2500 },
  { mês: 'Junho', vendas: 4000 },
];

export default function Admin() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold">Administração</div>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300">Dashboard</a></li>
            <li><a href="#" className="hover:text-gray-300">Produtos</a></li>
            <li><a href="#" className="hover:text-gray-300">Vendas</a></li>
            <li><a href="#" className="hover:text-gray-300">Clientes</a></li>
            <li><a href="#" className="hover:text-gray-300">Produtos Ativos</a></li>
          </ul>
        </div>
      </nav>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Total de Produtos */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Total de Produtos</h3>
              <p className="text-gray-600">100</p>
            </div>
            {/* Total de Vendas */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Total de Vendas</h3>
              <p className="text-gray-600">$10,000</p>
            </div>
            {/* Clientes */}
            <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Clientes</h3>
              <p className="text-gray-600">500</p>
            </div>
            {/* Produtos Ativos */}
            <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Produtos Ativos</h3>
              <p className="text-gray-600">80</p>
            </div>
          </div>

          {/* Gráfico de Vendas Mensais */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Vendas Mensais</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data}>
                <XAxis dataKey="mês" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="vendas" fill="#4299e1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Produtos */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Produtos</h2>
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

        {/* Vendas */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Vendas</h2>
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
      </div>
    </div>
  );
}
