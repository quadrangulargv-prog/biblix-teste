import { QuizCategory } from "./types";

// Imagens fixas e temáticas para as Sessões com curadoria cinematográfica e bíblica

export const OLD_TESTAMENT_CATS: QuizCategory[] = [
  { 
    id: 'ot-1', 
    title: 'Gênesis', 
    queryTopic: 'Book of Genesis stories', 
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop' // Earth from space / Creation
  },
  { 
    id: 'ot-2', 
    title: 'Êxodo', 
    queryTopic: 'Moses and the Exodus', 
    imageUrl: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=600&auto=format&fit=crop' // Desert Dunes
  },
  { 
    id: 'ot-3', 
    title: 'Rei Davi', 
    queryTopic: 'Life of King David', 
    imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=600&auto=format&fit=crop' // Royal Crown / Gold
  },
  { 
    id: 'ot-4', 
    title: 'Profetas', 
    queryTopic: 'Major Prophets of the Old Testament', 
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=600&auto=format&fit=crop' // Ancient Writing / Scroll vibe
  },
  { 
    id: 'ot-5', 
    title: 'Sabedoria', 
    queryTopic: 'Proverbs and Ecclesiastes', 
    imageUrl: 'https://images.unsplash.com/photo-1478641300939-78b3cb11218d?q=80&w=600&auto=format&fit=crop' // Dark moody book / Light
  },
];

export const NEW_TESTAMENT_CATS: QuizCategory[] = [
  { 
    id: 'nt-1', 
    title: 'Evangelhos', 
    queryTopic: 'The Gospels of Jesus', 
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58293a4697?q=80&w=600&auto=format&fit=crop' // Cross silhouette
  },
  { 
    id: 'nt-2', 
    title: 'Atos', 
    queryTopic: 'Acts of the Apostles', 
    imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop' // Ancient Map
  },
  { 
    id: 'nt-3', 
    title: 'Paulo', 
    queryTopic: 'Missionary Journeys of Paul', 
    imageUrl: 'https://images.unsplash.com/photo-1529154691717-3306083d86e7?q=80&w=600&auto=format&fit=crop' // Roman Architecture / Travel
  },
  { 
    id: 'nt-4', 
    title: 'Apocalipse', 
    queryTopic: 'Book of Revelation', 
    imageUrl: 'https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?q=80&w=600&auto=format&fit=crop' // Dramatic Stormy Sky
  },
  { 
    id: 'nt-5', 
    title: 'Parábolas', 
    queryTopic: 'Parables of Jesus', 
    imageUrl: 'https://images.unsplash.com/photo-1438274754346-45322bacdf6f?q=80&w=600&auto=format&fit=crop' // Wheat field
  },
];

export const HEROES_CATS: QuizCategory[] = [
  { 
    id: 'h-1', 
    title: 'Daniel', 
    queryTopic: 'Daniel in Babylon', 
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=600&auto=format&fit=crop' // Lion
  },
  { 
    id: 'h-2', 
    title: 'Ester', 
    queryTopic: 'Queen Esther', 
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop' // Jewelry / Palace
  },
  { 
    id: 'h-3', 
    title: 'Elias', 
    queryTopic: 'Elijah the Prophet', 
    imageUrl: 'https://images.unsplash.com/photo-1496338435123-690553757a3e?q=80&w=600&auto=format&fit=crop' // Fire / Ember
  },
  { 
    id: 'h-4', 
    title: 'Pedro', 
    queryTopic: 'Peter the Apostle', 
    imageUrl: 'https://images.unsplash.com/photo-1534073003222-9cdd603014a9?q=80&w=600&auto=format&fit=crop' // Stormy Sea / Water
  },
  { 
    id: 'h-5', 
    title: 'Maria', 
    queryTopic: 'Mary Mother of Jesus', 
    imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=600&auto=format&fit=crop' // Starry Night / Peaceful
  },
];

export const DIFFICULT_CATS: QuizCategory[] = [
  { 
    id: 'd-1', 
    title: 'Teologia', 
    queryTopic: 'Deep Biblical Theology', 
    imageUrl: 'https://images.unsplash.com/photo-1507842217121-9e87122822a9?q=80&w=600&auto=format&fit=crop' // Dark Classic Library
  },
  { 
    id: 'd-2', 
    title: 'Geografia', 
    queryTopic: 'Biblical Geography', 
    imageUrl: 'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=600&auto=format&fit=crop' // Ancient Ruins / Landscape
  },
  { 
    id: 'd-3', 
    title: 'Genealogia', 
    queryTopic: 'Biblical Genealogies', 
    imageUrl: 'https://images.unsplash.com/photo-1496307374823-1d02c7c5f87a?q=80&w=600&auto=format&fit=crop' // Tree roots / Nature
  },
];