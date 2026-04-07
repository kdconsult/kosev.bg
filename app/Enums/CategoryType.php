<?php

namespace App\Enums;

enum CategoryType: string
{
    case Project = 'project';
    case Product = 'product';

    public function label(): string
    {
        return match ($this) {
            self::Project => 'Project',
            self::Product => 'Product',
        };
    }
}
