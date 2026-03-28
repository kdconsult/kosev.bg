<?php

namespace App\Models;

use App\Concerns\HasSlug;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Translatable\HasTranslations;

class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory, HasSlug, HasTranslations;

    public array $translatable = ['title', 'description', 'industry'];

    protected $fillable = [
        'slug',
        'category_id',
        'title',
        'description',
        'industry',
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
}
