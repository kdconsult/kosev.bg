export interface Product {
    id: string;
    title: string;
    description: string;
    category: string;
    images: string[];
    specs: { label: string; value: string }[];
    relatedServices: string[];
    tags: string[];
}

export const productsData: Product[] = [
    {
        id: 'laser-parts',
        title: 'Лазерно изрязани детайли',
        description:
            'Прецизно изрязани метални детайли по клиентски чертежи. Произвеждаме от стомана, неръждаема стомана и алуминий с изключителна точност.',
        category: 'Лазерно рязане',
        images: [
            'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        ],
        specs: [
            { label: 'Материали', value: 'Стомана, INOX, Алуминий' },
            { label: 'Макс. дебелина стомана', value: 'до 25 mm' },
            { label: 'Работна площ', value: '3000 × 1500 mm' },
            { label: 'Прецизност', value: '±0.1 mm' },
            { label: 'Доставка', value: '3–7 работни дни' },
        ],
        relatedServices: ['Лазерно рязане', 'Огъване на метал', 'Повърхностна обработка'],
        tags: ['Fiber лазер', 'CNC', 'По поръчка', 'Серийно производство'],
    },
    {
        id: 'bent-profiles',
        title: 'Огънати профили и корпуси',
        description:
            'Сложни профили и корпуси, изработени с CNC абкант преси. Идеални за машинни корпуси, кутии и конструктивни елементи.',
        category: 'Огъване',
        images: [
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        ],
        specs: [
            { label: 'Макс. дължина', value: 'до 4000 mm' },
            { label: 'Сила на натиск', value: '320 тона' },
            { label: 'Макс. дебелина', value: 'до 16 mm' },
            { label: 'Точност на ъгъла', value: '±0.5°' },
            { label: 'Брой огъвания', value: 'неограничен' },
        ],
        relatedServices: ['Огъване на метал', 'Лазерно рязане', 'Заваряване'],
        tags: ['CNC абкант', 'Профили', 'Корпуси', 'По поръчка'],
    },
    {
        id: 'welded-assemblies',
        title: 'Заварени конструкции',
        description:
            'Комплексни заварени конструкции за различни индустрии. Работим с MIG/MAG, TIG и роботизирано заваряване по стандарт EN ISO 3834.',
        category: 'Заваряване',
        images: [
            'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
        ],
        specs: [
            { label: 'Процеси', value: 'MIG/MAG, TIG, Роботизирано' },
            { label: 'Материали', value: 'Стомана, INOX, Алуминий' },
            { label: 'Стандарт', value: 'EN ISO 3834-2' },
            { label: 'Тестване', value: 'Визуален и NDT контрол' },
            { label: 'Сертифицирани', value: 'EN 287 заварчици' },
        ],
        relatedServices: ['Заваряване', 'Монтаж и сглобяване', 'Повърхностна обработка'],
        tags: ['MIG/MAG', 'TIG', 'Роботизирано', 'EN ISO 3834'],
    },
    {
        id: 'steel-structures',
        title: 'Стоманени конструкции',
        description:
            'Конструктивни стоманени елементи за строителството по стандарт EN 1090. CE маркировка за износ в ЕС.',
        category: 'Конструкции',
        images: [
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80',
        ],
        specs: [
            { label: 'Стандарт', value: 'EN 1090-2 EXC1-EXC3' },
            { label: 'Материали', value: 'S235, S355, S460' },
            { label: 'CE маркировка', value: 'Да' },
            { label: 'Тестване', value: 'NDT, визуален контрол' },
            { label: 'Макс. дължина', value: 'до 12 m' },
        ],
        relatedServices: ['Заваряване', 'Монтаж и сглобяване', 'Повърхностна обработка'],
        tags: ['EN 1090', 'CE маркировка', 'Конструктивна стомана'],
    },
    {
        id: 'inox-products',
        title: 'Изделия от неръждаема стомана',
        description:
            'Продукти от неръждаема стомана за хранителната, фармацевтичната и химическата индустрия. Покриваме изисквания за хигиена и FDA стандарти.',
        category: 'INOX',
        images: [
            'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
        ],
        specs: [
            { label: 'Материали', value: 'AISI 304, 316, 316L' },
            { label: 'Заваряване', value: 'TIG орбитално' },
            { label: 'Повърхност', value: 'Сатен, огледало, електрополиране' },
            { label: 'Стандарти', value: 'FDA, EN 10088' },
            { label: 'Приложение', value: 'Хранителна, фарм., химия' },
        ],
        relatedServices: ['Лазерно рязане', 'Заваряване', 'Повърхностна обработка'],
        tags: ['AISI 304', 'AISI 316L', 'FDA', 'Хигиенен дизайн'],
    },
    {
        id: 'surface-treated',
        title: 'Изделия с повърхностна обработка',
        description:
            'Метални изделия с финишна обработка по избор — прахово боядисване, поцинковане, анодизиране. Подходящи за вътрешно и външно приложение.',
        category: 'Повърхностна обработка',
        images: [
            'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        ],
        specs: [
            { label: 'Прахово боядисване', value: 'RAL по избор' },
            { label: 'Галванизация', value: 'Горещо поцинковане' },
            { label: 'Анодизиране', value: 'Алуминий, всички цветове' },
            { label: 'Грунд', value: 'Epoxy / Polyester' },
            { label: 'Дебелина на покритието', value: 'по спецификация' },
        ],
        relatedServices: ['Повърхностна обработка', 'Лазерно рязане', 'Монтаж и сглобяване'],
        tags: ['Прахово боядисване', 'Поцинковане', 'Анодизиране', 'RAL'],
    },
];
