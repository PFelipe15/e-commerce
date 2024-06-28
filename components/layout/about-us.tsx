'use client'
import Image from 'next/image';
import React from 'react';
import Image2 from '../../app/assets/pexels-liza-summer-6347545.jpg'
import Testimonials from './testimonials';

export default function AboutUs() {
  return (
    <div className=" w-full p-8 rounded-lg my-8 bg-primary text-white">
      
      <div className="container justify-center   flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 animate-slide-in-left">
          <Image
            src={Image2}
            alt="Sobre Nós"
            className="object-cover w-[45vw] rounded-lg shadow-lg"
            
          />
        </div>
        <div className="flex    flex-col md:w-1/2 md:pl-8 animate-slide-in-right text-justify">
        <h2 className="text-4xl font-bold text-center mb-8 animate-fade-in">Quem somos</h2>
          <p className="mb-4 text-lg">
            Somos uma empresa dedicada a fornecer os melhores produtos e serviços para nossos clientes. Fundada em 2010, temos mais de uma década de experiência no mercado, sempre buscando inovação e excelência.
          </p>
         
          <p className="mb-4 text-lg">
            Ao longo dos anos, construímos uma reputação sólida e conquistamos a confiança de nossos clientes, parceiros e colaboradores. Acreditamos que a ética, a transparência e o respeito são os pilares de um relacionamento duradouro e bem-sucedido.
          </p>
          
           <div className='flex items-center justify-center'>

          <Testimonials/>
          </div>
        </div>
      </div>
    </div>
  );
}
