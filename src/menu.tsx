'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useActionState } from 'react'; // 1. Importado de 'react'
import { login, logout, getUserSession, LoginState } from '@/actions/auth';

const initialState: LoginState = {
  email: '',
  password: '',
  success: false,
  message: '',
};

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // 2. Atualizado para useActionState
  // Retorna: [estadoAtual, funçãoDeAção, estáPendente]
  const [state, formAction, isPending] = useActionState(login, initialState);

  useEffect(() => {
    async function checkSession() {
      const session = await getUserSession();
      setUser(session);
    }
    checkSession();
  }, []);

  useEffect(() => {
    if (state.success) {
      setIsModalOpen(false);
      getUserSession().then(setUser);
    }
  }, [state.success]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    window.location.reload();
  };

  return (
    <>
      <nav className="bg-gray-50 border-b border-gray-200 shadow-sm z-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Lado Esquerdo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src="/domus-solis.png"
                    alt="Logo Domus Solis"
                    width={40}
                    height={40}
                    className="object-cover"
                    priority
                  />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-800">
                  Domus Solis
                </span>
              </Link>
            </div>

            {/* Lado Direito */}
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-600 hover:text-[#ebd127] font-medium transition-colors duration-200">
                  Home
                </Link>
                <Link href="/artigos" className="text-gray-600 hover:text-[#ebd127] font-medium transition-colors duration-200">
                  Artigos
                </Link>
                <Link href="/sobre" className="text-gray-600 hover:text-[#ebd127] font-medium transition-colors duration-200">
                  Sobre
                </Link>

                {user && (
                  <Link href="/admin/usuarios" target="_blank" rel="noopener noreferrer" passHref className="text-red-600 hover:text-red-800 font-bold transition-colors duration-200">
                    Administração
                  </Link>
                )}
              </div>

              <div>
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                      Olá, {user.name || user.nome}
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-full transition-colors"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center bg-[#ebd127] hover:bg-[#d4bd23] text-gray-900 font-bold py-2 px-6 rounded-full shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
            
            <div className="bg-[#ebd127] p-4 flex justify-between items-center">
              <h2 className="text-gray-900 font-bold text-lg">Acessar Conta</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-800 hover:text-white transition-colors text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              <form action={formAction} className="space-y-4">
                
                {!state.success && state.message && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center">
                    {state.message}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ebd127] focus:border-[#ebd127]"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
                  <input
                    type="password"
                    name="senha"
                    id="senha"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ebd127] focus:border-[#ebd127]"
                    placeholder="••••••••"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending} // 3. Usamos isPending para desabilitar o botão
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-[#ebd127] hover:bg-[#d4bd23] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ebd127] ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isPending ? 'Entrando...' : 'Entrar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;