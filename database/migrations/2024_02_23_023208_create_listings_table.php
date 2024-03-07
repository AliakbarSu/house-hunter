<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('type')->default('rent');
            $table->string('property_type')->default('house');
            $table->float('rent');
            $table->string('rent_frequency')->default('weekly');
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->integer('garages')->default(0);
            $table->integer('toilets')->default(0);
            $table->string('status')->default('wishlist');
            $table->string('real_estate')->nullable();
            $table->string('agent')->nullable();
            $table->string('landlord')->nullable();
            $table->float('price')->nullable();
            $table->float('size')->nullable();
            $table->string('size_unit')->default('sqm');
            $table->string('link')->nullable();
            $table->json('pros')->nullable();
            $table->json('cons')->nullable();
            $table->json('amenities')->nullable();
            $table->boolean('deleted')->default(false)->nullable();
            $table->unsignedBigInteger('board_id');
            $table->foreign('board_id')->references('id')->on('boards')->onDelete('cascade');
            $table->dateTime('viewing_at')->default(now())->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
