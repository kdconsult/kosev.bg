<?php

namespace Database\Factories;

use App\Models\Certificate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Certificate>
 */
class CertificateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = strtoupper($this->faker->word());

        return [
            'name' => ['bg' => $name, 'en' => $name],
            'description' => ['bg' => $this->faker->sentence(), 'en' => $this->faker->sentence()],
            'image_path' => $this->faker->imageUrl(440, 550),
            'pdf_path' => $this->faker->url(),
            'sort_order' => 0,
        ];
    }
}
