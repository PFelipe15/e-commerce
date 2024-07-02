import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

interface Address {
  street?: string;
  number?: string;
  state?: string;
  city?: string;
  zip?: string;
  placeName?: string;
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
      className="w-full max-w-md bg-white p-4 rounded shadow-md flex flex-col gap-2"
    >
      <h2 className="text-lg font-bold mb-4">
        {isEditing ? "Editar Endereço" : "Endereço de Entrega"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">Nome do Lugar:</label>
        <input
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          className="w-full p-1 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Rua:</label>
        <input
          type="text"
          value={address.street || ""}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          className="w-full p-1 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Número:</label>
        <input
          type="text"
          value={address.number || ""}
          onChange={(e) => setAddress({ ...address, number: e.target.value })}
          className="w-full p-1 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Estado:</label>
        <select
          value={selectedState}
          onChange={handleStateChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="" disabled>
            Selecione o estado
          </option>
          <option value="Piauí">Piauí</option>
          <option value="Maranhão">Maranhão</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Cidade:</label>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="w-full p-2 border rounded"
          required
          disabled={!selectedState}
        >
          <option value="" disabled>
            Selecione a cidade
          </option>
          {selectedState &&
            cities[selectedState].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">CEP:</label>
        <input
          type="text"
          value={address.zip || ""}
          onChange={(e) => setAddress({ ...address, zip: e.target.value })}
          className="w-full p-1 border rounded"
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Aceito os termos e condições
        </label>
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="w-full mt-4">
          {isEditing ? "Atualizar Endereço" : "Confirmar Endereço"}
        </Button>
        {isEditing && (
          <Button variant="outline" onClick={onCancel} className="w-full mt-4">
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
