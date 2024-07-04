import { useState, useEffect } from "react";
import { useCartStore } from "@/store";
import Image from "next/image";
import CheckoutButton from "./CheckoutButton";
import Checkout from "./Checkout";
import OrderCompleted from "./OrderCompleted";
import { formatPrice } from "./../../lib/formatPrice";
import { CircleMinus, MoveLeft, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { FaMapMarker, FaChevronDown, FaChevronUp, FaEdit, FaTrash, FaCheckCircle, FaRegWindowClose  } from "react-icons/fa";
import AddressForm from "./addressForm";
import Modal from "./Modal"; // Novo import para o modal
  
interface Address {
  street?: string;
  number?: string;
  state?: string;
  city?: string;
  zip?: string;
  placeName?: string;
  neighborhood?: string;

}

export default function CartDrawer() {
  
  const useStore = useCartStore();
  const { user } = useUser();
  const [address, setAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const [savedAddress, setSavedAddress] = useState<Address | null>(null);
  const [editHasAddress, setEditHasAddress] = useState(false);
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false); // Novo estado para controlar o modal
  const [showClientInfo, setShowClientInfo] = useState(false); // Estado para controlar visibilidade das informações do cliente
  const [showAddressInfo, setShowAddressInfo] = useState(false); // Estado para controlar visibilidade das informações de endereço
  const [showProducts, setShowProducts] = useState(false); // Estado para controlar visibilidade dos produtos

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const savedAddr = localStorage.getItem("userAddress");

    if (savedAddr) {
      setHasAddress(true);
      setSavedAddress(JSON.parse(savedAddr));
      setAddress(JSON.parse(savedAddr));
    }
  }, [useStore.isOpen,useStore.stepCart ]);

  useEffect(() => {
    if (address) {
      localStorage.setItem("userAddress", JSON.stringify(address));
    }
  }, [address]);

  const handleEditAddress = () => {
    setEditHasAddress(true);
  };

  const handleNewAddress = (address:Address) => {
    localStorage.setItem("userAddress", JSON.stringify(address));

  }

  const handleCancelEdit = () => {
    setEditHasAddress(false);
  };

  const handleDeleteAddress = () => {
    localStorage.removeItem("userAddress");
    setSavedAddress(null);
    setHasAddress(false);
  };

  const StepHeader = ({ step, title, description, onBack }: {
    step: number;
    title: string;
    description: string;
    onBack?: () => void;   
  }) => (
    <div className="flex justify-between  mb-4">
      <div className = "flex flex-col  gap-2">
        <h3 className=" text-xl md:text-2xl font-bold text-primary">{title}</h3>
        <p className="text-sm text-gray-600 font-semibold">{description}</p>
      </div>
      {onBack && (
        <Button  variant={'outline'}  onClick={onBack} className="p-2">
          <MoveLeft size={25} className="text-primary" />
        </Button>
      )}
    </div>
  );

  const totalPriceAll = useStore.cart.reduce((acc, item) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return acc + Number(item.price!) * item.quantity!;
  }, 0);

 

  const handleStepChange = (step:number, description:string) => {
    useStore.setStepCart(step);
    
  };


  return (
    
    <section className="flex flex-col md:min-w-[450px]   items-center gap-2 p-2 bg-gray-100 h-screen">
      <div className="flex  justify-between  items-center w-full mb-4">
        <h1 className=" text-2xl md:text-3xl font-bold p-2 text-primary  ">
          Carrinho de Compras 🛒
        </h1>
        <Button className="p-1 px-2" onClick={()=>{
          useStore.toggleCart();
        }}>
        <X size={20}/>
          
           </Button>
      </div>

      <div className="border-t border-gray-400 my-4 w-full" />

      {useStore.onCheckout === "cart" && (
        <>
          <div className="w-full  overflow-y-auto flex-grow">
            {useStore.cart.map((item) => (
              <Card
                key={item.id}
                className="w-full bg-white rounded-lg shadow-md overflow-hidden mb-4"
              >
                <CardHeader className="bg-primary p-4 flex justify-between  items-center">
                  <CardTitle className="text-base font-bold text-white">
                    {item.name} 
                  </CardTitle>
                 
                </CardHeader>
                <CardContent className="p-4 flex items-center">
                  <Image
                    src={item.image || ""}
                    width={75}
                    height={75}
                    alt={item.name}
                    className="object-cover rounded-md"
                  />
                  <div className="flex items-center justify-between gap-2 flex-grow ml-4">
                    <p className="text-lg font-semibold">
                      Preço: {formatPrice(Number(item.price))}
                    </p>
                    <Link
                      href={`/products/${item.id}`}
                      className="text-white p-2 rounded-md bg-primary hover:text-black"
                    >
                      Detalhes
                    </Link>

                   
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center  p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium text-lg">Total:</span>
                    <span className="ml-2 text-lg font-bold">
                     
 {formatPrice(Number(item.price) * item.quantity!)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium text-lg">Quantidade:</span>
                    <span className="ml-2 text-lg font-bold">
                     
 {item.quantity}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      useStore.removeProduct(item);
                    }}
                  >
                    <CircleMinus size={20} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="w-full max-w-lg mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total do Carrinho:</span>
              <span className="text-xl font-bold">
                {formatPrice(totalPriceAll)}
              </span>
            </div>
            <CheckoutButton totalPrice={totalPriceAll} />
          </div>
        </>
      )}

{useStore.onCheckout === "checkout" && (
  <>
    <div >
      {useStore.stepCart === 1 && (
        <>
          <StepHeader
            step={1}
            title="Passo 1: Endereço de Entrega"
            description="Selecione ou adicione um novo endereço de entrega."
            onBack={() => useStore.setCheckout("cart")}
          />
          {!savedAddress || editHasAddress || newAddress ? (
            <AddressForm
              onSubmit={(addr) => {
                handleNewAddress(addr);
                handleStepChange(2, "Resumo do Pedido");
              }}
              onCancel={handleCancelEdit}
              savedAddress={editHasAddress ? savedAddress : null}
            />
          ) : (
            <div className="flex flex-col gap-4">
              {savedAddress && (
                <>
                  <Card className="flex flex-col items-start p-4 bg-gray-50 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Endereço Salvo:</h3>
                    <p><strong>Nome do Lugar:</strong> {savedAddress.placeName}</p>
                    <p><strong>Endereço:</strong> {savedAddress.street}, {savedAddress.number}</p>
                    <p><strong>Bairro:</strong> {savedAddress.neighborhood || 'Bairro não informado'}</p>
                    <p><strong>Cidade:</strong> {savedAddress.city}</p>
                    <p><strong>Estado:</strong> {savedAddress.state}</p>
                    <p><strong>CEP:</strong> {savedAddress.zip}</p>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex items-center gap-1" onClick={handleEditAddress}>
                        <FaEdit /> Editar
                      </Button>
                      <Button className="flex items-center gap-1" onClick={handleDeleteAddress}>
                        <FaTrash /> Excluir
                      </Button>
                      <Button className="bg-green-600 text-white flex items-center gap-1" onClick={() => {
                        setAddress(savedAddress);
                        handleStepChange(2, "Resumo do Pedido");
                      }}>
                        <FaCheckCircle /> Selecionar
                      </Button>
                    </div>
                  </Card>
                  <Button className="px-6 py-2 w-full text-lg bg-primary hover:bg-primary-dark text-white font-semibold rounded-md" onClick={() => setNewAddress(true)}>
                    Novo Endereço <FaMapMarker size={20} />
                  </Button>
                  <Button onClick={()=>{return useStore.setCheckout("cart");}} className="px-6 py-2 w-full text-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-md">
              Voltar ao Carrinho
            </Button>
          

                </>
              )}
            </div>
          )}
        </>
      )}

      {useStore.stepCart === 2 && address && (
        <div className="flex flex-col gap-2 h-full">
          <StepHeader
            step={2}
            title="Passo 2: Resumo do Pedido"
            description="Confira as informações do pedido antes de continuar."
            onBack={() => handleStepChange(1, "Endereço de Entrega")}
          />
          
          <div className="bg-white p-4 rounded-lg shadow-md mb-2">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold text-gray-700">Informações do Cliente</h4>
              <Button className="p-1" onClick={() => setShowClientInfo(!showClientInfo)}>
                {showClientInfo ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
              </Button>
            </div>
            {showClientInfo && (
              <div className="mt-2 space-y-2">
                <p className="text-gray-600"><strong>Nome:</strong> {user?.fullName}</p>
                <p className="text-gray-600"><strong>Email:</strong> {user?.emailAddresses[0].emailAddress}</p>
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mb-2">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold text-gray-700">Endereço de Entrega</h4>
              <Button className="p-1" onClick={() => setShowAddressInfo(!showAddressInfo)}>
                {showAddressInfo ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
              </Button>
            </div>
            {showAddressInfo && (
              <div className="mt-2 space-y-2">
                <p className="text-gray-600"><strong>Nome do lugar:</strong> {address.placeName}</p>
                <p className="text-gray-600"><strong>Endereço:</strong> {address.street}, {address.number}</p>
                <p className="text-gray-600"><strong>Cidade:</strong> {address.city}</p>
                <p className="text-gray-600"><strong>Estado:</strong> {address.state}</p>
                <p className="text-gray-600"><strong>CEP:</strong> {address.zip}</p>
              </div>
            )}
          </div>

          <div className="bg-white max-w-sm p-4 rounded-lg shadow-md mb-2">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold text-gray-700">Produtos</h4>
              <Button className="p-1" onClick={() => setShowProducts(!showProducts)}>
                {showProducts ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
              </Button>
            </div>
            {showProducts && (
              <>
                {useStore.cart.map((item) => (
                  <div key={item.id} className="flex justify-between border-b border-gray-200 py-2">
                    <div>
                      <p className="text-gray-600"><strong>Produto:</strong> {item.name} ({item.quantity})</p>
                    </div>
                    <div>
                      <p className="text-gray-600"><strong>Preço:</strong> {formatPrice(Number(item.price) * Number(item.quantity))}</p>
                    </div>
                  </div>
                ))}
                <p className="text-lg font-semibold text-gray-800 mt-2">Total: {formatPrice(totalPriceAll)}</p>
              </>
            )}
          </div>

          <div className="flex flex-col items-center mt-4 space-y-2">
            
            <Button onClick={() => setShowModal(true)} className="px-6 py-2 w-full text-lg bg-primary hover:bg-primary-dark text-white font-semibold rounded-md">
              Confirmar Resumo da Compra
            </Button>

            <Button onClick={() => handleStepChange(1, "Endereço de Entrega")} className="px-6 py-2 w-full text-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-md">
              Voltar ao Endereço
            </Button>
          </div>
        </div>
      )}

      {useStore.stepCart === 3 && address && (
        <div className="flex flex-col gap-4">
          <StepHeader
            step={3}
            title="Passo 3: Aguardando Pagamento"
            description="Realize o pagamento para concluir a compra."
          />
          <Checkout />
        </div>
      )}
    </div>
  </>
)}

      {useStore.onCheckout === "success" && <OrderCompleted />}

     

      {showModal && (
  <Modal
    items={useStore.cart.map(item => ({
      name: item.name,
      price: item.price!,
      quantity: item.quantity!,
    }))}
    total={totalPriceAll}
    onConfirm={() => {
      useStore.setStepCart(3);
      setShowModal(false);
    }}
    onCancel={() => setShowModal(false)}
  />
)}
    </section>
  );
}
