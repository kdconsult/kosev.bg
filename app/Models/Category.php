<?php

namespace App\Models;

use App\Concerns\HasSlug;
use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class Category extends Model
{
    /** @use HasFactory<CategoryFactory> */
    use HasFactory, HasSlug, HasTranslations;

    public array $translatable = ['name'];

    protected string $slugSource = 'name';

    protected $fillable = [
        'slug',
        'name',
        'type',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function scopeForProjects(Builder $query): void
    {
        $query->where('type', 'project');
    }

    public function scopeForProducts(Builder $query): void
    {
        $query->where('type', 'product');
    }
}
