<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Service;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'slug' => 'laser-parts',
                'category' => 'lazerno-ryazane',
                'title' => ['bg' => 'Лазерно изрязани детайли'],
                'description' => ['bg' => 'Прецизно изрязани метални детайли по клиентски чертежи. Произвеждаме от стомана, неръждаема стомана и алуминий с изключителна точност.'],
                'images' => [
                    'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
                ],
                'specs' => [
                    ['label' => ['bg' => 'Материали'], 'value' => ['bg' => 'Стомана, INOX, Алуминий']],
                    ['label' => ['bg' => 'Макс. дебелина стомана'], 'value' => ['bg' => 'до 25 mm']],
                    ['label' => ['bg' => 'Работна площ'], 'value' => ['bg' => '3000 × 1500 mm']],
                    ['label' => ['bg' => 'Прецизност'], 'value' => ['bg' => '±0.1 mm']],
                    ['label' => ['bg' => 'Доставка'], 'value' => ['bg' => '3–7 работни дни']],
                ],
                'tags' => ['Fiber лазер', 'CNC', 'По поръчка', 'Серийно производство'],
                'services' => ['Лазерно рязане', 'Огъване на метал', 'Повърхностна обработка'],
            ],
            [
                'slug' => 'bent-profiles',
                'category' => 'ogavane',
                'title' => ['bg' => 'Огънати профили и корпуси'],
                'description' => ['bg' => 'Сложни профили и корпуси, изработени с CNC абкант преси. Идеални за машинни корпуси, кутии и конструктивни елементи.'],
                'images' => [
                    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
                ],
                'specs' => [
                    ['label' => ['bg' => 'Макс. дължина'], 'value' => ['bg' => 'до 4000 mm']],
                    ['label' => ['bg' => 'Сила на натиск'], 'value' => ['bg' => '320 тона']],
                    ['label' => ['bg' => 'Макс. дебелина'], 'value' => ['bg' => 'до 16 mm']],
                    ['label' => ['bg' => 'Точност на ъгъла'], 'value' => ['bg' => '±0.5°']],
                    ['label' => ['bg' => 'Брой огъвания'], 'value' => ['bg' => 'неограничен']],
                ],
                'tags' => ['CNC абкант', 'Профили', 'Корпуси', 'По поръчка'],
                'services' => ['Огъване на метал', 'Лазерно рязане', 'Заваряване'],
            ],
            [
                'slug' => 'welded-assemblies',
                'category' => 'zavaryavane',
                'title' => ['bg' => 'Заварени конструкции'],
                'description' => ['bg' => 'Комплексни заварени конструкции за различни индустрии. Работим с MIG/MAG, TIG и роботизирано заваряване по стандарт EN ISO 3834.'],
                'images' => [
                    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
                ],
                'specs' => [
                    ['label' => ['bg' => 'Процеси'], 'value' => ['bg' => 'MIG/MAG, TIG, Роботизирано']],
                    ['label' => ['bg' => 'Материали'], 'value' => ['bg' => 'Стомана, INOX, Алуминий']],
                    ['label' => ['bg' => 'Стандарт'], 'value' => ['bg' => 'EN ISO 3834-2']],
                    ['label' => ['bg' => 'Тестване'], 'value' => ['bg' => 'Визуален и NDT контрол']],
                    ['label' => ['bg' => 'Сертифицирани'], 'value' => ['bg' => 'EN 287 заварчици']],
                ],
                'tags' => ['MIG/MAG', 'TIG', 'Роботизирано', 'EN ISO 3834'],
                'services' => ['Заваряване', 'Монтаж и сглобяване', 'Повърхностна обработка'],
            ],
            [
                'slug' => 'steel-structures',
                'category' => 'konstruktsii',
                'title' => ['bg' => 'Стоманени конструкции'],
                'description' => ['bg' => 'Конструктивни стоманени елементи за строителството по стандарт EN 1090. CE маркировка за износ в ЕС.'],
                'images' => [
                    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80',
                ],
                'specs' => [
                    ['label' => ['bg' => 'Стандарт'], 'value' => ['bg' => 'EN 1090-2 EXC1-EXC3']],
                    ['label' => ['bg' => 'Материали'], 'value' => ['bg' => 'S235, S355, S460']],
                    ['label' => ['bg' => 'CE маркировка'], 'value' => ['bg' => 'Да']],
                    ['label' => ['bg' => 'Тестване'], 'value' => ['bg' => 'NDT, визуален контрол']],
                    ['label' => ['bg' => 'Макс. дължина'], 'value' => ['bg' => 'до 12 m']],
                ],
                'tags' => ['EN 1090', 'CE маркировка', 'Конструктивна стомана'],
                'services' => ['Заваряване', 'Монтаж и сглобяване', 'Повърхностна обработка'],
            ],
            [
                'slug' => 'inox-products',
                'category' => 'inox',
                'title' => ['bg' => 'Изделия от неръждаема стомана'],
                'description' => ['bg' => 'Продукти от неръждаема стомана за хранителната, фармацевтичната и химическата индустрия. Покриваме изисквания за хигиена и FDA стандарти.'],
                'images' => [
                    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
                ],
                'specs' => [
                    ['label' => ['bg' => 'Материали'], 'value' => ['bg' => 'AISI 304, 316, 316L']],
                    ['label' => ['bg' => 'Заваряване'], 'value' => ['bg' => 'TIG орбитално']],
                    ['label' => ['bg' => 'Повърхност'], 'value' => ['bg' => 'Сатен, огледало, електрополиране']],
                    ['label' => ['bg' => 'Стандарти'], 'value' => ['bg' => 'FDA, EN 10088']],
                    ['label' => ['bg' => 'Приложение'], 'value' => ['bg' => 'Хранителна, фарм., химия']],
                ],
                'tags' => ['AISI 304', 'AISI 316L', 'FDA', 'Хигиенен дизайн'],
                'services' => ['Лазерно рязане', 'Заваряване', 'Повърхностна обработка'],
            ],
            [
                'slug' => 'surface-treated',
                'category' => 'povarkhnostna-obrabotka',
                'title' => ['bg' => 'Изделия с повърхностна обработка'],
                'description' => ['bg' => 'Метални изделия с финишна обработка по избор — прахово боядисване, поцинковане, анодизиране. Подходящи за вътрешно и външно приложение.'],
                'images' => [
                    'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
                ],
                'specs' => [
                    ['label' => ['bg' => 'Прахово боядисване'], 'value' => ['bg' => 'RAL по избор']],
                    ['label' => ['bg' => 'Галванизация'], 'value' => ['bg' => 'Горещо поцинковане']],
                    ['label' => ['bg' => 'Анодизиране'], 'value' => ['bg' => 'Алуминий, всички цветове']],
                    ['label' => ['bg' => 'Грунд'], 'value' => ['bg' => 'Epoxy / Polyester']],
                    ['label' => ['bg' => 'Дебелина на покритието'], 'value' => ['bg' => 'по спецификация']],
                ],
                'tags' => ['Прахово боядисване', 'Поцинковане', 'Анодизиране', 'RAL'],
                'services' => ['Повърхностна обработка', 'Лазерно рязане', 'Монтаж и сглобяване'],
            ],
        ];

        $categories = Category::forProducts()->get()->keyBy('slug');
        $tags = Tag::all()->keyBy(fn ($t) => $t->getTranslation('name', 'bg'));
        $services = Service::all()->keyBy(fn ($s) => $s->getTranslation('name', 'bg'));

        foreach ($products as $data) {
            $category = $categories[$data['category']];

            $product = Product::create([
                'slug' => $data['slug'],
                'category_id' => $category->id,
                'title' => $data['title'],
                'description' => $data['description'],
            ]);

            foreach ($data['images'] as $i => $path) {
                $product->images()->create([
                    'path' => $path,
                    'sort_order' => $i,
                    'is_cover' => $i === 0,
                ]);
            }

            foreach ($data['specs'] as $i => $spec) {
                $product->specs()->create([
                    'label' => $spec['label'],
                    'value' => $spec['value'],
                    'sort_order' => $i,
                ]);
            }

            $tagIds = collect($data['tags'])
                ->map(fn ($name) => $tags[$name] ?? null)
                ->filter()
                ->pluck('id');
            $product->tags()->attach($tagIds);

            $serviceIds = collect($data['services'])
                ->map(fn ($name) => $services[$name] ?? null)
                ->filter()
                ->pluck('id');
            $product->services()->attach($serviceIds);
        }
    }
}
