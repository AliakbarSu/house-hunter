<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->string('address')->nullable();
            $table->string('property_type')->nullable();
            $table->string('property_id')->nullable();
            $table->string('property_data')->nullable(); // [{"land_area": "22m2" }]
            $table->string('page_id')->nullable();
            $table->string('link')->nullable();
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->integer('garages')->nullable();
            $table->float('size')->nullable();
            $table->float('price')->nullable();
            $table->float('rent')->nullable();
            $table->string('images')->nullable();
            $table->string('type')->nullable();
            $table->string('status')->nullable();
            $table->string('amenities')->nullable();
            $table->string('real_state')->nullable();
            $table->string('agents')->nullable(); // [{"name": "John Doe", "phone": "1234567890"}]
            $table->boolean('deleted')->default(false);
            $table->date('available_on')->nullable();
            $table->date('listed_on')->nullable();
            $table->date('updated_on')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
