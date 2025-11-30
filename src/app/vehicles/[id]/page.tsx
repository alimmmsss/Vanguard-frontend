import VehicleDetailsClient from '@/components/vehicle/VehicleDetailsClient';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function VehicleDetailsPage({ params }: PageProps) {
    const { id } = await params;

    return <VehicleDetailsClient carId={id} />;
}
