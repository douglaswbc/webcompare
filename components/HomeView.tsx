
import React, { useState } from 'react';
import { PROVIDERS } from '../constants';
import { UserAddress } from '../types';

interface HomeViewProps {
  onSearch: (address: UserAddress) => void;
  onMenuClick: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onSearch, onMenuClick }) => {
  const [cep, setCep] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [addressData, setAddressData] = useState<Partial<UserAddress> | null>(null);
  const [number, setNumber] = useState('');

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCep(value);

    if (value.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setAddressData({
            cep: value,
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf
          });
          // Focus no campo numero após carregar
          setTimeout(() => document.getElementById('address-number')?.focus(), 100);
        } else {
          alert('CEP não encontrado.');
          setAddressData(null);
        }
      } catch (error) {
        console.error('Erro ao buscar CEP', error);
        alert('Erro ao buscar CEP. Verifique sua conexão.');
      } finally {
        setLoadingCep(false);
      }
    } else {
      setAddressData(null);
    }
  };

  const handleSubmit = () => {
    if (!addressData || !addressData.logradouro) {
      alert('Por favor, informe um CEP válido.');
      return;
    }
    if (!number) {
      alert('Por favor, informe o número da residência.');
      return;
    }

    onSearch({
      cep: addressData.cep || cep,
      logradouro: addressData.logradouro || '',
      bairro: addressData.bairro || '',
      localidade: addressData.localidade || '',
      uf: addressData.uf || '',
      numero: number
    });
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      {/* TopAppBar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start text-black dark:text-white">
          <span className="material-symbols-outlined text-3xl">wifi_find</span>
        </div>
        <h2 className="text-black dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          WebCompare
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button
            onClick={onMenuClick}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-black dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>

      {/* HeroSection */}
      <div className="pt-2">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-start justify-end px-4 pb-10 @[480px]:px-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqlL5jd9t5WmuGSaWnEQzIWb6sOxbzE3yV-cSAbBtVlfBRrbaTo4OMD-x8y2J7Wm_CFBBuujSJI3bHL_wzRof1xu8e8MVSaObA23xY8U3kS52ucom9qvb3V-9AL6Yu9LmPZKQzMHG2fryH_VgVKEWxh6sSQAM4tqYoSiaWKKg79L3C-1ELarmKMjCoe6Io8l2t0McIQz5ZftDIJTuBcv7SMKBU1nyUV3BU0MTOemEiHTPakeyHNadK3H1ci-2Zn1-rd4RXUnE-aw6Y")',
              }}
            >
              <div className="flex flex-col gap-2 text-left mb-2">
                <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                  Encontre o plano de internet ideal para você.
                </h1>
                <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  Digite seu CEP para ver disponibilidade e ofertas.
                </h2>
              </div>

              {/* Enhanced Search Form */}
              <div className="w-full max-w-[480px] flex flex-col gap-2 bg-[#192633]/90 p-4 rounded-xl border border-[#324d67] backdrop-blur-sm">
                
                {/* CEP Input Row */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      className="w-full rounded-lg border border-[#324d67] bg-[#0d141c] text-white px-4 h-12 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="Digite seu CEP (apenas números)"
                      value={cep}
                      onChange={handleCepChange}
                      maxLength={8}
                    />
                    {loadingCep && (
                       <div className="absolute right-3 top-3">
                         <span className="material-symbols-outlined animate-spin text-white">progress_activity</span>
                       </div>
                    )}
                  </div>
                </div>

                {/* Address Results (Conditional) */}
                {addressData && (
                  <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-3 bg-[#0d141c] rounded-lg border border-[#324d67]">
                      <p className="text-white text-sm font-medium">{addressData.logradouro}</p>
                      <p className="text-[#92adc9] text-xs">{addressData.bairro} - {addressData.localidade}/{addressData.uf}</p>
                    </div>
                    
                    <div className="flex gap-2 items-center">
                       <input
                        id="address-number"
                        className="flex-1 rounded-lg border border-[#324d67] bg-[#0d141c] text-white px-4 h-12 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        placeholder="Número da Residência"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                      <button
                        onClick={handleSubmit}
                        className="h-12 px-6 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
                      >
                        Buscar
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                )}
                
                {!addressData && !loadingCep && cep.length > 0 && cep.length < 8 && (
                   <p className="text-sm text-yellow-500">Digite 8 dígitos para buscar.</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* FeatureSection */}
      <div className="flex flex-col gap-10 px-4 py-10 @container">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-0">
          <div className="flex flex-1 gap-3 rounded-lg border border-transparent dark:border-[#324d67] bg-white dark:bg-[#192633] p-4 flex-col">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl">compare_arrows</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-black dark:text-white text-base font-bold leading-tight">
                Compare Facilmente
              </h2>
              <p className="text-gray-600 dark:text-[#92adc9] text-sm font-normal leading-normal">
                Veja lado a lado as melhores ofertas disponíveis na sua área.
              </p>
            </div>
          </div>
          <div className="flex flex-1 gap-3 rounded-lg border border-transparent dark:border-[#324d67] bg-white dark:bg-[#192633] p-4 flex-col">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl">savings</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-black dark:text-white text-base font-bold leading-tight">
                Economize Dinheiro
              </h2>
              <p className="text-gray-600 dark:text-[#92adc9] text-sm font-normal leading-normal">
                Encontre promoções exclusivas e os melhores preços do mercado.
              </p>
            </div>
          </div>
          <div className="flex flex-1 gap-3 rounded-lg border border-transparent dark:border-[#324d67] bg-white dark:bg-[#192633] p-4 flex-col">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl">grade</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-black dark:text-white text-base font-bold leading-tight">
                Avaliações Reais
              </h2>
              <p className="text-gray-600 dark:text-[#92adc9] text-sm font-normal leading-normal">
                Confie na opinião de outros usuários para tomar a decisão certa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SectionHeader for Carousel */}
      <h3 className="text-black dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Principais Provedores
      </h3>

      {/* Carousel */}
      <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch px-4 pt-2 pb-4 gap-4">
          {PROVIDERS.map((provider) => (
            <div key={provider.name} className="flex flex-col gap-3 rounded-lg min-w-40">
              <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col justify-center items-center bg-gray-200 dark:bg-gray-700">
                <img
                  alt={`Logo ${provider.name}`}
                  className={`h-16 w-auto object-contain ${provider.logoClass || ''}`}
                  src={provider.logo}
                />
              </div>
              <div>
                <p className="text-black dark:text-white text-base font-medium leading-normal">
                  {provider.name}
                </p>
                <p className="text-gray-600 dark:text-[#92adc9] text-sm font-normal leading-normal">
                  {provider.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="px-4 py-10">
        <h3 className="text-black dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">
          O que nossos usuários dizem
        </h3>
        <div className="rounded-xl border border-transparent dark:border-[#324d67] bg-white dark:bg-[#192633] p-6">
          <div className="flex items-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="material-symbols-outlined text-yellow-400">
                star
              </span>
            ))}
          </div>
          <blockquote className="text-black dark:text-white text-base italic leading-relaxed">
            "O serviço é fantástico! Consegui encontrar um plano de internet muito mais rápido e
            barato em questão de minutos. Recomendo a todos!"
          </blockquote>
          <p className="text-gray-600 dark:text-[#92adc9] text-sm font-medium mt-4">
            - Ana Clara S.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-[#192633] mt-auto">
        <div className="w-full mx-auto p-4 md:py-8">
          <div className="flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-black dark:text-white text-2xl mr-2">
              wifi_find
            </span>
            <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white">
              WebCompare
            </span>
          </div>
          <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            <li>
              <a className="mr-4 hover:underline md:mr-6" href="#">
                Sobre Nós
              </a>
            </li>
            <li>
              <a className="mr-4 hover:underline md:mr-6" href="#">
                Privacidade
              </a>
            </li>
            <li>
              <a className="mr-4 hover:underline md:mr-6" href="#">
                Licença
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#">
                Contato
              </a>
            </li>
          </ul>
          <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
            © 2023 WebCompare™. Todos os direitos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default HomeView;
