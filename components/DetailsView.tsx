
import React, { useState } from 'react';
import { Plan, UserAddress, UserPersonalData } from '../types';

interface DetailsViewProps {
  plan: Plan;
  userAddress: UserAddress | null;
  onBack: () => void;
}

const DetailsView: React.FC<DetailsViewProps> = ({ plan, userAddress, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserPersonalData>({
    nome: '',
    telefone: '',
    cpf: '',
    rg: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendWhatsApp = () => {
    if (!formData.nome || !formData.telefone || !formData.cpf) {
      alert('Por favor, preencha pelo menos Nome, Telefone e CPF.');
      return;
    }

    const addressText = userAddress 
      ? `\n*Endereço de Instalação:*\n${userAddress.logradouro}, ${userAddress.numero}\n${userAddress.bairro} - ${userAddress.localidade}/${userAddress.uf}\nCEP: ${userAddress.cep}`
      : '\n*Endereço:* (Não informado na busca)';

    const text = `Olá! Gostaria de contratar o plano *${plan.name}* (${plan.price}).
    \n*Meus Dados:*
    Nome: ${formData.nome}
    CPF: ${formData.cpf}
    RG: ${formData.rg}
    Contato: ${formData.telefone}${addressText}`;

    // Replace with your support number
    const supportNumber = '5511999999999'; 
    const url = `https://wa.me/${supportNumber}?text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank');
    setIsModalOpen(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      {/* Top App Bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-background-dark/95 backdrop-blur-sm p-4 pb-3">
        <button
          onClick={onBack}
          className="flex size-10 shrink-0 items-center justify-center"
        >
          <span className="material-symbols-outlined text-white text-2xl">
            arrow_back_ios_new
          </span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">
          Detalhes do Plano
        </h1>
        <div className="size-10 shrink-0"></div>
      </header>

      <main className="flex-1 pb-28">
        {/* Profile Header */}
        <section className="p-4">
          <div className="flex w-full flex-col gap-4 @container">
            <div className="flex gap-4">
              <div
                className="aspect-square w-24 min-w-24 rounded-lg bg-cover bg-center bg-no-repeat shadow-md"
                style={{
                    backgroundImage: `url("${plan.bannerImage}")`,
                  }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">
                  {plan.name}
                </p>
                <p className="text-base font-normal leading-normal text-slate-400">
                  {plan.provider}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-base font-medium leading-normal text-slate-300">Download</p>
            <p className="tracking-light text-2xl font-bold leading-tight text-white">
              {plan.downloadSpeed}
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-base font-medium leading-normal text-slate-300">Upload</p>
            <p className="tracking-light text-2xl font-bold leading-tight text-white">
              {plan.uploadSpeed}
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-base font-medium leading-normal text-slate-300">Preço</p>
            <p className="tracking-light text-2xl font-bold leading-tight text-white">
              {plan.price}
              {plan.period}
            </p>
          </div>
        </section>

        {/* Tabs */}
        <div className="pb-3">
          <div className="flex border-b border-white/10 px-4">
            <button className="flex flex-1 flex-col items-center justify-center border-b-[3px] border-b-primary pb-[13px] pt-4 text-white">
              <p className="text-sm font-bold leading-normal tracking-[0.015em] text-white">
                Visão Geral
              </p>
            </button>
            <button className="flex flex-1 flex-col items-center justify-center border-b-[3px] border-b-transparent pb-[13px] pt-4 text-slate-400">
              <p className="text-sm font-bold leading-normal tracking-[0.015em] text-slate-400">
                Detalhes
              </p>
            </button>
            <button className="flex flex-1 flex-col items-center justify-center border-b-[3px] border-b-transparent pb-[13px] pt-4 text-slate-400">
              <p className="text-sm font-bold leading-normal tracking-[0.015em] text-slate-400">
                FAQs
              </p>
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <section>
          <h3 className="px-4 pb-3 pt-4 text-lg font-bold leading-tight tracking-[-0.015em] text-white">
            Benefícios Principais
          </h3>
          <div className="flex flex-col gap-px px-4">
            {plan.benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 bg-white/5 p-4 ${
                  index === 0 ? 'rounded-t-lg' : ''
                } ${index === plan.benefits.length - 1 ? 'rounded-b-lg' : ''}`}
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
                  <span className="material-symbols-outlined text-primary">{benefit.icon}</span>
                </div>
                <p className="flex-1 text-base font-medium text-white">{benefit.text}</p>
                <span className="material-symbols-outlined text-green-400">check_circle</span>
              </div>
            ))}
          </div>
        </section>

        {/* Specifications Section */}
        <section>
          <h3 className="px-4 pb-3 pt-6 text-lg font-bold leading-tight tracking-[-0.015em] text-white">
            Especificações
          </h3>
          <div className="flex flex-col gap-px px-4">
            <div className="flex items-center justify-between rounded-t-lg bg-white/5 px-4 py-3">
              <p className="text-base text-slate-300">Tipo de Conexão</p>
              <p className="text-base font-semibold text-white">{plan.specs.connectionType}</p>
            </div>
            <div className="flex items-center justify-between bg-white/5 px-4 py-3">
              <p className="text-base text-slate-300">Limite de Dados</p>
              <p className="text-base font-semibold text-white">{plan.specs.dataLimit}</p>
            </div>
            <div className="flex items-center justify-between rounded-b-lg bg-white/5 px-4 py-3">
              <p className="text-base text-slate-300">Contrato</p>
              <p className="text-base font-semibold text-white">{plan.specs.contract}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA Bar */}
      <footer className="fixed bottom-0 left-0 z-10 w-full border-t border-white/10 bg-background-dark/80 p-4 backdrop-blur-sm">
        <button
            onClick={() => setIsModalOpen(true)}
            className="w-full rounded-lg bg-primary py-3.5 text-base font-bold text-white hover:bg-primary/90 transition-colors"
        >
          Contratar Plano
        </button>
      </footer>

      {/* Modal de Contratação */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#192633] w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-[#0d141c]">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Finalizar Contratação</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Preencha seus dados para que um especialista entre em contato via WhatsApp para finalizar a instalação.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d141c] text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefone / WhatsApp</label>
                <input 
                  type="tel" 
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d141c] text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CPF</label>
                  <input 
                    type="text" 
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d141c] text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">RG</label>
                  <input 
                    type="text" 
                    name="rg"
                    value={formData.rg}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d141c] text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                    placeholder="00.000.000-0"
                  />
                </div>
              </div>

              {userAddress && (
                 <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 uppercase mb-1">Endereço de Instalação</p>
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      {userAddress.logradouro}, {userAddress.numero}<br/>
                      {userAddress.bairro} - {userAddress.localidade}/{userAddress.uf}
                    </p>
                 </div>
              )}

              <button 
                onClick={handleSendWhatsApp}
                className="mt-2 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5 filter brightness-0 invert" />
                Enviar Pedido no WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsView;
