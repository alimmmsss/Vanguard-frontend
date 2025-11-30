import Navbar from "@/components/layout/Navbar";
import SignupForm from "@/components/auth/SignupForm";

export default function DriverRegisterPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
                <SignupForm role="driver" />
            </div>
        </main>
    );
}
