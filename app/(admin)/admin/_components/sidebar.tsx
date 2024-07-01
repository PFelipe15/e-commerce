import React from 'react';
import { FaChartBar, FaBox, FaShoppingCart, FaUsers, FaStore, FaUserTie } from 'react-icons/fa';
import Logo from '@/components/layout/logo';

export default function Sidebar() {
  return (
    <aside className="bg-primary text-white w-64 min-h-screen shadow-lg">
      <div className="p-6 flex flex-col items-center gap-8">
        <Logo />
        <ul className="w-full space-y-4">
          {[
            { icon: FaChartBar, label: 'Dashboard' },
            { icon: FaBox, label: 'Produtos' },
            { icon: FaShoppingCart, label: 'Vendas' },
            { icon: FaUsers, label: 'Clientes' },
            { icon: FaStore, label: 'Lojas' },
            { icon: FaUserTie, label: 'Meus Funcionários' },
          ].map(({ icon: Icon, label }) => (
            <li key={label} className="w-full">
              <a
                href="#"
                className="flex items-center space-x-2 p-2 px-4 rounded-md hover:bg-gray-700 hover:text-gray-300 transition-all duration-200 ease-in-out w-full"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
