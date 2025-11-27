import React from 'react';
import { ARTICLES } from '../constants';

interface ArticlesViewProps {
  onBack: () => void;
}

const ArticlesView: React.FC<ArticlesViewProps> = ({ onBack }) => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-white/10">
        <button
          onClick={onBack}
          className="text-slate-800 dark:text-white flex size-12 shrink-0 items-center justify-start"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Conteúdo e Artigos
        </h1>
        <div className="flex size-12 shrink-0 items-center"></div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-background-light dark:bg-background-dark">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-sm">
            <div className="text-slate-500 dark:text-slate-400 flex border-none bg-white dark:bg-[#192633] items-center justify-center pl-4 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-[#192633] focus:border-none h-full placeholder:text-slate-500 dark:placeholder:text-slate-400 px-4 pl-2 text-base font-normal leading-normal"
              placeholder="Buscar por artigos ou guias..."
            />
          </div>
        </label>
      </div>

      {/* Chips / Categories */}
      <div className="flex gap-3 px-4 pb-3 overflow-x-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {['Guias', 'Tecnologia', 'Dicas de Economia', 'Análises', 'Velocidade'].map((cat, i) => (
          <div
            key={cat}
            className={`flex h-9 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 transition-colors ${
              i === 0
                ? 'bg-primary text-white'
                : 'bg-slate-200 dark:bg-[#192633] text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <p className="text-sm font-medium leading-normal">{cat}</p>
          </div>
        ))}
      </div>

      {/* Main Content - Article Cards */}
      <div className="flex flex-col gap-4 p-4 pt-2 pb-6">
        {ARTICLES.map((article) => (
          <div
            key={article.id}
            className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden shadow-sm bg-white dark:bg-[#192633]"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover"
              style={{ backgroundImage: `url("${article.image}")` }}
            ></div>
            <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                {article.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal line-clamp-2">
                {article.description}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal pt-1">
                {article.author} • {article.date} • {article.readTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesView;
