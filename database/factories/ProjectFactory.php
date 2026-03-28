<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->words(3, true);
        $industry = $this->faker->word();

        return [
            'category_id' => Category::factory(),
            'title' => ['bg' => $title, 'en' => $title],
            'description' => ['bg' => $this->faker->sentence(), 'en' => $this->faker->sentence()],
            'industry' => ['bg' => $industry, 'en' => $industry],
        ];
    }
}
