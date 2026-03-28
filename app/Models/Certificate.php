<?php

namespace App\Models;

use App\Concerns\HasSlug;
use Database\Factories\CertificateFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Certificate extends Model
{
    /** @use HasFactory<CertificateFactory> */
    use HasFactory, HasSlug, HasTranslations;

    public array $translatable = ['name', 'description'];

    protected string $slugSource = 'name';

    protected $fillable = [
        'slug',
        'name',
        'description',
        'image_path',
        'pdf_path',
        'sort_order',
    ];
}
