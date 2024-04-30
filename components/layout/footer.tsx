export default function Footer() {
    return (
      <footer className="  text-secondary font-bold bg-primary">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold">Stilo20</h2>
              <p className="mt-2">A melhor moda ao seu alcance.</p>
            </div>

            <div className="text-center md:text-right">
              <p>© 2024 Stilo20. Todos os direitos reservados.</p>
              <p>Desenvolvido por SeuNome.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  