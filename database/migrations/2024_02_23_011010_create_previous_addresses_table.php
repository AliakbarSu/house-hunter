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
        Schema::create('previous_addresses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('profile_id');
            $table
                ->foreign('profile_id')
                ->references('id')
                ->on('profiles')
                ->onDelete('cascade');
            $table->string('address');
            $table->timestamp('move_in_at');
            $table->timestamp('move_out_at');
            $table->float('rent');
            $table->string('rent_frequency')->default('weekly');
            $table->string('landlord_name');
            $table->string('landlord_phone');
            $table->string('landlord_mobile');
            $table->string('landlord_type')->default('agent');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('previous_addresses');
    }
};
