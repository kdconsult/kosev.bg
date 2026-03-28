<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['slug' => 'lazerno-ryazane', 'name' => ['bg' => 'Лазерно рязане', 'en' => 'Laser Cutting']],
            ['slug' => 'ogavane-na-metal', 'name' => ['bg' => 'Огъване на метал', 'en' => 'Metal Bending']],
            ['slug' => 'povarkhnostna-obrabotka', 'name' => ['bg' => 'Повърхностна обработка', 'en' => 'Surface Treatment']],
            ['slug' => 'zavaryavane', 'name' => ['bg' => 'Заваряване', 'en' => 'Welding']],
            ['slug' => 'montazh-i-sglobyavane', 'name' => ['bg' => 'Монтаж и сглобяване', 'en' => 'Assembly']],
        ];

        foreach ($services as $data) {
            Service::create($data);
        }
    }
}
