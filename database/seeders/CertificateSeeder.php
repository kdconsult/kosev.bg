<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $certificates = [
            [
                'slug' => 'iso-9001',
                'name' => ['bg' => 'ISO 9001:2015'],
                'description' => ['bg' => 'Система за управление на качеството. Стандартът гарантира, че всички наши производствени процеси са строго контролирани и отговарят на международните изисквания за качество.'],
                'image_path' => 'https://kosev.bg/wp-content/uploads/2026/02/ISO-9001-2015-en-440x550.jpg',
                'pdf_path' => 'https://kosev.bg/wp-content/uploads/2026/02/ISO-9001-2015-en.pdf',
                'sort_order' => 0,
            ],
            [
                'slug' => 'iso-14001',
                'name' => ['bg' => 'ISO 14001:2015'],
                'description' => ['bg' => 'Система за управление на околната среда. Ангажираме се с намаляване на въздействието върху околната среда чрез ефективно управление на отпадъците и ресурсите.'],
                'image_path' => 'https://kosev.bg/wp-content/uploads/2026/02/Certificate-of-conformity-of-the-factory-production-control-1-440x550.jpg',
                'pdf_path' => 'https://kosev.bg/wp-content/uploads/2026/02/Certificate-of-conformity-of-the-factory-production-control.pdf',
                'sort_order' => 1,
            ],
            [
                'slug' => 'en-1090',
                'name' => ['bg' => 'EN 1090'],
                'description' => ['bg' => 'Сертификат за изпълнение на стоманени конструкции. Позволява ни да произвеждаме и доставяме конструктивни стоманени елементи с CE маркировка за целия Европейски съюз.'],
                'image_path' => 'https://kosev.bg/wp-content/uploads/2026/02/Welding-Certoficate-1-440x550.jpg',
                'pdf_path' => 'https://kosev.bg/wp-content/uploads/2026/02/Welding-Certoficate.pdf',
                'sort_order' => 2,
            ],
            [
                'slug' => 'iso-3834-2',
                'name' => ['bg' => 'ISO 3834-2'],
                'description' => ['bg' => 'Изисквания за качество при заваряване. Сертификатът обхваща всички заваръчни процеси в нашето производство и доказва компетентността на нашите сертифицирани заварчици.'],
                'image_path' => 'https://kosev.bg/wp-content/uploads/2026/02/3834-2-eng-440x550.jpg',
                'pdf_path' => 'https://kosev.bg/wp-content/uploads/2026/02/3834-2-eng.pdf',
                'sort_order' => 3,
            ],
        ];

        foreach ($certificates as $data) {
            Certificate::create($data);
        }
    }
}
