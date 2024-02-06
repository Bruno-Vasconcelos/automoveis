export interface CarUsage {
    id: number;
    start_date: string;
    end_date: string | null;
    reason: string;
    driver_name: string;
    license_plate: string;
    color: string;
    brand: string;
}