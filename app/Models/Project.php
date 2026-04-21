<?php

namespace App\Models;

use App\Concerns\HasSlug;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;

class Project extends Model implements HasMedia
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory, HasSlug, HasTranslations, InteractsWithMedia;

    public array $translatable = ['title', 'description'];

    protected $fillable = [
        'slug',
        'category_id',
        'title',
        'description',
    ];

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('cover_image')
            ->singleFile();

        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function coverImage()
    {
        return $this->getFirstMedia('cover_image');
    }

    public function images()
    {
        return $this->getMedia('images');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
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
