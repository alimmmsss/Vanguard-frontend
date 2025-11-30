'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useS3Upload } from '@/hooks/useS3Upload';
import { Loader2, Upload, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- Schemas ---
const personalSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    nidNumber: z.string().min(10, "Invalid NID"),
    address: z.string().min(5, "Address is required"),
});

const vehicleSchema = z.object({
    make: z.string().min(2, "Make is required"),
    model: z.string().min(2, "Model is required"),
    year: z.string().length(4, "Invalid year"),
    licensePlate: z.string().min(5, "License plate is required"),
});

// --- Types ---
type PersonalData = z.infer<typeof personalSchema>;
type VehicleData = z.infer<typeof vehicleSchema>;

export default function RegistrationWizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [personalData, setPersonalData] = useState<PersonalData | null>(null);
    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

    const { uploadFile, isUploading } = useS3Upload();

    // --- Step 1: Personal Info ---
    const PersonalForm = () => {
        const { register, handleSubmit, formState: { errors } } = useForm<PersonalData>({
            resolver: zodResolver(personalSchema),
            defaultValues: personalData || {},
        });

        const onSubmit = (data: PersonalData) => {
            setPersonalData(data);
            setStep(2);
        };

        return (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h2 className="text-xl font-bold text-deep-slate-blue mb-4">Personal Information</h2>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input {...register('fullName')} className="w-full px-4 py-2 border rounded-lg" placeholder="As per NID" />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">NID Number</label>
                    <input {...register('nidNumber')} className="w-full px-4 py-2 border rounded-lg" placeholder="National ID Number" />
                    {errors.nidNumber && <p className="text-red-500 text-xs mt-1">{errors.nidNumber.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <textarea {...register('address')} className="w-full px-4 py-2 border rounded-lg" placeholder="Current Address" />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-deep-slate-blue text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2">
                        Next <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </form>
        );
    };

    // --- Step 2: Vehicle Info ---
    const VehicleForm = () => {
        const { register, handleSubmit, formState: { errors } } = useForm<VehicleData>({
            resolver: zodResolver(vehicleSchema),
            defaultValues: vehicleData || {},
        });

        const onSubmit = (data: VehicleData) => {
            setVehicleData(data);
            setStep(3);
        };

        return (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h2 className="text-xl font-bold text-deep-slate-blue mb-4">Vehicle Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Make</label>
                        <input {...register('make')} className="w-full px-4 py-2 border rounded-lg" placeholder="Toyota" />
                        {errors.make && <p className="text-red-500 text-xs mt-1">{errors.make.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                        <input {...register('model')} className="w-full px-4 py-2 border rounded-lg" placeholder="Axio" />
                        {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                        <input {...register('year')} className="w-full px-4 py-2 border rounded-lg" placeholder="2018" />
                        {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">License Plate</label>
                        <input {...register('licensePlate')} className="w-full px-4 py-2 border rounded-lg" placeholder="Dhaka Metro-GA..." />
                        {errors.licensePlate && <p className="text-red-500 text-xs mt-1">{errors.licensePlate.message}</p>}
                    </div>
                </div>
                <div className="flex justify-between pt-4">
                    <button type="button" onClick={() => setStep(1)} className="text-slate-500 font-medium flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <button type="submit" className="bg-deep-slate-blue text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2">
                        Next <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </form>
        );
    };

    // --- Step 3: Verification (Uploads) ---
    const VerificationStep = () => {
        const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const key = await uploadFile(file);
            if (key) {
                setUploadedFiles(prev => ({ ...prev, [field]: key }));
            }
        };

        const isComplete = uploadedFiles['nid'] && uploadedFiles['license'] && uploadedFiles['car'];

        const handleFinish = () => {
            if (!isComplete) return;
            // Submit everything to backend
            console.log({ personalData, vehicleData, uploadedFiles });
            router.push('/driver/dashboard');
        };

        return (
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-deep-slate-blue mb-4">Document Verification</h2>

                {['nid', 'license', 'car'].map((field) => (
                    <div key={field} className="border border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
                        {uploadedFiles[field] ? (
                            <div className="flex flex-col items-center text-emerald-600">
                                <CheckCircle className="h-8 w-8 mb-2" />
                                <span className="font-medium capitalize">{field} Uploaded</span>
                            </div>
                        ) : (
                            <>
                                <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                                <label className="block text-sm font-medium text-slate-700 capitalize mb-1">
                                    Upload {field === 'car' ? 'Car Photo' : field.toUpperCase()}
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleUpload(e, field)}
                                    className="hidden"
                                    id={`file-${field}`}
                                    disabled={isUploading}
                                />
                                <label
                                    htmlFor={`file-${field}`}
                                    className="text-electric-teal text-sm font-bold cursor-pointer hover:underline"
                                >
                                    {isUploading ? 'Uploading...' : 'Choose File'}
                                </label>
                            </>
                        )}
                    </div>
                ))}

                <div className="flex justify-between pt-4">
                    <button type="button" onClick={() => setStep(2)} className="text-slate-500 font-medium flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                        onClick={handleFinish}
                        disabled={!isComplete}
                        className="bg-electric-teal text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-electric-teal/20"
                    >
                        Submit Application
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10" />
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-deep-slate-blue text-white' : 'bg-slate-200 text-slate-500'
                            }`}
                    >
                        {s}
                    </div>
                ))}
            </div>

            {step === 1 && <PersonalForm />}
            {step === 2 && <VehicleForm />}
            {step === 3 && <VerificationStep />}
        </div>
    );
}
