import type { Student } from "../types/Student";
import type { ReportData } from '../types/Report';
import type { Subject } from "../types/Subject";
import type { CP } from "../types/CP";
import type { Extra } from "../types/Extra";
import type { ExtraMark, SubjectMarks } from "../types/MarkTypes";
import type { NotesAttendance } from "../types/NotesAttendance";
import type { User } from "../types/User";
import type { School } from "../types/School";


export let users: User[] = [
    { nip: "123456789", name: "Budi Santoso", npsn: "12345678", username: "budisantoso", password: "password123" },
    { nip: "987654321", name: "N. Imas Susilawati", npsn: "87654321", username: "susilawatiimas", password: "password456" },
]

export let schools: School[] = [
    {
        dinasPendidikan: "Dinas Pendidikan Kota A",
        satuanPendidikan: "SMA Negeri 1 Kota A",
        npsn: "12345678",
        nss: "9876543210",
        alamat: "Jl. Pendidikan No.1",
        desa: "Desa Maju",
        kecamatan: "Kecamatan Belajar",
        kabupaten: "Kabupaten Semangat",
        provinsi: "Provinsi Ilmu",
        kodePos: "12345",
        website: "http://sman1kotaa.sch.id",
        email: "info@sman1kotaa.sch.id",
        telp: "021-1234567",
        kepalaSekolah: "Asep Hidayat",
        nipKepalaSekolah: "123456789"
    },
    {
        dinasPendidikan: "Dinas Pendidikan Kabupaten B",
        satuanPendidikan: "SMP Negeri 2 Kabupaten B",
        npsn: "87654321",
        nss: "0123456789",
        alamat: "Jl. Pelajar No.2",
        desa: "Desa Pintar",
        kecamatan: "Kecamatan Kreatif",
        kabupaten: "Kabupaten Inspirasi",
        provinsi: "Provinsi Pengetahuan",
        kodePos: "67890",
        website: "http://smpn2kabupatenb.sch.id",
        email: "contact@smpn2kabupatenb.sch.id",
        telp: "022-7654321",
        kepalaSekolah: "Hendri Prabowo",
        nipKepalaSekolah: "987654321"
    }
]

export let reports: ReportData[] = [
    {
        report_id: "1234",
        class: "1A",
        phase: "A",
        semester: "1",
        school_year: "2024/2025",
        deadline: "18-06-2025",
        nip: "123456789"
    },
    {
        report_id: "4321",
        class: "1B",
        phase: "A",
        semester: "1",
        school_year: "2024/2025",
        deadline: "18-06-2025",
        nip: "123456789"
    }
]

export let students: Student[] = [
    {
        student_id: "S001",
        name: "Budi",
        nis: "2023001",
        nisn: "1234567890",
        birthday: "2010-01-15",
        gender: "Male",
        religion: "Islam",
        prev_edu: "TK A",
        address: "Jl. Merdeka No. 10",
        father_name: "Budi Santoso",
        father_job: "PNS",
        mother_name: "Siti Aminah",
        mother_job: "Guru",
        parent_address: "Jl. Merdeka No. 10",
        village: "Karanganyar",
        sub_dis: "Ngaglik",
        regen: "Sleman",
        prov: "DI Yogyakarta",
        guardian_name: "",
        guardian_job: "",
        guardian_address: "",
        phone_num: "081234567890",
        report_id: "1234",
    },
    {
        student_id: "S002",
        name: "Cica",
        nis: "2023002",
        nisn: "1234567891",
        birthday: "2010-05-20",
        gender: "Female",
        religion: "Kristen",
        prev_edu: "TK B",
        address: "Jl. Melati No. 5",
        father_name: "Andi Wijaya",
        father_job: "Wiraswasta",
        mother_name: "Dewi Lestari",
        mother_job: "Ibu Rumah Tangga",
        parent_address: "Jl. Melati No. 5",
        village: "Sukoharjo",
        sub_dis: "Godean",
        regen: "Sleman",
        prov: "DI Yogyakarta",
        guardian_name: "Tono",
        guardian_job: "Petani",
        guardian_address: "Jl. Melati No. 6",
        phone_num: "081234567891",
        report_id: "1234",
    },
    {
        student_id: "S003",
        name: "Rudi",
        nis: "2023003",
        nisn: "1234567892",
        birthday: "2009-11-10",
        gender: "Male",
        religion: "Hindu",
        prev_edu: "PAUD Mawar",
        address: "Jl. Kenanga No. 12",
        father_name: "Ketut Darma",
        father_job: "Petani",
        mother_name: "Ni Luh Ayu",
        mother_job: "Ibu Rumah Tangga",
        parent_address: "Jl. Kenanga No. 12",
        village: "Pengosekan",
        sub_dis: "Ubud",
        regen: "Gianyar",
        prov: "Bali",
        guardian_name: "",
        guardian_job: "",
        guardian_address: "",
        phone_num: "081234567892",
        report_id: "1234",
    },
];

export let subjects: Subject[] = [
    {
        subject_id: "SUB001",
        subject_name: "Matematika",
        subject_category: "Kelompok A",
        min_mark: 70,
        report_id: "1234",
    },
    {
        subject_id: "SUB002",
        subject_name: "Bahasa Indonesia",
        subject_category: "Kelompok A",
        min_mark: 70,
        report_id: "1234",
    },
    {
        subject_id: "SUB003",
        subject_name: "Ilmu Pengetahuan Alam",
        subject_category: "Kelompok A",
        min_mark: 70,
        report_id: "1234",
    },
    {
        subject_id: "SUB004",
        subject_name: "Pendidikan Pancasila dan Kewarganegaraan",
        subject_category: "Kelompok B",
        min_mark: 68,
        report_id: "1234",
    },
    {
        subject_id: "SUB005",
        subject_name: "Seni Budaya",
        subject_category: "Kelompok B",
        min_mark: 68,
        report_id: "1234",
    },
    {
        subject_id: "SUB006",
        subject_name: "Bahasa Jawa",
        subject_category: "Muatan Lokal",
        min_mark: 65,
        report_id: "1234",
    },
];

export let cps: CP[] = [
    {
        cp_id: "af87-76ab",
        cp_num: "1.1",
        cp_desc: "Description of CP1",
        subject_id: "SUB001"

    },
    {
        cp_id: "af87-df31",
        cp_num: "1.2",
        cp_desc: "Description of CP2",
        subject_id: "SUB001"

    },
    {
        cp_id: "af87-54da",
        cp_num: "1.3",
        cp_desc: "Description of CP3",
        subject_id: "SUB001"

    }

]

export let subject_marks: {
    mark_id: string;
    value: number;
    student_id: string;
    subject_id: string;
    cp_id?: string; // present if CP mark
    type?: 'test' | 'non_test'; // present if test/non_test mark
}[] = [
        // CP marks for subject SUB001
        { mark_id: "m1", value: 85, student_id: "S001", subject_id: "SUB001", cp_id: "af87-76ab" },
        { mark_id: "m2", value: 78, student_id: "S002", subject_id: "SUB001", cp_id: "af87-76ab" },
        { mark_id: "m3", value: 92, student_id: "S003", subject_id: "SUB001", cp_id: "af87-76ab" },

        { mark_id: "m4", value: 88, student_id: "S001", subject_id: "SUB001", cp_id: "af87-df31" },
        { mark_id: "m5", value: 74, student_id: "S002", subject_id: "SUB001", cp_id: "af87-df31" },
        { mark_id: "m6", value: 90, student_id: "S003", subject_id: "SUB001", cp_id: "af87-df31" },

        { mark_id: "m7", value: 91, student_id: "S001", subject_id: "SUB001", cp_id: "af87-54da" },
        { mark_id: "m8", value: 80, student_id: "S002", subject_id: "SUB001", cp_id: "af87-54da" },
        { mark_id: "m9", value: 87, student_id: "S003", subject_id: "SUB001", cp_id: "af87-54da" },

        // Other marks for subject SUB001
        { mark_id: "m10", value: 82, student_id: "S001", subject_id: "SUB001", type: "test" },
        { mark_id: "m11", value: 75, student_id: "S002", subject_id: "SUB001", type: "test" },
        { mark_id: "m12", value: 89, student_id: "S003", subject_id: "SUB001", type: "test" },

        { mark_id: "m13", value: 80, student_id: "S001", subject_id: "SUB001", type: "non_test" },
        { mark_id: "m14", value: 77, student_id: "S002", subject_id: "SUB001", type: "non_test" },
        { mark_id: "m15", value: 85, student_id: "S003", subject_id: "SUB001", type: "non_test" }
    ];

export let notes_attendance: NotesAttendance[] = [
    {
        id: "na1",
        report_id: "1234",
        student_id: "S001",
        notes: "Siswa aktif dan rajin.",
        sick: 2,
        leave: 1,
        alpha: 0
    },
    {
        id: "na2",
        report_id: "1234",
        student_id: "S002",
        notes: "Perlu meningkatkan kehadiran.",
        sick: 1,
        leave: 0,
        alpha: 2
    },
    {
        id: "na3",
        report_id: "1234",
        student_id: "S003",
        notes: "Siswa disiplin dan hadir penuh.",
        sick: 0,
        leave: 0,
        alpha: 0
    }
];

export let extras: Extra[] = []

export let extra_marks: ExtraMark[] = []