import React from 'react';
import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Loader className="animate-spin mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-2 text-lg font-semibold text-gray-900">Carregando produtos...</h2>
      </div>
    </div>
  );
}
