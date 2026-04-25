<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Patient; // Wag kalimutang i-import ang Model mo!

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Kukunin natin ang patients sa database.
        // Gumamit tayo ng paginate para mag-tugma sa 'patients.data' na format sa React.
        // Naka-sort din from latest para yung bagong add nasa taas.
        $patients = Patient::withCount('checkups') // Kung may relation kang 'checkups' sa model
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Patients/Index', [
            'patients' => $patients
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Ire-render lang natin yung Create.tsx page mo
        return Inertia::render('Admin/Patients/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 1. I-validate muna natin ang data galing sa React form
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255|unique:patients,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        // 2. I-save sa database
        Patient::create($validated);

        // 3. I-redirect pabalik sa Index page pagkatapos ma-save
        return redirect()->route('admin.patients.index')
            ->with('message', 'Patient successfully created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
