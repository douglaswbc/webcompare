
import React, { useState } from 'react';
import HomeView from './components/HomeView';
import CompareView from './components/CompareView';
import DetailsView from './components/DetailsView';
import ArticlesView from './components/ArticlesView';
import { Plan, UserAddress } from './types';

type View = 'home' | 'compare' | 'details' | 'articles';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  // Estado para armazenar o endereço capturado na Home
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);

  const navigateTo = (view: View) => {
    // Scroll to top when changing views
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    navigateTo('details');
  };

  const handleAddressSubmit = (address: UserAddress) => {
    setUserAddress(address);
    navigateTo('compare');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            onSearch={handleAddressSubmit}
            onMenuClick={() => navigateTo('articles')}
          />
        );
      case 'compare':
        return (
          <CompareView
            onBack={() => navigateTo('home')}
            onSelectPlan={handleSelectPlan}
          />
        );
      case 'details':
        if (!selectedPlan) return <CompareView onBack={() => navigateTo('home')} onSelectPlan={handleSelectPlan} />;
        return (
          <DetailsView
            plan={selectedPlan}
            userAddress={userAddress}
            onBack={() => navigateTo('compare')}
          />
        );
      case 'articles':
        return <ArticlesView onBack={() => navigateTo('home')} />;
      default:
        return (
            <HomeView
                onSearch={handleAddressSubmit}
                onMenuClick={() => navigateTo('articles')}
            />
        );
    }
  };

  return <>{renderView()}</>;
};

export default App;
