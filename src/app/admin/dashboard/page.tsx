import AdminLayout from "@/components/admin/AdminLayout";
import VerificationQueue from "@/components/admin/VerificationQueue";
import { Users, Car, AlertCircle } from "lucide-react";

export default function AdminDashboardPage() {
    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-deep-slate-blue">Admin Dashboard</h1>
                <p className="text-slate-500">Overview of platform activity.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Total Users</p>
                        <p className="text-2xl font-bold text-deep-slate-blue">1,240</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-xl">
                        <Car className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Active Drivers</p>
                        <p className="text-2xl font-bold text-deep-slate-blue">85</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <AlertCircle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Pending Approvals</p>
                        <p className="text-2xl font-bold text-deep-slate-blue">2</p>
                    </div>
                </div>
            </div>

            <VerificationQueue />
        </AdminLayout>
    );
}
