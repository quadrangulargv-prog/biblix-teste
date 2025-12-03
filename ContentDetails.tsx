import React, { useState, useRef } from 'react';
import { QuizCategory, QuizConfig, Difficulty } from '../types';
import { Icons } from './Icons';

// --- TELA: AJUSTE TEMA ---

interface ContentDetailsProps {
  category: QuizCategory;
  onPlay: (config: QuizConfig) => void;
  onClose: () => void;
  onUpdateImage: (id: string, newUrl: string) => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export const ContentDetails: React.FC<ContentDetailsProps> = ({ 
  category, 
  onPlay, 
  onClose, 
  onUpdateImage,
  isSaved = false,
  onToggleSave
}) => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [questionCount, setQuestionCount] = useState<number>(7); // Default updated to min of range
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePlay = () => {
    onPlay({ difficulty, numberOfQuestions: questionCount });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdateImage(category.id, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141414] animate-fadeIn">
      {/* Background Image Container */}
      <div className="absolute top-0 left-0 w-full h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent z-10" />
        <img 
          src={category.imageUrl} 
          alt={category.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* LEFT SIDE ACTIONS CONTAINER (Stacked Vertically) */}
      <div className="absolute top-6 left-6 z-50 flex flex-col space-y-4">
        
        {/* 1. Button: AJUSTE IMAGEM TEMA */}
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#181818]/80 p-3 rounded-full hover:bg-white hover:text-black transition group backdrop-blur-md shadow-lg"
          title="Ajuste Imagem Tema"
        >
          <Icons.Square className="w-5 h-5 text-current group-hover:scale-110 transition-transform" />
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange} 
        />

        {/* 2. Button: SALVAR TEMA (Moved below Upload) */}
        {onToggleSave && (
          <button 
            onClick={onToggleSave}
            className="bg-[#181818]/80 p-3 rounded-full hover:bg-[#2f2f2f] transition backdrop-blur-md shadow-lg"
            title={isSaved ? "Remover dos Salvos" : "Salvar Tema"}
          >
            <Icons.Flag 
              className={`w-6 h-6 transition-colors duration-300 ${isSaved ? 'text-[#E50914] fill-[#E50914]' : 'text-white'}`} 
            />
          </button>
        )}
      </div>

      {/* RIGHT SIDE (Only Close Button Now) */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={onClose}
          className="bg-[#181818] p-3 rounded-full hover:bg-[#2f2f2f] transition"
        >
          <Icons.X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content - Centralized Layout */}
      <div className="relative z-20 pt-[20vh] px-8 md:px-16 max-w-4xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
          {category.title}
        </h1>
        
        {/* Metadata - Centered */}
        <div className="flex items-center justify-center space-x-4 mb-8 text-green-400 font-bold">
           <span>98% Relevância</span>
           <span className="text-gray-400">2024</span>
           <span className="border border-gray-500 px-1 text-xs text-gray-300 rounded">HD</span>
        </div>

        <p className="text-lg text-gray-300 mb-10 max-w-2xl drop-shadow-md">
          Prepare-se para testar seus conhecimentos sobre <strong>{category.title}</strong>. 
          Configure sua partida abaixo escolhendo a dificuldade e a extensão do desafio bíblico.
        </p>

        {/* Configuration Section */}
        <div className="bg-[#181818]/90 backdrop-blur-sm p-8 rounded-lg border border-gray-800 shadow-2xl space-y-8 mb-12 w-full">
          
          {/* Difficulty Selector */}
          <div>
            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4">Nível de Dificuldade</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.values(Difficulty).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`
                    px-6 py-2 rounded font-bold transition-all border-2
                    ${difficulty === diff 
                      ? 'bg-white text-black border-white' 
                      : 'bg-transparent text-gray-400 border-gray-600 hover:border-gray-400'}
                  `}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count Selector - Slider (7 to 21) */}
          <div className="w-full max-w-md mx-auto">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-6 flex items-center justify-center">
              Quantidade de Perguntas: 
              <span className="text-white text-2xl ml-3 bg-[#E50914] px-3 py-1 rounded shadow-lg">{questionCount}</span>
            </h3>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 font-bold text-sm">7</span>
              <input 
                type="range" 
                min="7" 
                max="21" 
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#E50914]"
              />
              <span className="text-gray-500 font-bold text-sm">21</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Deslize para ajustar a duração do desafio</p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col md:flex-row justify-center gap-4">
             <button 
               onClick={handlePlay}
               className="w-full md:w-auto px-12 bg-[#E50914] hover:bg-[#b20710] text-white text-xl font-bold py-4 rounded flex items-center justify-center space-x-3 transition-colors"
             >
               <Icons.Play className="w-6 h-6 fill-current" />
               <span>INICIAR DESAFIO</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};