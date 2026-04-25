import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, User, Contact, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        date_of_birth: '',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.patients.store'));
    };

    return (
        <>
            <Head title="Add Patient" />

            <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
                {/* Modern Back Link */}
                <div className="mb-6">
                    <Link
                        href={route('admin.patients.index')}
                        className="group flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Patients Directory
                    </Link>
                </div>

                <Card className="overflow-hidden border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
                    <CardHeader className="border-b border-border/40 bg-muted/20 pb-6">
                        <CardTitle className="text-2xl">New Patient Profile</CardTitle>
                        <CardDescription className="text-base">
                            Enter the patient's complete details below. Fields marked with an asterisk (*) are required.
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={submit}>
                        <CardContent className="space-y-8 pt-8">

                            {/* --- SECTION 1: Personal Information --- */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <User className="h-4 w-4" />
                                    <h3>Personal Information</h3>
                                </div>

                                {/* Responsive Grid: 1 column sa mobile, 2 sa tablet up */}
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="first_name">
                                            First Name <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="first_name"
                                            value={data.first_name}
                                            onChange={e => setData('first_name', e.target.value)}
                                            placeholder="e.g. Juan"
                                            className="transition-colors focus-visible:ring-primary"
                                        />
                                        {errors.first_name && <p className="text-xs font-medium text-destructive">{errors.first_name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="last_name">
                                            Last Name <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={e => setData('last_name', e.target.value)}
                                            placeholder="e.g. Dela Cruz"
                                        />
                                        {errors.last_name && <p className="text-xs font-medium text-destructive">{errors.last_name}</p>}
                                    </div>

                                    <div className="space-y-2 sm:col-span-2">
                                        <Label htmlFor="date_of_birth">Date of Birth</Label>
                                        <Input
                                            id="date_of_birth"
                                            type="date"
                                            value={data.date_of_birth}
                                            onChange={e => setData('date_of_birth', e.target.value)}
                                            className="w-full sm:max-w-[50%]" // Para hindi masyadong mahaba sa desktop
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full bg-border/40" />

                            {/* --- SECTION 2: Contact Details --- */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Contact className="h-4 w-4" />
                                    <h3>Contact Details</h3>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            placeholder="0912 345 6789"
                                        />
                                        {errors.phone && <p className="text-xs font-medium text-destructive">{errors.phone}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            placeholder="juan.delacruz@example.com"
                                        />
                                        {errors.email && <p className="text-xs font-medium text-destructive">{errors.email}</p>}
                                    </div>

                                    <div className="space-y-2 sm:col-span-2">
                                        <Label htmlFor="address">Complete Address</Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                            placeholder="House No., Street, Barangay, City/Municipality"
                                        />
                                        {errors.address && <p className="text-xs font-medium text-destructive">{errors.address}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full bg-border/40" />

                            {/* --- SECTION 3: Additional Notes --- */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <FileText className="h-4 w-4" />
                                    <h3>Medical Notes / Remarks</h3>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes" className="sr-only">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                        placeholder="Add any initial observations, allergies, or context for this patient here..."
                                        className="min-h-[120px] resize-y"
                                    />
                                    <p className="text-[11px] text-muted-foreground">
                                        This information will be visible on the patient's main profile.
                                    </p>
                                </div>
                            </div>

                        </CardContent>

                        {/* --- FOOTER: Actions --- */}
                        <CardFooter className="flex flex-col-reverse gap-3 border-t border-border/40 bg-muted/20 px-6 py-4 sm:flex-row sm:justify-end sm:gap-2">
                            <Link href={route('admin.patients.index')} className="w-full sm:w-auto">
                                <Button type="button" variant="outline" className="w-full sm:w-auto">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                                {processing ? 'Saving Patient...' : 'Save Patient Record'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Add Patient',
            href: '/admin/patients/create',
        },
    ],
};
