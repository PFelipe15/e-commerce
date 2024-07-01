'use client'
import React from 'react';
import Sidebar from './_components/sidebar';
import Dashboard from './_components/dashboard';
import Produtos from './_components/produtos';
import Vendas from './_components/vendas';

export default function Admin() {
  return (

       <main >
        <Dashboard />
        <Produtos />
        <Vendas />
      </main>
   
  );
}
