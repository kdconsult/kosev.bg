<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('images');
    }

    public function down(): void
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->morphs('imageable');
            $table->string('path', 500);
            $table->json('alt')->nullable();
            $table->smallInteger('sort_order')->unsigned()->default(0);
            $table->boolean('is_cover')->default(false);
            $table->timestamps();
        });
    }
};
