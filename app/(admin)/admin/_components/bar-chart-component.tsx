import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface dataBarChart{
  mês: string;
  vendas: number;   
 }

 interface BarChartProps{
  data: dataBarChart[];
  dataKey: string;
}

export default function BarChartComponent({ data, dataKey }:BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="mês" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill="#4299e1" />
      </BarChart>
    </ResponsiveContainer>
  );
}
