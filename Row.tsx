import React, { useRef, useState } from 'react';
import { RowProps, QuizCategory } from '../types';
import { Icons } from './Icons';

export const Row: React.FC<RowProps> = ({ title, categories, onSelect }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: 'left' | 'right') => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 md:space-y-4 my-8 group">
      {/* Título da SESSÃO com padding direto para alinhar */}
      <h2 className="text-white text-xl md:text-2xl font-semibold transition hover:text-[#E50914] cursor-pointer inline-block px-4 md:px-12">
        {title}
      </h2>
      
      <div className="relative group/row">
        {/* Left Arrow */}
        <div 
          className={`absolute top-0 bottom-0 left-0 bg-black/50 z-40 w-12 flex items-center justify-center cursor-pointer opacity-0 group-hover/row:opacity-100 transition duration-300 hover:bg-black/70 h-full ${!isMoved && 'hidden'}`}
          onClick={() => handleClick('left')}
        >
          <Icons.ChevronDown className="w-8 h-8 text-white rotate-90" />
        </div>

        {/* Row Container (Conteúdo da Sessão) */}
        {/* Adicionado padding horizontal interno e w-full para evitar corte lateral */}
        <div 
          ref={rowRef}
          className="flex items-center space-x-4 overflow-x-scroll no-scrollbar scroll-smooth py-8 px-4 md:px-12 w-full"
        >
          {categories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => onSelect(cat)}
              className="relative min-w-[200px] md:min-w-[280px] h-[120px] md:h-[160px] bg-zinc-800 rounded-md cursor-pointer overflow-hidden transition duration-300 ease-in-out transform hover:scale-110 hover:z-30 hover:shadow-xl group/card"
            >
              <img 
                src={cat.imageUrl} 
                alt={cat.title} 
                className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 p-3 w-full">
                 <h3 className="text-white font-bold text-lg drop-shadow-md flex items-center justify-between">
                    {cat.title}
                    <Icons.Play className="w-5 h-5 opacity-0 group-hover/card:opacity-100 transition-opacity fill-white" />
                 </h3>
                 <div className="h-0.5 w-0 bg-[#E50914] group-hover/card:w-full transition-all duration-300 mt-1"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <div 
          className="absolute top-0 bottom-0 right-0 bg-black/50 z-40 w-12 flex items-center justify-center cursor-pointer opacity-0 group-hover/row:opacity-100 transition duration-300 hover:bg-black/70 h-full"
          onClick={() => handleClick('right')}
        >
          <Icons.ChevronDown className="w-8 h-8 text-white -rotate-90" />
        </div>
      </div>
    </div>
  );
};