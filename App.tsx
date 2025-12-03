import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Row } from './components/Row';
import { QuizInterface } from './components/QuizInterface';
import { ContentDetails } from './components/ContentDetails';
import { Icons } from './components/Icons';
import { OLD_TESTAMENT_CATS, NEW_TESTAMENT_CATS, HEROES_CATS, DIFFICULT_CATS } from './constants';
import { AppView, QuizCategory, Question, QuizConfig, Difficulty } from './types';
import { generateQuizQuestions } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.BROWSE);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  // Helper to load images from localStorage on initialization
  const loadCategoriesWithPersistence = (categories: QuizCategory[]) => {
    return categories.map(cat => {
      const savedImage = localStorage.getItem(`biblix_img_${cat.id}`);
      return savedImage ? { ...cat, imageUrl: savedImage } : cat;
    });
  };

  // Helper to load saved favorites from localStorage
  const loadSavedIds = (): string[] => {
    try {
      const saved = localStorage.getItem('biblix_saved_ids');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  };

  // Category States initialized with persisted data
  const [oldTestamentCats, setOldTestamentCats] = useState(() => loadCategoriesWithPersistence(OLD_TESTAMENT_CATS));
  const [newTestamentCats, setNewTestamentCats] = useState(() => loadCategoriesWithPersistence(NEW_TESTAMENT_CATS));
  const [heroesCats, setHeroesCats] = useState(() => loadCategoriesWithPersistence(HEROES_CATS));
  const [difficultCats, setDifficultCats] = useState(() => loadCategoriesWithPersistence(DIFFICULT_CATS));

  // Saved Items State
  const [savedIds, setSavedIds] = useState<string[]>(loadSavedIds);

  // Helper to get all categories in one array for searching
  const getAllCategories = () => [
    ...oldTestamentCats,
    ...newTestamentCats,
    ...heroesCats,
    ...difficultCats
  ];

  // Function to toggle save state
  const handleToggleSave = (id: string) => {
    let newSavedIds;
    if (savedIds.includes(id)) {
      newSavedIds = savedIds.filter(savedId => savedId !== id);
    } else {
      newSavedIds = [...savedIds, id];
    }
    setSavedIds(newSavedIds);
    localStorage.setItem('biblix_saved_ids', JSON.stringify(newSavedIds));
  };

  // Function to update category image dynamically and persist it
  const handleUpdateCategoryImage = (id: string, newImageUrl: string) => {
    // Save to localStorage for persistence
    try {
      localStorage.setItem(`biblix_img_${id}`, newImageUrl);
    } catch (e) {
      console.error("Erro ao salvar imagem no armazenamento local (provavelmente cota excedida)", e);
      alert("A imagem é muito grande para salvar permanentemente. Tente uma imagem menor.");
    }

    // Helper to update specific list
    const updateList = (list: QuizCategory[]) => 
      list.map(cat => cat.id === id ? { ...cat, imageUrl: newImageUrl } : cat);

    // Try updating all lists
    setOldTestamentCats(prev => updateList(prev));
    setNewTestamentCats(prev => updateList(prev));
    setHeroesCats(prev => updateList(prev));
    setDifficultCats(prev => updateList(prev));

    // Also update the currently selected category so the background changes immediately
    if (selectedCategory && selectedCategory.id === id) {
      setSelectedCategory({ ...selectedCategory, imageUrl: newImageUrl });
    }
  };

  // Open Details Screen
  const handleSelectCategory = (category: QuizCategory) => {
    setSelectedCategory(category);
    setView(AppView.DETAILS);
  };

  // Start Quiz from Details Screen
  const handleStartQuiz = async (config: QuizConfig) => {
    if (!selectedCategory) return;
    
    setView(AppView.QUIZ_LOADING);

    try {
      const questions = await generateQuizQuestions(selectedCategory.queryTopic, config);
      setQuizQuestions(questions);
      setView(AppView.QUIZ_PLAYING);
    } catch (e) {
      console.error(e);
      // In a real app, show error toast
      setView(AppView.DETAILS); // Go back to details on error
    }
  };

  const handleReturnHome = () => {
    setView(AppView.BROWSE);
    setSelectedCategory(null);
    setQuizQuestions([]);
  };

  const handleCloseDetails = () => {
    // Return to the view user came from, defaults to BROWSE if confused
    if (view === AppView.DETAILS) {
        setView(AppView.BROWSE); 
    }
    setSelectedCategory(null);
  };

  const handleNavigate = (newView: AppView) => {
    if (newView === AppView.BROWSE) {
      handleReturnHome();
    } else {
      setView(newView);
      setSelectedCategory(null);
    }
  };

  // Helper for Hero Play button (Default config)
  const handleHeroPlay = (category: QuizCategory) => {
    setSelectedCategory(category);
    // Directly start with default config for Hero "Quick Play"
    handleStartQuiz({ difficulty: Difficulty.MEDIUM, numberOfQuestions: 5 });
  };

  const renderContent = () => {
    switch (view) {
      case AppView.QUIZ_LOADING:
        return (
          <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#E50914] font-bold text-lg animate-pulse tracking-widest">GERANDO DESAFIO...</p>
            <p className="text-gray-500 text-sm mt-2">Consultando as Escrituras</p>
          </div>
        );

      case AppView.QUIZ_PLAYING:
        if (!selectedCategory) return null;
        return (
          <QuizInterface 
            category={selectedCategory} 
            questions={quizQuestions} 
            onExit={handleReturnHome}
          />
        );
      
      case AppView.DETAILS:
        if (!selectedCategory) return null;
        return (
          <ContentDetails 
            category={selectedCategory}
            onPlay={handleStartQuiz}
            onClose={handleCloseDetails}
            onUpdateImage={handleUpdateCategoryImage}
            isSaved={savedIds.includes(selectedCategory.id)}
            onToggleSave={() => handleToggleSave(selectedCategory.id)}
          />
        );

      case AppView.SEARCH:
        return (
          <div className="pt-32 px-12 min-h-screen bg-[#141414] animate-fadeIn">
             <div className="max-w-4xl mx-auto">
               <h1 className="text-4xl font-bold mb-8">Pesquisar</h1>
               <div className="relative mb-12">
                 <Icons.Search className="absolute left-4 top-4 text-gray-400 w-6 h-6" />
                 <input 
                    type="text" 
                    placeholder="Títulos, pessoas, gêneros..." 
                    className="w-full bg-[#2f2f2f] text-white pl-14 pr-4 py-4 rounded text-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                 />
               </div>
               <div className="text-gray-500 text-center mt-20">
                 <p>Digite um tema bíblico para encontrar desafios.</p>
               </div>
             </div>
          </div>
        );

      case AppView.SAVED:
        const savedCategories = getAllCategories().filter(cat => savedIds.includes(cat.id));
        
        return (
          <div className="pt-32 px-8 md:px-12 min-h-screen bg-[#141414] animate-fadeIn">
             <h1 className="text-4xl font-bold mb-8">Minha Lista Salva</h1>
             
             {savedCategories.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
                 <Icons.Layers className="w-16 h-16 mb-4 opacity-50" />
                 <p className="text-xl">Você ainda não salvou nenhum desafio.</p>
               </div>
             ) : (
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                 {savedCategories.map((cat) => (
                    <div 
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat)}
                      className="relative h-[160px] bg-zinc-800 rounded-md cursor-pointer overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:z-30 hover:shadow-xl group"
                    >
                      <img 
                        src={cat.imageUrl} 
                        alt={cat.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                      
                      {/* BOTÃO REMOVER (Aparece no Hover) - Texto Removido */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Impede que o clique abra o detalhe do tema
                          handleToggleSave(cat.id);
                        }}
                        className="absolute top-2 right-2 z-50 bg-[#E50914] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-700 hover:scale-110 shadow-lg"
                        title="Remover Tema Salvo"
                      >
                        <Icons.Trash className="w-5 h-5" />
                      </button>

                      <div className="absolute bottom-0 left-0 p-3 w-full">
                        <h3 className="text-white font-bold text-sm md:text-lg drop-shadow-md flex items-center justify-between">
                            {cat.title}
                            <Icons.Play className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
                        </h3>
                      </div>
                    </div>
                 ))}
               </div>
             )}
          </div>
        );

      case AppView.SETTINGS:
        return (
          <div className="pt-32 px-4 md:px-12 min-h-screen bg-[#141414] animate-fadeIn">
             <div className="max-w-2xl mx-auto">
               <h1 className="text-4xl font-bold mb-12 border-b border-gray-800 pb-4">Ajustes</h1>
               
               <div className="space-y-6">
                 <div className="bg-[#2f2f2f] p-6 rounded-lg flex items-center justify-between group cursor-pointer hover:bg-[#404040] transition">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                        <Icons.User className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Conta</p>
                        <p className="text-sm text-gray-400">Gerencie seus dados</p>
                      </div>
                    </div>
                    <Icons.ChevronDown className="w-5 h-5 -rotate-90 text-gray-400" />
                 </div>

                 <div className="bg-[#2f2f2f] p-6 rounded-lg flex items-center justify-between group cursor-pointer hover:bg-[#404040] transition">
                    <div>
                      <p className="font-bold text-lg">Configurações do App</p>
                      <p className="text-sm text-gray-400">Notificações, uso de dados</p>
                    </div>
                    <Icons.ChevronDown className="w-5 h-5 -rotate-90 text-gray-400" />
                 </div>

                 <div className="bg-[#2f2f2f] p-6 rounded-lg flex items-center justify-between group cursor-pointer hover:bg-[#404040] transition">
                    <div>
                      <p className="font-bold text-lg">Ajuda</p>
                      <p className="text-sm text-gray-400">Dúvidas frequentes, contato</p>
                    </div>
                    <Icons.ChevronDown className="w-5 h-5 -rotate-90 text-gray-400" />
                 </div>
                 
                 <button className="w-full border border-gray-600 p-4 rounded mt-8 hover:border-white transition font-bold text-gray-300 hover:text-white">
                   Sair da Biblix
                 </button>
               </div>
             </div>
          </div>
        );

      case AppView.BROWSE:
      default:
        return (
          <>
            <Hero onPlay={handleHeroPlay} />
            
            {/* SESSÕES (Listas Horizontais de Conteúdo) */}
            <div className="-mt-10 relative z-20 pb-12">
              <Row title="Antigo Testamento" categories={oldTestamentCats} onSelect={handleSelectCategory} />
              <Row title="Novo Testamento" categories={newTestamentCats} onSelect={handleSelectCategory} />
              <Row title="Heróis da Fé" categories={heroesCats} onSelect={handleSelectCategory} />
              <Row title="Desafios Teológicos" categories={difficultCats} onSelect={handleSelectCategory} />
            </div>

            {/* Footer */}
            <footer className="py-12 px-12 text-gray-500 text-sm text-center">
              <p className="mb-4">BIBLIX - Competição Bíblica</p>
              <p>© 2024 Powered by Gemini AI</p>
            </footer>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans selection:bg-red-900 selection:text-white">
      {/* Navigation is visible unless playing a quiz */}
      {view !== AppView.QUIZ_PLAYING && view !== AppView.QUIZ_LOADING && (
        <Navbar activeView={view} onNavigate={handleNavigate} />
      )}

      {renderContent()}
    </div>
  );
};

export default App;