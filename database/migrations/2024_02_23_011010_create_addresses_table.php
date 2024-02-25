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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('profile_id');
            $table
                ->foreign('profile_id')
                ->references('id')
                ->on('profiles')
                ->onDelete('cascade');
            $table->string('address');
            $table->float('rent')->nullable();
            $table->string('rent_frequency')->default('weekly');
            $table->string('landlord_name')->nullable();
            $table->string('landlord_phone')->nullable();
            $table->string('landlord_mobile')->nullable();
            $table->string('address_type')->default('current');
            $table->string('landlord_type')->default('agent');
            $table->date('move_in_at');
            $table->date('move_out_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
