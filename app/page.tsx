import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center bg-banner w-full h-[70vh] text-white">
      <div className="flex flex-col gap-4  mr-[24rem] text-black  font-extrabold mb-32 rounded-lg  ">
        <h1 className="text-9xl text-primary font-bold mb-4">STILO20</h1>
        <p className="text-xl mb-8 font-bold bg-primary rounded-xl px-2 ">Descubra as últimas tendências da moda e encontre seus looks favoritos!</p>
        <Link href="#collections">
          <Button className="bg-primary font-bold  text-white   py-4 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110">
            Explore as Coleções
          </Button>
        </Link>
      </div>
    </section>
  );
}
