export type Subject = {
    subject_id: string;
    subject_name: string;
    subject_category: "Kelompok A" | "Kelompok B" | "Muatan Lokal";
    min_mark: number;
    report_id: string;
}