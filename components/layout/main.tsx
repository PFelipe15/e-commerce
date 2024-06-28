 
'use client'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Alfa_Slab_One } from "next/font/google";
import { cn } from "@/lib/utils"
 
 
    
const alfa_Slab_One = Alfa_Slab_One({weight:[ '400'],subsets:['latin']})

export default function Main() {
  const [bgStyle, setBgStyle] = useState("bg-cover bg-center bg-no-repeat bg-banner");

  useEffect(() => {
    const interval = setInterval(() => {
      setBgStyle((prevStyle) => {
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
    <div>
      <section
        className={` ${bgStyle} 
        flex h-[80vh]  flex-col items-center justify-center   md:h-[70vh] text-white`}
      >
        <div className="flex flex-col gap-4 text-black font-extrabold md:mr-[350px] md:mb-32 rounded-lg">
          <h1
            className={cn(
              alfa_Slab_One.className,
              "text-5xl md:text-9xl bg-white p-2 rounded-lg text-primary font-bold"
            )}
          >
            STILO20
          </h1>
          <p className={cn(" md:text-xl font-sans md:mb-4 font-semibold bg-white text-primary rounded-xl p-1")}>
            Descubra as últimas tendências da moda e encontre seus looks
            favoritos!
          </p>
          <Link href="/products/all">
            <Button className="bg-primary   text-white ">
              Todas as Coleções
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
