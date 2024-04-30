'use client'
import React, { useEffect, useState } from 'react';
import CartButton from './Cart-button';
import Logo from './Logo';
import UserNav from './User-nav';
 
 
 

const Header: React.FC = () => {
  const [isMouseEvent, setIsMouseEvent] = useState(false);
  
   useEffect(() => {
    const handleScroll = (event) => {
      // Verificar se o evento foi acionado por um mouse
      if (event instanceof MouseEvent) {
        // Verificar a direção do scroll (para baixo) e a rota
        if (event.deltaY > 0 ) {
          setIsMouseEvent(true);
        } else {
          setIsMouseEvent(false);
        }
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }   );

  
  
  // return (


  //   <header className="bg-primary p-4  w-full sticky top-0 z-10 shadow">
  //     <div className="container mx-auto flex items-center gap-4 justify-between">
  //       <div>
  //         <div className="flex items-center space-x-4">
  //           <Image
  //             alt="logo"
  //             className="rounded-full border-2 border-white"
  //             width={60}
  //             height={60}
  //           />
  //           <div className="text-white">
  //             <h1 className="text-2xl 2xl:text-5xl font-bold tracking-wide">
  //               Stilo20{" "}
  //             </h1>
  //             <p className="text-sm 2xl:text-xl">Seja Fashion, seja Stilo20</p>
  //           </div>
  //         </div>
  //       </div>
  //         <div className="flex gap-2  text-white font-bold items-center mt-4 jus">
  //           <div className="p-2 bg-white bg-opacity-10 px-4 rounded-md font-bold flex items-center space-x-4 ">
  //             <Link href="/" className="">
  //               Home
  //             </Link>
  //             <Link href="#" className="">
  //               Sobre
  //             </Link>
  //             <Link href="/products" className="">
  //               Roupas
  //             </Link>
  //             <Link href="#" className="">
  //               Contato
  //             </Link>
  //           </div>

  //           <CartButton />

          
  //         </div>

  //       {/* <div className="flex items-center flex-col-reverse justify-center gap-3">
  //         <div className="text-primary flex items-center space-x-2">
  //           <a href="#" className="hover:text-gray-300">
  //             <Facebook size={24} />
  //           </a>
  //           <a href="#" className="hover:text-gray-300">
  //             <Instagram size={24} />
  //           </a>
  //           <a href="#" className="hover:text-gray-300">
  //             <Twitter size={24} />
  //           </a>
  //         </div>

  //         <div className="flex gap-2">
  //           <button
  //             onClick={() => {
  //               const link = `https://api.whatsapp.com/send?phone= &text=Olá, estou querendo solicitar um Orçamento!`;

  //               const newTab = window.open(link, "_blank");
  //               if (newTab) {
  //                 newTab.focus();
  //               } else {
  //                 window.location.href = link;
  //               }
  //             }}
  //             className="bg-green-700 w-full text-sm text-white gap-1 flex rounded-md px-2 py-2 items-center justify-center "
  //           >
  //             <WheatIcon size={25} />
  //             WhatsApp
  //           </button>

  //           <button
  //             onClick={() => {
  //               const link = `https://maps.app.goo.gl/x1X8wZQwiSbkDkHJ9`;

  //               const newTab = window.open(link, "_blank");
  //               if (newTab) {
  //                 newTab.focus();
  //               } else {
  //                 window.location.href = link;
  //               }
  //             }}
  //             className="bg-primary text-sm text-primary-foreground gap-1 flex rounded-md px-2 py-2 items-center justify-center "
  //           >
  //             <Map size={25} className="text-secondary" />
  //             Localização
  //           </button>
  //         </div>
  //       </div> */}
  //     </div>
  //   </header>
  // );

  return (
    <header  className={`sticky top-0 z-10 shadow bg-white text-primary`}>
      <div className="container mx-auto p-8 flex items-center justify-between">
        <Logo />
        <div className="flex items-center justify-center space-x-4">
          <CartButton />
          <UserNav />
        </div>

      </div>
 
     </header>
  );
}

export default Header;