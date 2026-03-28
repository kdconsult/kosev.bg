<?php

namespace Database\Factories;

use App\Models\Spec;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Spec>
 */
class SpecFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $label = $this->faker->words(2, true);
        $value = $this->faker->words(3, true);

        return [
            'label' => ['bg' => $label, 'en' => $label],
            'value' => ['bg' => $value, 'en' => $value],
            'sort_order' => 0,
        ];
    }
}
