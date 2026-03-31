<?php

namespace App\Models;

use App\Concerns\HasSlug;
use Database\Factories\CertificateFactory;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;

class Certificate extends Model implements HasMedia
{
    /** @use HasFactory<CertificateFactory> */
    use HasFactory, HasSlug, HasTranslations, InteractsWithMedia;

    public array $translatable = ['name', 'description'];

    protected string $slugSource = 'name';

    protected $fillable = [
        'slug',
        'name',
        'description',
        'sort_order',
    ];

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('pdfs')
            ->singleFile();

        $this->addMediaConversion('thumb')

            ->pdfPageNumber(1)
            ->performOnCollections('pdfs')
            ->nonQueued();

    }

    /**
     * Scope a query to order certificates by their sort order.
     */
    #[Scope]
    protected function orderBySort(Builder $query): void
    {
        $query->orderBy('sort_order');
    }
}
