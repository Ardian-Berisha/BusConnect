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
        Schema::create('punetori', function (Blueprint $table) {
            $table->ID();
            $table->foreignId('fabrika_ID')->constrained()->onDelete('cascade');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('position');
            
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('punetori');
    }
};
