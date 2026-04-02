<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'slug' => 'shasi-komponenti',
                'category' => 'automotive',
                'title' => ['bg' => 'Шаси компоненти'],
                'description' => ['bg' => 'Прецизни компоненти за автомобилни шасита с лазерно рязане и огъване.'],
                'industry' => ['bg' => 'Автомобилна'],
                'images' => [
                    'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
                ],
                'tags' => ['Лазерно рязане', 'Огъване', 'Стомана'],
                'specs' => [
                    ['label' => ['bg' => 'Материал'], 'value' => ['bg' => 'Студеновалцована стомана S355']],
                    ['label' => ['bg' => 'Дебелина'], 'value' => ['bg' => '3–8 mm']],
                    ['label' => ['bg' => 'Прецизност'], 'value' => ['bg' => '±0.1 mm']],
                    ['label' => ['bg' => 'Количество'], 'value' => ['bg' => '500 бр./месец']],
                ],
            ],
            [
                'slug' => 'mashini-korpusi',
                'category' => 'machinery',
                'title' => ['bg' => 'Машинни корпуси'],
                'description' => ['bg' => 'Заварени корпуси за промишлени машини с повърхностна обработка.'],
                'industry' => ['bg' => 'Машиностроене'],
                'images' => [
                    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
                ],
                'tags' => ['Заваряване', 'Монтаж', 'Боядисване'],
                'specs' => [
                    ['label' => ['bg' => 'Материал'], 'value' => ['bg' => 'Стомана S235/S355']],
                    ['label' => ['bg' => 'Заваряване'], 'value' => ['bg' => 'MIG/MAG']],
                    ['label' => ['bg' => 'Повърхност'], 'value' => ['bg' => 'Прахово боядисване RAL']],
                    ['label' => ['bg' => 'Тегло'], 'value' => ['bg' => '50–200 kg']],
                ],
            ],
            [
                'slug' => 'stomani-gredi',
                'category' => 'construction',
                'title' => ['bg' => 'Стоманени греди'],
                'description' => ['bg' => 'Конструктивни елементи за строителни проекти в Германия.'],
                'industry' => ['bg' => 'Строителство'],
                'images' => [
                    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80',
                ],
                'tags' => ['Конструкции', 'EN 1090', 'Стомана'],
                'specs' => [
                    ['label' => ['bg' => 'Стандарт'], 'value' => ['bg' => 'EN 1090-2 EXC2']],
                    ['label' => ['bg' => 'Материал'], 'value' => ['bg' => 'Стомана S355 J2']],
                    ['label' => ['bg' => 'Дължина'], 'value' => ['bg' => 'до 12 m']],
                    ['label' => ['bg' => 'Сертификация'], 'value' => ['bg' => 'CE маркировка']],
                ],
            ],
            [
                'slug' => 'metalni-ramki-za-mebeli',
                'category' => 'furniture',
                'title' => ['bg' => 'Метални рамки за мебели'],
                'description' => ['bg' => 'Елегантни метални рамки за дизайнерски мебели.'],
                'industry' => ['bg' => 'Мебели'],
                'images' => [
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
                ],
                'tags' => ['Лазерно рязане', 'Полиране', 'Неръждаема стомана'],
                'specs' => [
                    ['label' => ['bg' => 'Материал'], 'value' => ['bg' => 'Неръждаема стомана AISI 304']],
                    ['label' => ['bg' => 'Повърхност'], 'value' => ['bg' => 'Сатен/Огледало']],
                    ['label' => ['bg' => 'Дебелина'], 'value' => ['bg' => '1.5–3 mm']],
                    ['label' => ['bg' => 'Финиш'], 'value' => ['bg' => 'Механично полиране']],
                ],
            ],
            [
                'slug' => 'solarni-konstruktsii',
                'category' => 'energy',
                'title' => ['bg' => 'Соларни конструкции'],
                'description' => ['bg' => 'Монтажни системи за фотоволтаични инсталации.'],
                'industry' => ['bg' => 'Енергетика'],
                'images' => [
                    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
                ],
                'tags' => ['Галванизация', 'Монтаж', 'Алуминий'],
                'specs' => [
                    ['label' => ['bg' => 'Материал'], 'value' => ['bg' => 'Алуминий 6063-T5']],
                    ['label' => ['bg' => 'Покритие'], 'value' => ['bg' => 'Горещо поцинковане']],
                    ['label' => ['bg' => 'Натоварване'], 'value' => ['bg' => 'Вятър + сняг']],
                    ['label' => ['bg' => 'Стандарт'], 'value' => ['bg' => 'EN 1999']],
                ],
            ],
            [
                'slug' => 'rezervoari-ot-nerzhdaema-stomana',
                'category' => 'machinery',
                'title' => ['bg' => 'Резервоари от неръждаема стомана'],
                'description' => ['bg' => 'Хранителни резервоари с TIG заваряване и полиране.'],
                'industry' => ['bg' => 'Хранителна'],
                'images' => [
                    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
                ],
                'tags' => ['TIG заваряване', 'Полиране', 'INOX'],
                'specs' => [
                    ['label' => ['bg' => 'Материал'], 'value' => ['bg' => 'AISI 316L']],
                    ['label' => ['bg' => 'Обем'], 'value' => ['bg' => '500–5000 литра']],
                    ['label' => ['bg' => 'Заваряване'], 'value' => ['bg' => 'TIG орбитално']],
                    ['label' => ['bg' => 'Стандарт'], 'value' => ['bg' => 'FDA / CE']],
                ],
            ],
            [
                'slug' => 'avtomobilni-paneli',
                'category' => 'automotive',
                'title' => ['bg' => 'Автомобилни панели'],
                'description' => ['bg' => 'Външни панели за специализирани превозни средства.'],
                'industry' => ['bg' => 'Автомобилна'],
                'images' => [
                    'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
                ],
                'tags' => ['Лазерно рязане', 'Огъване', 'Алуминий'],
                'specs' => [
                    ['label' => ['bg' => 'Материал'], 'value' => ['bg' => 'Алуминий 5754']],
                    ['label' => ['bg' => 'Дебелина'], 'value' => ['bg' => '2–4 mm']],
                    ['label' => ['bg' => 'Прецизност'], 'value' => ['bg' => '±0.15 mm']],
                    ['label' => ['bg' => 'Повърхност'], 'value' => ['bg' => 'Анодизиране']],
                ],
            ],
            [
                'slug' => 'industryalni-stalbi',
                'category' => 'construction',
                'title' => ['bg' => 'Индустриални стълби'],
                'description' => ['bg' => 'Метални стълби и платформи за промишлени сгради.'],
                'industry' => ['bg' => 'Строителство'],
                'images' => [
                    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
                ],
                'tags' => ['Заваряване', 'Галванизация', 'Монтаж'],
                'specs' => [
                    ['label' => ['bg' => 'Материал'], 'value' => ['bg' => 'Стомана S235']],
                    ['label' => ['bg' => 'Покритие'], 'value' => ['bg' => 'Горещо поцинковане']],
                    ['label' => ['bg' => 'Товар'], 'value' => ['bg' => 'до 500 kg/m²']],
                    ['label' => ['bg' => 'Стандарт'], 'value' => ['bg' => 'EN ISO 14122']],
                ],
            ],
            [
                'slug' => 'dizaynarski-masi',
                'category' => 'furniture',
                'title' => ['bg' => 'Дизайнерски маси'],
                'description' => ['bg' => 'Модерни метални маси за офис пространства.'],
                'industry' => ['bg' => 'Мебели'],
                'images' => [
                    'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
                ],
                'tags' => ['Лазерно рязане', 'Прахово боядисване', 'Стомана'],
                'specs' => [
                    ['label' => ['bg' => 'Материал'], 'value' => ['bg' => 'Стомана S235']],
                    ['label' => ['bg' => 'Повърхност'], 'value' => ['bg' => 'Прахово боядисване RAL']],
                    ['label' => ['bg' => 'Размери'], 'value' => ['bg' => 'По поръчка']],
                    ['label' => ['bg' => 'Товароносимост'], 'value' => ['bg' => 'до 100 kg']],
                ],
            ],
        ];

        $categories = Category::forProjects()->get()->keyBy('slug');
        $tags = Tag::all()->keyBy(fn ($t) => $t->getTranslation('name', 'bg'));

        foreach ($projects as $data) {
            $category = $categories[$data['category']];

            $project = Project::create([
                'slug' => $data['slug'],
                'category_id' => $category->id,
                'title' => $data['title'],
                'description' => $data['description'],
                'industry' => $data['industry'],
            ]);

            foreach ($data['images'] as $i => $url) {
                $collection = $i === 0 ? 'cover_image' : 'images';
                $project->addMediaFromUrl($url)->toMediaCollection($collection);
            }

            foreach ($data['specs'] as $i => $spec) {
                $project->specs()->create([
                    'label' => $spec['label'],
                    'value' => $spec['value'],
                    'sort_order' => $i,
                ]);
            }

            $tagIds = collect($data['tags'])
                ->map(fn ($name) => $tags[$name] ?? null)
                ->filter()
                ->pluck('id');

            $project->tags()->attach($tagIds);
        }
    }
}
