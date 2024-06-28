import { SparklesIcon, TagIcon, GiftIcon } from 'lucide-react';

const promotions = [
  {
    icon: SparklesIcon,
    title: "Desconto de Verão",
    description: "Até 50% off em roupas de verão!",
    bgColor: "bg-primary"
  },
  {
    icon: TagIcon,
    title: "Compre 1, Leve 2",
    description: "Na compra de um jeans, leve outro grátis.",
    bgColor: "bg-primary"
  },
  {
    icon: GiftIcon,
    title: "Frete Grátis",
    description: "Frete grátis para pedidos acima de R$200.",
    bgColor: "bg-primary"
  }
];

const Promotions = () => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">Promoções Especiais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo, index) => (
          <div 
            key={index} 
            className={`${promo.bgColor} p-8 text-white rounded-lg shadow-lg flex flex-col items-start transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
          >
            <promo.icon className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
            <p>{promo.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Promotions;
