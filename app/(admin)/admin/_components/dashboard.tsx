import React from 'react';
import Card from './card';
import BarChartComponent from './bar-chart-component';
import LineChartComponent from './line-chart-component';
 
const dataVendas = [
  { mês: 'Janeiro', vendas: 1000 },
  { mês: 'Fevereiro', vendas: 2000 },
  { mês: 'Março', vendas: 1500 },
  { mês: 'Abril', vendas: 3000 },
  { mês: 'Maio', vendas: 2500 },
  { mês: 'Junho', vendas: 4000 },
];

const dataClientes = [
  { mês: 'Janeiro', clientes: 50 },
  { mês: 'Fevereiro', clientes: 100 },
  { mês: 'Março', clientes: 150 },
  { mês: 'Abril', clientes: 200 },
  { mês: 'Maio', clientes: 250 },
  { mês: 'Junho', clientes: 300 },
];



export default function Dashboard() {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total de Produtos" value="100" />
        <Card title="Total de Vendas" value="$10,000" />
        <Card title="Clientes" value="500" />
        <Card title="Produtos Ativos" value="80" />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Vendas Mensais</h3>
          <BarChartComponent data={dataVendas} dataKey="vendas" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Crescimento de Clientes</h3>
          <LineChartComponent data={dataClientes} dataKey="clientes" />
        </div>
      </div>

     
    </section>
  );
}
