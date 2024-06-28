'use client'
import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, StreetViewPanorama } from '@react-google-maps/api';
import { Button } from "../../ui/button";

const locations = [
  {
    name: "Atendimento Centro Barroso",
    address: "R. Barroso, 136 - 8 - Centro (Sul), Teresina - PI, 64001-130",
    contact: "Rose 💓",
    lat: -5.093012492571005,
    lng: -42.81369066441768,
    
  },
  {
    name: "Atendimento Centro Praça João Luis",
    address: "R. David Caldas, 187 - Centro (Sul), Teresina - PI, 64000-190",
    contact: "Layza 💕",
    lat: -5.089666461319296,
    lng: -42.81363688220865,
  },
   
  {
    name: "Atendimento Santa Maria",
    address: "Rua da Praça, 789",
    contact: "Denise 💓",
    lat: -5.092670743603099,
    lng: -42.815464261410334,
  },
  {
    name: "Atendimento Centro Banco Nordeste",
    address: "R. Rui Barbosa, 143 B - Centro (Sul), Teresina - PI, 64000-090",
    contact: "Neiliane 💕",
    lat: -5.091373745162892,
    lng: -42.81612701779063,
  },
 
  {
    name: "Atendimento Timon",
    address: "Av Presidente Médici, 316 Parque Piauí - Centro, Timon - MA, 65631-390",
    contact: "Joseany 💕",
    lat: -5.091496146553129,
    lng: -42.83417986441768,
    
  },
  {
    name: "Atendimento Centro Rui Barbosa",
    address: "R. Rui Barbosa, sala 09 - Centro (Sul), Teresina - PI, 64001-902",
    contact: "Jamila 💕",
    lat: -5.0927388750232385,
    lng: -42.81544279999965,
    
  },
  {
    name: "Atendimento Dirceu",
    address: "Av. José Francisco De Almeida Neto, Q 41 N° 13/3 Dirceu I - Itararé, Teresina - PI, 64077-116",
    contact: "Jamila 💕",
    lat: -5.1049246896829965,
    lng: -42.757802982208666,
    
  },

   
];

export default function Map() {
  const [center, setCenter] = useState({
    lat: -5.092670743603099,
    lng: -42.815464261410334,
  });
  const [text, setText] = useState("");
  const [pinVisible, setPinVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEAPIS_PUBLISHABLE_KEY!,
  });

  const handleLocationClick = (lat: any, lng: any, text: string) => {
    setText(text);
    setCenter({ lat, lng });
    setPinVisible(true);
    setViewVisible(false);
  };

  const options = {
    mapTypeControl: false,
    zoomControl: true,
    fullscreenControl: false,
    clickableIcons: true,
    scrollwheel: true,
  };

  return isLoaded ? (
    <div id="Localization" className="bg-white rounded-lg shadow-md p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Nossas Lojas</h1>
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {locations.map((location) => (
          <Button
            key={location.name}
            className="min-w-[200px] h-[60px] flex flex-col items-center justify-center border-2 border-gray-200 rounded-lg   transition"
            onClick={() => handleLocationClick(location.lat, location.lng, location.name)}
          >
            <p className="font-semibold">{location.name}</p>
            <p className="text-sm">{location.contact}</p>
          </Button>
        ))}
      </div>
      <GoogleMap
        options={options}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
      >
        {pinVisible && (
          <MarkerF
            position={center}        
            onClick={() => {
              setViewVisible(true);
            }}
          />
        )}
        <StreetViewPanorama
          options={{
            position: center,
            visible: viewVisible ,
          }}
        />
      </GoogleMap>
    </div>
  ) : (
    <div>Carregando...</div>
  );
}
