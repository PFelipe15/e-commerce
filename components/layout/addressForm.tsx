// biome-ignore lint/style/useImportType: <explanation>
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button";

interface Address {
  street?: string;
  number?: string;
  state?: string;
  city?: string;
  zip?: string;
  placeName?: string;
  neighborhood?: string;
}

interface AddressFormProps {
  onSubmit: (address: Address) => void;
  savedAddress?: Address | null;
  onCancel: () => void;
}

export default function AddressForm({ onSubmit, savedAddress, onCancel }: AddressFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>(savedAddress || {});
  const [selectedState, setSelectedState] = useState<string>(address.state || "");
  const [selectedCity, setSelectedCity] = useState<string>(address.city || "");
  const [placeName, setPlaceName] = useState<string>(address.placeName || ""); 

  useEffect(() => {
    setAddress(savedAddress || {});
    setSelectedState(savedAddress?.state || "");
    setSelectedCity(savedAddress?.city || "");
    setPlaceName(savedAddress?.placeName || ""); 
    setIsEditing(!!savedAddress);
  }, [savedAddress]);

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setAddress({ ...address, state: newState, city: "" });
    setSelectedCity("");
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    setAddress({ ...address, city: newCity });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (address) {
      onSubmit({ ...address, placeName }); 
    }
  };

  const cities: { [key: string]: string[] } = {
    Piauí: ["Teresina"],
    Maranhão: ["Timon"],
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full   bg-white p-4 rounded shadow-md flex flex-col gap-2"
    >
      <h2 className="text-lg font-semibold mb-2 text-gray-800">
        {isEditing ? "Editar Endereço" : "Adicionar Endereço de Entrega"}
      </h2>
      <input
        type="text"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        placeholder="Nome do Lugar"
        className="w-full p-2 bg-transparent border-b border-gray-300 focus:border-primary focus:ring-0"
        required
      />
      <input
        type="text"
        value={address.street || ""}
        onChange={(e) => setAddress({ ...address, street: e.target.value })}
        placeholder="Rua"
        className="w-full p-2 bg-transparent border-b border-gray-300 focus:border-primary focus:ring-0"
        required
      />
      <input
        type="text"
        value={address.number || ""}
        onChange={(e) => setAddress({ ...address, number: e.target.value })}
        placeholder="Número"
        className="w-full p-2 bg-transparent border-b border-gray-300 focus:border-primary focus:ring-0"
        required
      />
      <input
        type="text"
        value={address.neighborhood || ""}
        onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
        placeholder="Bairro"
        className="w-full p-2 bg-transparent border-b border-gray-300 focus:border-primary focus:ring-0"
      />
      <select
        value={selectedState}
        onChange={handleStateChange}
        className="w-full p-2 bg-transparent border-b border-gray-300 focus:border-primary focus:ring-0"
        required
      >
        <option value="" disabled>Estado</option>
        <option value="Piauí">Piauí</option>
        <option value="Maranhão">Maranhão</option>
      </select>
      <select
        value={selectedCity}
        onChange={handleCityChange}
        className="w-full p-2 bg-transparent border-b border-gray-300 focus:border-primary focus:ring-0"
        required
        disabled={!selectedState}
      >
        <option value="" disabled>Cidade</option>
        {selectedState &&
          cities[selectedState].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
      </select>
      <input
        type="text"
        value={address.zip || ""}
        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
        placeholder="CEP"
        className="w-full p-2 bg-transparent border-b border-gray-300 focus:border-primary focus:ring-0"
        required
      />
      
      <div className="flex gap-2">
        <Button type="submit" className="w-full py-2 text-sm font-semibold">
          {isEditing ? "Atualizar Endereço" : "Confirmar Endereço"}
        </Button>
        {isEditing && (
          <Button variant="outline" onClick={onCancel} className="w-full py-2 text-sm font-semibold">
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
