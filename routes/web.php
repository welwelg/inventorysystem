<?php

use App\Http\Controllers\Admin\CheckupController;
use App\Http\Controllers\Admin\PatientController;
use App\Http\Controllers\Admin\MedicineController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('medicines', MedicineController::class);
        Route::resource('patients', PatientController::class);
        Route::resource('checkup', CheckupController::class);
    });
});

require __DIR__.'/settings.php';
