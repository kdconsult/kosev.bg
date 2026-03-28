<?php

namespace App\Models;

use Database\Factories\ImageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Translatable\HasTranslations;

class Image extends Model
{
    /** @use HasFactory<ImageFactory> */
    use HasFactory, HasTranslations;

    public array $translatable = ['alt'];

    protected $fillable = [
        'path',
        'alt',
        'sort_order',
        'is_cover',
    ];

    protected $casts = [
        'is_cover' => 'boolean',
    ];

    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }
}
