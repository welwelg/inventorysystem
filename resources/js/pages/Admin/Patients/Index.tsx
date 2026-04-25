import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Patient {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    checkups_count: number;
}

interface PageProps {
    patients: {
        data: Patient[];
    };
}

export default function Index({ patients }: PageProps) {
    return (
        <>
            <Head title="Patients" />

            {/* 1. Added max-w-full to ensure it never exceeds the viewport width */}
            <div className="flex h-full flex-col gap-4 overflow-hidden p-2 sm:p-4 max-w-full">

                <div className="shrink-0 grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border sm:col-span-2 md:col-span-1">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>

                <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="mx-auto flex h-full w-full max-w-7xl flex-col p-2 sm:p-4 md:p-6 min-h-0">
                        <Head title="Patients List" />

                        <div className="mb-4 flex shrink-0 flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="w-full">
                                <h1 className="text-xl font-bold tracking-tight sm:text-2xl break-words">
                                    Patients Directory
                                </h1>
                                <p className="text-xs text-muted-foreground sm:text-sm break-words">
                                    Manage your patients and their information
                                </p>
                            </div>

                            <Link href="/admin/patients/create" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto">+ Add New Patient</Button>
                            </Link>
                        </div>

                        {/* 2. Strict overflow handling here */}
                        <div className="relative flex-1 overflow-y-auto overflow-x-hidden rounded-md border bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">

                            {/* 3. Added 'table-fixed' so columns strictly obey width, and don't push outward */}
                            <Table className="w-full table-fixed">
                                <TableHeader className="sticky top-0 z-10 bg-white shadow-sm dark:bg-zinc-950">
                                    <TableRow>
                                        {/* Adjusted column widths for better distribution */}
                                        <TableHead className="w-[40%] sm:w-[25%]">Patient</TableHead>
                                        <TableHead className="hidden sm:table-cell sm:w-[30%]">Contact Info</TableHead>
                                        <TableHead className="w-[30%] sm:w-[15%]">Status</TableHead>
                                        <TableHead className="hidden sm:table-cell sm:w-[15%]">Visits</TableHead>
                                        <TableHead className="w-[30%] sm:w-[15%] text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patients.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="h-24 px-4 text-center text-sm text-muted-foreground"
                                            >
                                                No patients found. Add your first patient!
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        patients.data.map((patient) => (
                                            <TableRow key={patient.id}>

                                                {/* 4. Combined Name & Contact for mobile view to save space */}
                                                <TableCell className="font-medium text-sm truncate">
                                                    <div className="truncate">
                                                        {patient.first_name} {patient.last_name}
                                                    </div>
                                                    {/* This only shows on mobile, since the main contact column is hidden */}
                                                    <div className="sm:hidden text-xs font-normal text-muted-foreground truncate mt-1">
                                                        {patient.phone || patient.email || 'No contact'}
                                                    </div>
                                                </TableCell>

                                                <TableCell className="hidden sm:table-cell">
                                                    <div className="text-sm truncate">
                                                        {patient.phone || 'N/A'}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground truncate">
                                                        {patient.email || 'No email'}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    {patient.checkups_count === 0 ? (
                                                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-[10px] sm:text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 whitespace-nowrap">
                                                            No Record
                                                        </span>
                                                    ) : patient.checkups_count === 1 ? (
                                                        <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] sm:text-xs text-green-800 dark:bg-green-900/30 dark:text-green-400 whitespace-nowrap">
                                                            New
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] sm:text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 whitespace-nowrap">
                                                            Returning
                                                        </span>
                                                    )}
                                                </TableCell>

                                                <TableCell className="hidden sm:table-cell text-sm">
                                                    {patient.checkups_count}
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    <div className="flex flex-col sm:flex-row justify-end gap-1 sm:gap-2">
                                                        <Button variant="outline" size="sm" className="h-6 w-full sm:w-auto sm:h-7 text-[10px] sm:text-xs px-2">
                                                            View
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="h-6 w-full sm:w-auto sm:h-7 text-[10px] sm:text-xs px-2">
                                                            Edit
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Patients',
            href: '/admin/patients',
        },
    ],
};
