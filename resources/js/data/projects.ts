export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images: string[];
  industry: string;
  category: string;
  tags: string[];
  specs: { label: string; value: string }[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Шаси компоненти',
    description: 'Прецизни компоненти за автомобилни шасита с лазерно рязане и огъване.',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80'
    ],
    industry: 'Автомобилна',
    category: 'automotive',
    tags: ['Лазерно рязане', 'Огъване', 'Стомана'],
    specs: [
      { label: 'Материал', value: 'Студеновалцована стомана S355' },
      { label: 'Дебелина', value: '3–8 mm' },
      { label: 'Прецизност', value: '±0.1 mm' },
      { label: 'Количество', value: '500 бр./месец' }
    ]
  },
  {
    id: 2,
    title: 'Машинни корпуси',
    description: 'Заварени корпуси за промишлени машини с повърхностна обработка.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80'
    ],
    industry: 'Машиностроене',
    category: 'machinery',
    tags: ['Заваряване', 'Монтаж', 'Боядисване'],
    specs: [
      { label: 'Материал', value: 'Стомана S235/S355' },
      { label: 'Заваряване', value: 'MIG/MAG' },
      { label: 'Повърхност', value: 'Прахово боядисване RAL' },
      { label: 'Тегло', value: '50–200 kg' }
    ]
  },
  {
    id: 3,
    title: 'Стоманени греди',
    description: 'Конструктивни елементи за строителни проекти в Германия.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80'
    ],
    industry: 'Строителство',
    category: 'construction',
    tags: ['Конструкции', 'EN 1090', 'Стомана'],
    specs: [
      { label: 'Стандарт', value: 'EN 1090-2 EXC2' },
      { label: 'Материал', value: 'Стомана S355 J2' },
      { label: 'Дължина', value: 'до 12 m' },
      { label: 'Сертификация', value: 'CE маркировка' }
    ]
  },
  {
    id: 4,
    title: 'Метални рамки за мебели',
    description: 'Елегантни метални рамки за дизайнерски мебели.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80'
    ],
    industry: 'Мебели',
    category: 'furniture',
    tags: ['Лазерно рязане', 'Полиране', 'Неръждаема стомана'],
    specs: [
      { label: 'Материал', value: 'Неръждаема стомана AISI 304' },
      { label: 'Повърхност', value: 'Сатен/Огледало' },
      { label: 'Дебелина', value: '1.5–3 mm' },
      { label: 'Финиш', value: 'Механично полиране' }
    ]
  },
  {
    id: 5,
    title: 'Соларни конструкции',
    description: 'Монтажни системи за фотоволтаични инсталации.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    ],
    industry: 'Енергетика',
    category: 'energy',
    tags: ['Галванизация', 'Монтаж', 'Алуминий'],
    specs: [
      { label: 'Материал', value: 'Алуминий 6063-T5' },
      { label: 'Покритие', value: 'Горещо поцинковане' },
      { label: 'Натоварване', value: 'Вятър + сняг' },
      { label: 'Стандарт', value: 'EN 1999' }
    ]
  },
  {
    id: 6,
    title: 'Резервоари от неръждаема стомана',
    description: 'Хранителни резервоари с TIG заваряване и полиране.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
    ],
    industry: 'Хранителна',
    category: 'machinery',
    tags: ['TIG заваряване', 'Полиране', 'INOX'],
    specs: [
      { label: 'Материал', value: 'AISI 316L' },
      { label: 'Обем', value: '500–5000 литра' },
      { label: 'Заваряване', value: 'TIG орбитално' },
      { label: 'Стандарт', value: 'FDA / CE' }
    ]
  },
  {
    id: 7,
    title: 'Автомобилни панели',
    description: 'Външни панели за специализирани превозни средства.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    ],
    industry: 'Автомобилна',
    category: 'automotive',
    tags: ['Лазерно рязане', 'Огъване', 'Алуминий'],
    specs: [
      { label: 'Материал', value: 'Алуминий 5754' },
      { label: 'Дебелина', value: '2–4 mm' },
      { label: 'Прецизност', value: '±0.15 mm' },
      { label: 'Повърхност', value: 'Анодизиране' }
    ]
  },
  {
    id: 8,
    title: 'Индустриални стълби',
    description: 'Метални стълби и платформи за промишлени сгради.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80'
    ],
    industry: 'Строителство',
    category: 'construction',
    tags: ['Заваряване', 'Галванизация', 'Монтаж'],
    specs: [
      { label: 'Материал', value: 'Стомана S235' },
      { label: 'Покритие', value: 'Горещо поцинковане' },
      { label: 'Товар', value: 'до 500 kg/m²' },
      { label: 'Стандарт', value: 'EN ISO 14122' }
    ]
  },
  {
    id: 9,
    title: 'Дизайнерски маси',
    description: 'Модерни метални маси за офис пространства.',
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80'
    ],
    industry: 'Мебели',
    category: 'furniture',
    tags: ['Лазерно рязане', 'Прахово боядисване', 'Стомана'],
    specs: [
      { label: 'Материал', value: 'Стомана S235' },
      { label: 'Повърхност', value: 'Прахово боядисване RAL' },
      { label: 'Размери', value: 'По поръчка' },
      { label: 'Товароносимост', value: 'до 100 kg' }
    ]
  }
];