import Image from 'next/image';
import Link from 'next/link';

const Menu = () => {
  return (
    <nav className="bg-gray-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Lado Esquerdo: Logo e Título */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              {/* Container da imagem para garantir o formato circular se desejado, 
                  visto que a imagem original tem fundo preto */}
              <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src="/domus-solis.png" // Caminho para sua imagem na pasta /public
                  alt="Logo Domus Solis"
                  width={40}
                  height={40}
                  className="object-cover"
                  priority // Carrega o logo com prioridade
                />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800">
                Domus Solis
              </span>
            </Link>
          </div>

          {/* Lado Direito: Links de Navegação e Botão */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            {/* Links de Navegação (ocultos em mobile, visíveis em telas médias+) */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-[#ebd127] font-medium transition-colors duration-200">
                Home
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#ebd127] font-medium transition-colors duration-200">
                Artigos
              </Link>
              <Link href="/sobre" className="text-gray-600 hover:text-[#ebd127] font-medium transition-colors duration-200">
                Sobre
              </Link>
            </div>

            {/* Botão de Login com a cor especificada */}
            <div>
              <Link href="#" className="flex items-center justify-center bg-[#ebd127] hover:bg-[#d4bd23] text-gray-900 font-bold py-2 px-6 rounded-full shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;