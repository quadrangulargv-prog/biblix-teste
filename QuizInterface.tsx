import React, { useState, useEffect } from 'react';
import { GameState, Question, QuizCategory } from '../types';
import { Icons } from './Icons';

interface QuizInterfaceProps {
  category: QuizCategory;
  questions: Question[];
  onExit: () => void;
}

export const QuizInterface: React.FC<QuizInterfaceProps> = ({ category, questions, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false); // Result for current question
  const [quizFinished, setQuizFinished] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return; // Prevent multiple clicks

    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    setShowResult(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setHistory(prev => [...prev, isCorrect]);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="fixed inset-0 z-50 bg-[#141414] flex items-center justify-center animate-fadeIn">
        <div className="bg-[#181818] rounded-lg max-w-2xl w-full p-8 md:p-12 text-center shadow-2xl border border-gray-800">
          <h2 className="text-4xl font-bold mb-2">
            {percentage >= 70 ? 'Parabéns!' : 'Continue Estudando!'}
          </h2>
          <p className="text-gray-400 mb-8 uppercase tracking-widest text-sm">{category.title}</p>
          
          <div className="text-8xl font-black text-[#E50914] mb-4">
            {percentage}%
          </div>
          
          <p className="text-xl mb-8">
            Você acertou <span className="text-white font-bold">{score}</span> de {questions.length} questões.
          </p>

          <div className="flex justify-center space-x-4">
             <button 
              onClick={onExit}
              className="bg-white text-black font-bold py-3 px-8 rounded hover:bg-gray-200 transition flex items-center space-x-2"
            >
              <Icons.Home className="w-5 h-5" />
              <span>Voltar ao Início</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#141414] flex flex-col">
      {/* Top Bar */}
      <div className="p-6 flex justify-between items-center bg-black/30 backdrop-blur-md">
        <div className="flex items-center space-x-4">
           <button onClick={onExit} className="text-gray-400 hover:text-white transition">
             <Icons.RotateCcw className="w-6 h-6" />
           </button>
           <div className="flex flex-col">
             <span className="text-xs text-gray-400 uppercase tracking-widest">Série</span>
             <span className="font-bold text-lg">{category.title}</span>
           </div>
        </div>
        <div className="text-xl font-bold font-mono">
          <span className="text-[#E50914]">{currentIndex + 1}</span>
          <span className="text-gray-600"> / {questions.length}</span>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-800 mb-12 rounded-full overflow-hidden flex">
           {questions.map((_, idx) => {
             let color = 'bg-gray-800';
             if (idx < history.length) {
               color = history[idx] ? 'bg-green-600' : 'bg-[#E50914]';
             } else if (idx === currentIndex) {
               color = 'bg-white';
             }
             return <div key={idx} className={`flex-1 h-full ${color} mx-[1px] first:ml-0 last:mr-0 transition-colors duration-500`} />;
           })}
        </div>

        {/* Question */}
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 leading-tight animate-slideUp">
          {currentQuestion.questionText}
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {currentQuestion.options.map((option, idx) => {
            let btnClass = "bg-[#2f2f2f] hover:bg-[#404040] border-transparent";
            
            if (showResult) {
               if (idx === currentQuestion.correctAnswerIndex) {
                 btnClass = "bg-green-900/50 border-green-500 text-green-100";
               } else if (idx === selectedOption) {
                 btnClass = "bg-red-900/50 border-[#E50914] text-red-100";
               } else {
                 btnClass = "bg-[#1f1f1f] opacity-50";
               }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showResult}
                className={`p-6 text-left rounded text-lg font-medium transition-all duration-200 border-2 ${btnClass} relative group`}
              >
                <span className="absolute top-4 left-4 text-xs font-mono opacity-30">{String.fromCharCode(65 + idx)}</span>
                <span className="pl-6 block">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation / Next Button */}
        {showResult && (
          <div className="mt-8 w-full bg-black/40 border border-gray-800 p-6 rounded-lg animate-fadeIn flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex-1">
               <div className="flex items-center space-x-2 text-[#E50914] mb-1">
                 <Icons.Info className="w-4 h-4" />
                 <span className="text-xs font-bold uppercase tracking-widest">Referência: {currentQuestion.reference}</span>
               </div>
               <p className="text-gray-300 text-sm">{currentQuestion.explanation}</p>
             </div>
             <button 
               onClick={nextQuestion}
               className="bg-white text-black px-8 py-3 rounded font-bold hover:scale-105 transition-transform"
             >
               {currentIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};