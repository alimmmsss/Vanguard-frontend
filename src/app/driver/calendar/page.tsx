import DashboardLayout from "@/components/driver/DashboardLayout";
import CalendarManager from "@/components/driver/CalendarManager";

export default function CalendarPage() {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-deep-slate-blue">Calendar</h1>
                    <p className="text-slate-500">Manage your vehicle availability.</p>
                </div>

                <CalendarManager />
            </div>
        </DashboardLayout>
    );
}
