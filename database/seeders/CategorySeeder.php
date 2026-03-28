<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $projectCategories = [
            ['slug' => 'automotive', 'name' => ['bg' => 'Автомобилна', 'en' => 'Automotive'], 'type' => 'project'],
            ['slug' => 'machinery', 'name' => ['bg' => 'Машиностроене', 'en' => 'Machinery'], 'type' => 'project'],
            ['slug' => 'construction', 'name' => ['bg' => 'Строителство', 'en' => 'Construction'], 'type' => 'project'],
            ['slug' => 'furniture', 'name' => ['bg' => 'Мебели', 'en' => 'Furniture'], 'type' => 'project'],
            ['slug' => 'energy', 'name' => ['bg' => 'Енергетика', 'en' => 'Energy'], 'type' => 'project'],
        ];

        $productCategories = [
            ['slug' => 'lazerno-ryazane', 'name' => ['bg' => 'Лазерно рязане', 'en' => 'Laser Cutting'], 'type' => 'product'],
            ['slug' => 'ogavane', 'name' => ['bg' => 'Огъване', 'en' => 'Bending'], 'type' => 'product'],
            ['slug' => 'zavaryavane', 'name' => ['bg' => 'Заваряване', 'en' => 'Welding'], 'type' => 'product'],
            ['slug' => 'konstruktsii', 'name' => ['bg' => 'Конструкции', 'en' => 'Structures'], 'type' => 'product'],
            ['slug' => 'inox', 'name' => ['bg' => 'INOX', 'en' => 'INOX'], 'type' => 'product'],
            ['slug' => 'povarkhnostna-obrabotka', 'name' => ['bg' => 'Повърхностна обработка', 'en' => 'Surface Treatment'], 'type' => 'product'],
        ];

        foreach ([...$projectCategories, ...$productCategories] as $data) {
            Category::create($data);
        }
    }
}
