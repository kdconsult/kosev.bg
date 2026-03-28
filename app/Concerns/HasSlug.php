<?php

namespace App\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasSlug
{
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected static function bootHasSlug(): void
    {
        static::creating(function (Model $model): void {
            if (empty($model->slug)) {
                $source = $model->slugSource ?? 'title';
                $raw = is_array($model->{$source})
                    ? ($model->{$source}['bg'] ?? reset($model->{$source}))
                    : $model->{$source};
                $model->slug = Str::slug($raw);
            }
        });
    }
}
