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
        Schema::create('checkups', function (Blueprint $table) {
            $table->id();
            // Ito yung Foreign Key na magdudugtong sa checkup at sa pasyente
            $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->date('checkup_date');
            $table->text('reason_for_visit')->nullable();
            $table->text('diagnosis_or_notes')->nullable(); // Dagdag natin para may record yung doctor
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checkups');
    }
};
