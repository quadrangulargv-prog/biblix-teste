import React from 'react';
import { Icons } from './Icons';
import { AppView } from '../types';

interface NavbarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigate }) => {
  
  const navItems = [
    { label: 'INÍCIO', view: AppView.BROWSE },
    { label: 'PESQUISA', view: AppView.SEARCH },
    { label: 'SALVOS', view: AppView.SAVED },
  ];

  return (
    // Updated background to be a permanent shadow gradient instead of switching to solid opaque color
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 via-black/60 to-transparent pb-8 pt-4 transition-all duration-500">
      <div className="px-4 md:px-12 flex items-center justify-between">
        
        <div className="flex items-center space-x-8 md:space-x-12">
          {/* Logo */}
          <button onClick={() => onNavigate(AppView.BROWSE)} className="text-[#E50914] text-3xl md:text-4xl font-black tracking-tighter cursor-pointer hover:scale-105 transition-transform">
            BIBLIX
          </button>
          
          {/* Main Menu Selector */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {navItems.map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.view)}
                  className={`
                    text-sm md:text-base font-bold transition-all duration-300 px-4 py-1.5
                    ${isActive 
                      ? 'border-2 border-[#E50914] rounded-full text-white bg-red-600/10' 
                      : 'text-gray-300 hover:text-white border-2 border-transparent'}
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Settings Only */}
        <div className="flex items-center text-white">
          <button 
            onClick={() => onNavigate(AppView.SETTINGS)}
            className="group p-2"
            aria-label="Ajustes"
          >
            <Icons.Settings className={`w-7 h-7 transition-transform duration-500 ${activeView === AppView.SETTINGS ? 'text-[#E50914] rotate-90' : 'text-white group-hover:rotate-90'}`} />
          </button>
        </div>
      </div>
    </nav>
  );
};