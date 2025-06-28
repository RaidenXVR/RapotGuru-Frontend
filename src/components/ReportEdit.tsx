import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import type { ReportData } from '../types/Report';
import { useUser } from '../context/userContext';
import { setReportByUser } from '../api/reportApi';

export default function ReportEdit() {
    const location = useLocation();
    const prevData: ReportData | undefined = location.state.prevData;
    const { user } = useUser();
    const [reportClass, setReportClass] = useState(prevData?.class || "");
    const [phase, setPhase] = useState(prevData?.phase || "");
    const [semester, setSemester] = useState(prevData?.semester || "");
    const [schoolYear, setSchoolYear] = useState(prevData?.school_year || "");
    const [deadline, setDeadline] = useState(prevData?.deadline || "");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const isFormValid = reportClass !== "" && phase !== "" && semester !== "" && schoolYear !== "" && deadline !== "";

    const onReportSaved = () => {
        setLoading(true);
        const reportData: ReportData = {
            report_id: prevData?.report_id || "",
            class: reportClass,
            phase: phase,
            semester: semester,
            school_year: schoolYear,
            deadline: deadline,
            nip: user!.nip
        };

        console.log(user, "user data");
        setReportByUser(reportData, user!.nip)
            .then(() => {
                navigate('..');
            })
            .catch((err) => {
                console.error(err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const formFields = [
        {
            label: "Kelas",
            value: reportClass,
            onChange: setReportClass,
            type: "text",
            placeholder: "Contoh: 7, 8, 9",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            label: "Fase",
            value: phase,
            onChange: setPhase,
            type: "text",
            placeholder: "Contoh: A, B",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            label: "Semester",
            value: semester,
            onChange: setSemester,
            type: "text",
            placeholder: "Contoh: 1, 2",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            label: "Tahun Pelajaran",
            value: schoolYear,
            onChange: setSchoolYear,
            type: "text",
            placeholder: "Contoh: 2024/2025",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            label: "Titi Mangsa",
            value: deadline,
            onChange: setDeadline,
            type: "text",
            placeholder: "Contoh: 20 Desember 2024",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => navigate('..')}
                            className="p-2 hover:bg-white/50 rounded-xl transition-colors duration-200"
                            title="Kembali ke halaman sebelumnya"
                            aria-label="Kembali ke halaman sebelumnya"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {prevData ? 'Edit Rapot' : 'Tambah Rapot Baru'}
                            </h1>
                            <p className="text-gray-600">
                                {prevData ? `Mengubah data rapot ${prevData.report_id}` : 'Isi formulir untuk membuat rapot baru'}
                            </p>
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Data Rapot
                        </span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-400">Data Siswa</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-400">Nilai</span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden mb-6">
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500 rounded-xl">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Informasi Rapot</h2>
                                <p className="text-sm text-gray-600">Lengkapi data dasar untuk rapot ini</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {formFields.map((field, index) => (
                                <div key={index} className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <span className="text-blue-500">{field.icon}</span>
                                        {field.label}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={field.type}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            placeholder={field.placeholder}
                                            className="
                                                w-full px-4 py-3 
                                                bg-gray-50 border border-gray-200 rounded-xl
                                                text-gray-900 placeholder-gray-500
                                                focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                                transition-all duration-200
                                                hover:border-gray-300
                                            "
                                        />
                                        {field.value && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Form Validation Status */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                {isFormValid ? (
                                    <>
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-green-700 font-medium">Form sudah lengkap dan siap disimpan</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-yellow-700 font-medium">Mohon lengkapi semua field yang diperlukan</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => navigate('..')}
                        className="
                            px-8 py-3 rounded-xl font-semibold
                            bg-gray-100 text-gray-700 hover:bg-gray-200
                            border border-gray-200 hover:border-gray-300
                            transition-all duration-200
                            focus:ring-2 focus:ring-gray-300
                        "
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Kembali
                        </div>
                    </Button>

                    <Button
                        onClick={onReportSaved}
                        disabled={!isFormValid || loading}
                        className={`
                            px-8 py-3 rounded-xl font-semibold text-white
                            transition-all duration-200 transform
                            focus:ring-4 focus:ring-green-200
                            ${isFormValid && !loading
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5'
                                : 'bg-gray-400 cursor-not-allowed'
                            }
                        `}
                    >
                        <div className="flex items-center gap-2">
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </div>
                    </Button>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-2xl">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-red-900 mb-2">Terjadi Kesalahan</h3>
                                <p className="text-red-700 mb-4">
                                    Maaf, terjadi kesalahan saat menyimpan data. Silakan periksa koneksi internet Anda dan coba lagi.
                                </p>
                                <button
                                    onClick={() => setError(false)}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium underline"
                                >
                                    Tutup pesan ini
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}