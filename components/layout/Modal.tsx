import React from "react";
import { Button } from "../ui/button"; // Importando o componente Button para reutilização
import { formatPrice } from "@/lib/formatPrice";
import { Checkbox } from "../ui/checkbox";

interface items{
  name: string; 
  price: string | number; 
  quantity: number;
}

interface ModalProps {
  items: items[];
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ items, total, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onCancel}></div>
      <div className="relative z-50 bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Confirmação do Pedido</h2>
        <div className="mb-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2 border-b pb-2 border-gray-200">
              <div>
                <p className="font-medium text-gray-700">{item.name}</p>
                <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
              </div>
              <p className="font-semibold text-gray-700">{formatPrice((Number(item.price) * Number(item.quantity)))}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold text-primary">{formatPrice (total)}</span>
        </div>
        <div className="flex justify-between items-center  space-x-4">
        <div className="flex items-center space-x-2 mb-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm text-gray-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Aceito os termos e condições
        </label>
      </div>
      <div className = "flex gap-4 items-center"> 

          <Button variant="outline" onClick={onCancel} className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200">
            Cancelar
          </Button>
          <Button onClick={onConfirm} className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark">
            Confirmar
          </Button>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
