import React, { useEffect, useState, useRef } from 'react';
import { Icons } from './Icons';
import { QuizCategory } from '../types';

interface HeroProps {
  onPlay: (category: QuizCategory) => void;
}

interface HeroOption {
  id: string;
  titulo: string;
  descricao: string;
  queryTopic: string;
  image: string;
}

// Banco de Temas Expandido (15 Opções)
const HERO_OPTIONS: HeroOption[] = [
  {
    id: 'hero-apocalipse',
    titulo: "APOCALIPSE",
    descricao: "Teste seus conhecimentos sobre as profecias finais, os sete selos e a vitória final do Cordeiro. Você está preparado para o fim?",
    queryTopic: "The Book of Revelation end times",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-diluvio',
    titulo: "O DILÚVIO",
    descricao: "As águas subiram e cobriram a terra. Apenas oito sobreviveram. Você conhece os detalhes da Arca e da aliança de Deus?",
    queryTopic: "Noah's Ark and the Flood",
    image: "https://images.unsplash.com/photo-1547623641-82fbb83476e9?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-exodo',
    titulo: "O ÊXODO",
    descricao: "De escravos a conquistadores. Abertura do Mar Vermelho, as pragas e a jornada pelo deserto rumo à Terra Prometida.",
    queryTopic: "Moses and the Exodus Red Sea",
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-criacao',
    titulo: "A CRIAÇÃO",
    descricao: "No princípio, criou Deus os céus e a terra. Relembre a ordem dos dias, a formação do homem e o jardim do Éden.",
    queryTopic: "Genesis Creation Story",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-davi',
    titulo: "DAVI vs GOLIAS",
    descricao: "Uma pedra, uma funda e uma fé inabalável. Reviva a batalha mais famosa da história e a ascensão do rei poeta.",
    queryTopic: "David and Goliath battle",
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-ressurreicao',
    titulo: "A CRUZ",
    descricao: "O momento que dividiu a história. Do Getsêmani ao túmulo vazio, o sacrifício supremo e a vitória sobre a morte.",
    queryTopic: "Crucifixion and Resurrection of Jesus",
    image: "https://images.unsplash.com/photo-1507692049790-de58293a4697?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-leao',
    titulo: "COVA DOS LEÕES",
    descricao: "A fé de Daniel foi testada ao extremo. Um decreto real, uma cova mortal e o poder de Deus fechando a boca das feras.",
    queryTopic: "Daniel in the Lions Den",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-babel',
    titulo: "TORRE DE BABEL",
    descricao: "A humanidade tentou tocar os céus com sua arrogância. Veja como a confusão das línguas moldou as nações.",
    queryTopic: "Tower of Babel",
    image: "https://images.unsplash.com/photo-1486783046960-64d2ef697c96?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-sansao',
    titulo: "SANSÃO",
    descricao: "A força sobrenatural, o segredo dos cabelos longos e a traição de Dalila. A história do juiz mais forte de Israel.",
    queryTopic: "Samson and Delilah",
    image: "https://images.unsplash.com/photo-1565017042878-c5188339c636?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-jonas',
    titulo: "JONAS",
    descricao: "Engolido por um grande peixe após fugir do chamado de Deus. Uma lição sobre obediência e a misericórdia em Nínive.",
    queryTopic: "Jonah and the Whale",
    image: "https://images.unsplash.com/photo-1505245208761-ba872912fac0?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-natal',
    titulo: "NASCIMENTO",
    descricao: "Uma estrela em Belém, pastores no campo e magos do oriente. O mistério da encarnação do Verbo.",
    queryTopic: "Nativity of Jesus Birth",
    image: "https://images.unsplash.com/photo-1512353087810-25dfcd100962?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-elias',
    titulo: "FOGO DO CÉU",
    descricao: "Elias contra os profetas de Baal no Monte Carmelo. Um desafio de fogo que provou quem é o verdadeiro Deus.",
    queryTopic: "Elijah Mount Carmel Fire",
    image: "https://images.unsplash.com/photo-1496338435123-690553757a3e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-salomao',
    titulo: "REI SALOMÃO",
    descricao: "O homem mais sábio e rico que já existiu. A construção do Templo, o julgamento das mães e a visita da Rainha de Sabá.",
    queryTopic: "King Solomon Wisdom",
    image: "https://images.unsplash.com/photo-1628151016004-e5939229e84b?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-jerico',
    titulo: "JERICÓ",
    descricao: "Muralhas intransponíveis que caíram ao som de trombetas e gritos. A conquista de Josué e a fé de Raabe.",
    queryTopic: "Battle of Jericho Joshua",
    image: "https://images.unsplash.com/photo-1461695008884-2443c2d66a6a?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 'hero-pentecostes',
    titulo: "PENTECOSTES",
    descricao: "Línguas de fogo, vento impetuoso e o nascimento da Igreja. A descida do Espírito Santo sobre os apóstolos.",
    queryTopic: "Day of Pentecost Holy Spirit",
    image: "https://images.unsplash.com/photo-1485627698386-4cf8e1754028?q=80&w=2000&auto=format&fit=crop"
  }
];

export const Hero: React.FC<HeroProps> = ({ onPlay }) => {
  const [scrollY, setScrollY] = useState(0);
  
  // Estado do conteúdo atual
  const [activeHero, setActiveHero] = useState<HeroOption>(HERO_OPTIONS[0]);
  
  // Estado da Animação
  const [isAnxious, setIsAnxious] = useState(false);
  // Estado para travar a imagem durante a animação
  const [frozenImage, setFrozenImage] = useState<string>("");

  const animationIntervalRef = useRef<number | null>(null);

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lógica do Botão Aleatório
  const handleRandomClick = () => {
    if (isAnxious) return; // Evita duplo clique

    // 1. Trava a imagem atual antes de começar a roleta de textos
    setFrozenImage(activeHero.image);
    setIsAnxious(true);

    // Duração total da animação: 5 segundos
    const ANIMATION_DURATION = 5000;
    const SHUFFLE_SPEED = 100; // Troca a cada 100ms

    // Efeito "Roleta" (Apenas Textos vão mudar visualmente pois o BG usa a frozenImage)
    animationIntervalRef.current = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * HERO_OPTIONS.length);
      setActiveHero(HERO_OPTIONS[randomIndex]);
    }, SHUFFLE_SPEED);

    // Finalizar animação
    setTimeout(() => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      
      // Escolher um FINAL diferente do inicial
      let finalIndex = Math.floor(Math.random() * HERO_OPTIONS.length);
      setActiveHero(HERO_OPTIONS[finalIndex]);
      
      // Libera o estado de ansiedade (destrava a imagem para a nova)
      setIsAnxious(false);
      setFrozenImage(""); 
    }, ANIMATION_DURATION);
  };

  // Limpeza do intervalo ao desmontar
  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, []);

  // Cria a categoria para o botão "Jogar" baseada no estado atual
  const currentCategoryForPlay: QuizCategory = {
    id: activeHero.id,
    title: activeHero.titulo,
    queryTopic: activeHero.queryTopic,
    imageUrl: activeHero.image
  };

  // DEFINIÇÃO: BOTÕES INICIAIS
  const botoesIniciais = [
      {
        id: 'btn-jogar',
        label: 'Jogar',
        icon: Icons.Play,
        primary: true,
        action: () => onPlay(currentCategoryForPlay),
        disabled: isAnxious
      },
      {
        id: 'btn-aleatorio',
        label: isAnxious ? 'SORTEANDO...' : 'ALEATÓRIO',
        icon: Icons.RotateCcw,
        primary: false,
        action: handleRandomClick,
        disabled: isAnxious
      }
    ];

  // Lógica para decidir qual imagem mostrar no fundo
  // Se estiver ansioso, mostra a frozenImage (a anterior). Se não, mostra a do activeHero (a nova).
  const currentBackgroundImage = isAnxious ? frozenImage : activeHero.image;

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image Única (Dinâmica) com Efeito Parallax */}
      <div 
        className={`absolute top-0 left-0 w-full h-[120%] bg-cover bg-center transition-all duration-300 ease-out`}
        style={{ 
          backgroundImage: `url(${currentBackgroundImage})`,
          transform: `translateY(${scrollY * 0.5}px) ${isAnxious ? 'scale(1.05)' : 'scale(1)'}`, // Zoom sutil na ansiedade
          filter: isAnxious ? 'brightness(0.5) blur(2px)' : 'brightness(0.7)', // Escurece e borra na ansiedade
          zIndex: 0
        }}
      />
      
      {/* Gradients Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-0" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent z-10" />

      {/* Content Container */}
      <div className="absolute top-[20%] left-4 md:left-12 max-w-2xl space-y-6 z-20">
        
        {/* CHAMADA INÍCIO (Título) */}
        <h1 
          className={`
            text-5xl md:text-7xl font-black text-white drop-shadow-2xl leading-tight transition-opacity duration-100
            ${isAnxious ? 'opacity-80 animate-pulse text-red-500' : 'opacity-100'} 
          `}
        >
          {activeHero.titulo}
        </h1>
        
        {/* CHAMADA INÍCIO (Descrição) */}
        <p 
          className={`
            text-lg md:text-xl text-gray-200 drop-shadow-md font-medium max-w-xl transition-opacity duration-100
            ${isAnxious ? 'opacity-60 blur-[1px]' : 'opacity-100'}
          `}
        >
          {activeHero.descricao}
        </p>

        {/* BOTÕES INICIAIS */}
        <div className="flex items-center space-x-4 pt-4">
          {botoesIniciais.map((btn) => (
            <button 
              key={btn.id}
              onClick={btn.action}
              disabled={btn.disabled}
              className={`
                flex items-center space-x-3 px-6 md:px-8 py-2 md:py-3 rounded transition font-bold text-lg
                ${btn.primary 
                  ? 'bg-white text-black hover:bg-opacity-80' 
                  : 'bg-[rgba(109,109,110,0.7)] text-white hover:bg-[rgba(109,109,110,0.4)] backdrop-blur-sm'
                }
                ${btn.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Ícone sem rotação durante ansiedade */}
              <btn.icon className={`w-6 h-6 ${btn.primary ? 'fill-black' : ''}`} />
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};