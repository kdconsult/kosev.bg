<?php

namespace App\Models;

use App\Concerns\HasSlug;
use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Translatable\HasTranslations;

class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory, HasSlug, HasTranslations;

    public array $translatable = ['title', 'description'];

    protected $fillable = [
        'slug',
        'category_id',
        'title',
        'description',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable')->orderBy('sort_order');
    }

    public function coverImage(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable')->where('is_cover', true);
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function specs(): MorphMany
    {
        return $this->morphMany(Spec::class, 'specable')->orderBy('sort_order');
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'product_service');
    }
}
