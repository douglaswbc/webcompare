import React from 'react';
import { PLANS } from '../constants';
import { Plan } from '../types';

interface CompareViewProps {
  onBack: () => void;
  onSelectPlan: (plan: Plan) => void;
}

const CompareView: React.FC<CompareViewProps> = ({ onBack, onSelectPlan }) => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 sticky top-0 z-10 border-b border-slate-200/10">
        <button
          onClick={onBack}
          className="text-slate-800 dark:text-white flex size-12 shrink-0 items-center justify-center -ml-4"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Comparar Planos
        </h1>
        <div className="size-12 shrink-0"></div>
      </div>

      {/* Segmented Buttons for Filters and Sorting */}
      <div className="flex px-4 py-3">
        <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-slate-200 dark:bg-[#233648] p-1">
          <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-slate-900 dark:has-[:checked]:text-white text-slate-500 dark:text-[#92adc9] text-sm font-medium leading-normal gap-1 transition-colors">
            <span className="material-symbols-outlined text-base">tune</span>
            <span className="truncate">Filtros</span>
            <input
              className="invisible w-0 absolute"
              name="controls-toggle"
              type="radio"
              value="Filtros"
              defaultChecked
            />
          </label>
          <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-slate-900 dark:has-[:checked]:text-white text-slate-500 dark:text-[#92adc9] text-sm font-medium leading-normal gap-1 transition-colors">
            <span className="material-symbols-outlined text-base">swap_vert</span>
            <span className="truncate">Ordenar</span>
            <input
              className="invisible w-0 absolute"
              name="controls-toggle"
              type="radio"
              value="Ordenar"
            />
          </label>
        </div>
      </div>

      {/* Results Count Text */}
      <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal pb-3 pt-1 px-4">
        {PLANS.length} planos encontrados
      </p>

      {/* Plan Cards List */}
      <div className="flex flex-col gap-4">
        {PLANS.map((plan) => (
          <div key={plan.id} className="px-4 @container">
            <div className="flex flex-col items-stretch justify-start rounded-xl shadow-sm bg-white dark:bg-[#192633] overflow-hidden">
              <div
                className="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover"
                style={{ backgroundImage: `url("${plan.bannerImage}")` }}
              ></div>
              <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 dark:text-[#92adc9] text-sm font-normal leading-normal">
                    {plan.provider}
                  </p>
                  {plan.badge && (
                    <div
                      className={`flex items-center gap-1 rounded-full px-2 py-0.5 ${plan.badge.colorClass} ${plan.badge.textClass}`}
                    >
                      <span className="material-symbols-outlined text-xs">
                        {plan.badge.icon}
                      </span>
                      <span className="text-xs font-medium">{plan.badge.text}</span>
                    </div>
                  )}
                </div>
                <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                  {plan.name}
                </p>
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">download</span>
                    <span>{plan.downloadSpeed}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">upload</span>
                    <span>{plan.uploadSpeed}</span>
                  </div>
                </div>
                <div className="flex items-end gap-3 justify-between mt-2">
                  <div className="flex flex-col gap-0">
                    <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                      {plan.price}
                      <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                        {plan.period}
                      </span>
                    </p>
                    <p className="text-slate-500 dark:text-[#92adc9] text-xs font-normal leading-normal">
                      {plan.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-medium leading-normal shadow-sm hover:bg-primary/90 transition-colors"
                  >
                    <span className="truncate">Assinar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-5"></div>
    </div>
  );
};

export default CompareView;
