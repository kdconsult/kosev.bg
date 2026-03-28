<?php

namespace App\Models;

use Database\Factories\SpecFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Translatable\HasTranslations;

class Spec extends Model
{
    /** @use HasFactory<SpecFactory> */
    use HasFactory, HasTranslations;

    public array $translatable = ['label', 'value'];

    protected $fillable = [
        'label',
        'value',
        'sort_order',
    ];

    public function specable(): MorphTo
    {
        return $this->morphTo();
    }
}
