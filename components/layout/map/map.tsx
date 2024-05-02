'use client'
import React, { useState } from "react";
import { GoogleMap, useJsApiLoader , MarkerF  ,StreetViewPanorama} from '@react-google-maps/api';
 import { Button } from "../../ui/button";
  
 
    const locations = [
      {
        name: "Atendimento Mocambinho",
        address: "Rua das Flores, 123",
        contact: "Rose 💓",
        lat: -5.092670743603099,
        lng: -42.815464261410334,
      },
      {
        name: "Atendimento São Joaquim",
        address: "Av. Principal, 456",
        contact: "Layza 💕",
        lat: -5.092670743603099,
        lng: -42.815464261410334,
      },
      {
        name: "Atendimento Santa Maria",
        address: "Rua da Praça, 789",
        contact: "Denise 💓",
        lat: -5.092670743603099,
        lng: -42.815464261410334,
      },
      {
        name: "Atendimento Timon",
        address: "Av. das Palmeiras, 101",
        contact: "Neiliane 💕",
        lat: -5.091531882222092,
        lng: -42.83417518902285,
      
      },
      {
        name: "Atendimento Vila Maria",
        address: "Rua dos Sonhos, 555",
        contact: "Joseany 💕",
        lat: -5.092670743603099,
        lng: -42.815464261410334,
      },
      {
        name: "Atendimento Parque Piauí",
        address: "Av. das Estrelas, 777",
        contact: "Jamila 💕",
        lat: -5.092670743603099,
        lng: -42.815464261410334,
      },
    ];

    export default function Map() {
      const [center, setCenter] = useState({
        lat: -5.092670743603099,
        lng: -42.815464261410334,
       
      });
    const [text, setText] = useState("")
    const [pinVisible, setPinVisible] = useState(false) 
    const [viewVisible, setViewVisible] = useState(false) 

      const containerStyle = {
        width: "100%",
        height: "400px",
      };
    
      const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEAPIS_PUBLISHABLE_KEY!,
      });
  
  
    

      const handleLocationClick = (lat:any, lng:any, text:string) => {
        setText(text)
        setCenter({ lat, lng });
        setPinVisible(true);
      };

      const options={
        mapTypeControl:false,
        zoomControl:false,
        fullscreenControl:false,
        clickableIcons:true,
        scrollwheel:true
      }
    
      return isLoaded ? (
        <div id="Localization" className="bg-white  rounded-lg shadow-md p-4">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Nossas Lojas
          </h1>
          <div className="flex gap-4 justify-center mb-4 flex-wrap  ">
            {locations.map((location) => (
              <Button
                key={location.name}
                className="flex flex-co min-w-[200px] h-[50px]"
                onClick={() =>
                  handleLocationClick(location.lat, location.lng, location.name)
                }
              >
                <div>
                  <p >{location.name}</p>
                  {location.contact}
                </div>
              </Button>
            ))}
          </div>
          <GoogleMap
            options={options}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={100}
          >
            <MarkerF
              position={center}
              visible={pinVisible}
              label={{
                text: text,
                className: "text-3xl text-primary mb-20",
              }}
              onClick={() => {
                setViewVisible(true);
              }}
            ></MarkerF>

            <StreetViewPanorama
              options={{
                position: center,
                visible: viewVisible,
              }}
              
             
            />
          </GoogleMap>

          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center">
            Encontrar a mais perto de mim
          </button>
        </div>
      ) : (
        <div>Carregando...</div>
      );
    }
