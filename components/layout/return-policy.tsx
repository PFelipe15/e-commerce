import { Info } from 'lucide-react';

const ReturnPolicy = () => {
  return (
    <section className="my-8 bg-white p-6 md:p-8 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Info className="h-6 w-6 text-primary mr-2" />
        <h2 className="text-3xl font-bold text-primary">Política de Devolução</h2>
      </div>
      <p className="text-gray-800 mb-4">
        Se você não estiver satisfeito com sua compra de roupas, oferecemos uma política de devolução de 30 dias. Os detalhes são os seguintes:
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>
          Você pode devolver os produtos gratuitamente dentro de 30 dias após a entrega.
        </li>
        <li>
          Os produtos devem estar em sua condição original, com etiquetas intactas e sem sinais de uso.
        </li>
        <li>
          Para iniciar uma devolução, entre em contato com nosso suporte ao cliente <a href="#Contact" className="text-primary hover:underline">aqui</a>.
        </li>
      </ul>
    </section>
  );
}

export default ReturnPolicy;
