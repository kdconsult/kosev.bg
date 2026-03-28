<?php

namespace App\Models;

use App\Concerns\HasSlug;
use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Translatable\HasTranslations;

class Service extends Model
{
    /** @use HasFactory<ServiceFactory> */
    use HasFactory, HasSlug, HasTranslations;

    public array $translatable = ['name'];

    protected string $slugSource = 'name';

    protected $fillable = [
        'slug',
        'name',
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_service');
    }
}
