<?php

namespace App\Models;

use App\Concerns\HasSlug;
use Database\Factories\TagFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Translatable\HasTranslations;

class Tag extends Model
{
    /** @use HasFactory<TagFactory> */
    use HasFactory, HasSlug, HasTranslations;

    public array $translatable = ['name'];

    protected string $slugSource = 'name';

    protected $fillable = [
        'slug',
        'name',
    ];

    public function projects(): MorphToMany
    {
        return $this->morphedByMany(Project::class, 'taggable');
    }

    public function products(): MorphToMany
    {
        return $this->morphedByMany(Product::class, 'taggable');
    }
}
