'use client'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
 
export default function Home() {
  const [bgStyle, setBgStyle] = useState("bg-cover bg-center bg-no-repeat bg-banner");

  useEffect(() => {
    const interval = setInterval(() => {
      setBgStyle(prevStyle => {
        if (prevStyle === "bg-cover bg-center bg-no-repeat bg-banner") {
          return "bg-cover bg-center bg-no-repeat bg-banner2";
        } else if (prevStyle === "bg-cover bg-center bg-no-repeat bg-banner2") {
          return "bg-cover bg-center bg-no-repeat bg-banner3";
        } else if (prevStyle === "bg-cover bg-center bg-no-repeat bg-banner3") {
          return "bg-cover bg-center bg-no-repeat bg-banner4";
        } else {
          return "bg-cover bg-center bg-no-repeat bg-banner";
        }
      });
    }, 20000);  

    return () => clearInterval(interval);
  }, []); 

  return (
    <section
      className={`${bgStyle} transition duration-1000 ease-in-out flex flex-col items-center justify-center w-full h-[70vh] text-white`}
    >
      <div className="flex flex-col gap-4 mr-[24rem] text-black font-extrabold mb-32 rounded-lg">
        <h1 className="text-9xl bg-white p-2 rounded-lg text-primary font-bold">
          STILO20
        </h1>
        <p className="text-xl font-sans mb-4 font-normal  bg-white text-primary rounded-xl p-2">
          Descubra as últimas tendências da moda e encontre seus looks
          favoritos!
        </p>
        <Link href="#collections">
          <Button className="bg-primary   text-white  hover:text-primary p-4  rounded transition duration-300 ease-in-out transform hover:scale-110">
            Explore as Coleções
          </Button>
        </Link>
      </div>
    </section>
  );
}
