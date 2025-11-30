import DashboardLayout from "@/components/driver/DashboardLayout";
import RegistrationWizard from "@/components/driver/RegistrationWizard";
import ReviewRequestGenerator from "@/components/driver/ReviewRequestGenerator";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function DashboardPage() {
    // Mock verification status
    const isVerified = false;

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-deep-slate-blue">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, Driver.</p>
                </div>

                {!isVerified ? (
                    <div className="space-y-6">
                        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-orange-700">Action Required</h3>
                                <p className="text-sm text-orange-600">Please complete your registration to start receiving booking requests.</p>
                            </div>
                        </div>

                        <RegistrationWizard />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="text-slate-500 text-sm font-medium mb-2">Total Earnings</h3>
                                <p className="text-3xl font-bold text-deep-slate-blue">৳12,500</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="text-slate-500 text-sm font-medium mb-2">Active Bookings</h3>
                                <p className="text-3xl font-bold text-electric-teal">3</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="text-slate-500 text-sm font-medium mb-2">Rating</h3>
                                <div className="flex items-center gap-1">
                                    <p className="text-3xl font-bold text-deep-slate-blue">4.9</p>
                                    <CheckCircle className="h-5 w-5 text-electric-teal" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <ReviewRequestGenerator />
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
