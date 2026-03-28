<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tagNames = [
            // Project tags
            'Лазерно рязане',
            'Огъване',
            'Стомана',
            'Заваряване',
            'Монтаж',
            'Боядисване',
            'Конструкции',
            'EN 1090',
            'Галванизация',
            'Алуминий',
            'Полиране',
            'Неръждаема стомана',
            'TIG заваряване',
            'INOX',
            'Прахово боядисване',
            // Product tags
            'Fiber лазер',
            'CNC',
            'По поръчка',
            'Серийно производство',
            'CNC абкант',
            'Профили',
            'Корпуси',
            'MIG/MAG',
            'TIG',
            'Роботизирано',
            'EN ISO 3834',
            'CE маркировка',
            'Конструктивна стомана',
            'AISI 304',
            'AISI 316L',
            'FDA',
            'Хигиенен дизайн',
            'Поцинковане',
            'Анодизиране',
            'RAL',
        ];

        foreach (array_unique($tagNames) as $name) {
            Tag::create([
                'slug' => Str::slug($name),
                'name' => ['bg' => $name],
            ]);
        }
    }
}
