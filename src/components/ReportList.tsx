import { PencilIcon, PencilSquareIcon, PrinterIcon } from "@heroicons/react/16/solid";
import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import type { ReportData } from "../types/Report";
import { useNavigate } from "react-router-dom";
import { getReportsByUser } from "../api/reportApi";
import { useUser } from "../context/userContext";

export default function ReportList() {
    const [reports, setReports] = useState<ReportData[]>([]);
    const [filteredReports, setFilteredReports] = useState<ReportData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        getReportsByUser(user!.nip).then((val) => {
            setReports(val);
            setFilteredReports(val);
            console.log("Reports: ", val);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setError("Error fetching Reports.");
            setLoading(false);
        });
    }, []);

    // Filter reports based on search term
    useEffect(() => {
        const filtered = reports.filter(report =>
            report.report_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.phase.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.school_year.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredReports(filtered);
    }, [searchTerm, reports]);

    const getStatusBadge = (deadline: string) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const daysLeft = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
        
        if (daysLeft < 0) {
            return <span className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">Terlambat</span>;
        } else if (daysLeft <= 7) {
            return <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">Segera</span>;
        } else {
            return <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">Normal</span>;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-gray-600 text-sm">Memuat data rapot...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Terjadi Kesalahan</h3>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="
                            w-full pl-10 pr-4 py-3 
                            bg-white border border-gray-200 rounded-xl
                            text-gray-900 placeholder-gray-500
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition-all duration-200
                            shadow-sm hover:shadow-md focus:shadow-lg
                        "
                        placeholder="Cari rapot berdasarkan ID, kelas, fase..."
                    />
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                    Menampilkan {filteredReports.length} dari {reports.length} rapot
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {filteredReports.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada rapot ditemukan</h3>
                        <p className="text-gray-600">Coba ubah kata kunci pencarian atau tambah rapot baru</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        ID Rapot
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Kelas
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Fase
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Tahun Ajaran
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Semester
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredReports.map((rep, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors duration-150">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                                                <span className="font-semibold text-gray-900 text-sm">
                                                    {rep.report_id}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                {rep.class}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-700">
                                                {rep.phase}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">
                                                {rep.school_year}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                                Semester {rep.semester}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                {getStatusBadge(rep.deadline)}
                                                <span className="text-xs text-gray-500">
                                                    {new Date(rep.deadline).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => navigate(`/report-cards/edit/${rep.report_id}`)}
                                                    className="
                                                        group relative p-2 rounded-xl
                                                        bg-gradient-to-r from-green-500 to-emerald-600
                                                        hover:from-green-600 hover:to-emerald-700
                                                        text-white shadow-lg shadow-green-500/25
                                                        hover:shadow-xl hover:shadow-green-500/30
                                                        transform hover:-translate-y-0.5 hover:scale-105
                                                        transition-all duration-200
                                                        focus:ring-2 focus:ring-green-300
                                                    "
                                                    title="Edit Rapot"
                                                >
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </button>

                                                {/* Print Button */}
                                                <button
                                                    onClick={() => navigate(`/report-cards/edit/${rep.report_id}/print`)}
                                                    className="
                                                        group relative p-2 rounded-xl
                                                        bg-gradient-to-r from-blue-500 to-cyan-600
                                                        hover:from-blue-600 hover:to-cyan-700
                                                        text-white shadow-lg shadow-blue-500/25
                                                        hover:shadow-xl hover:shadow-blue-500/30
                                                        transform hover:-translate-y-0.5 hover:scale-105
                                                        transition-all duration-200
                                                        focus:ring-2 focus:ring-blue-300
                                                    "
                                                    title="Cetak Rapot"
                                                >
                                                    <PrinterIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer Info */}
            {filteredReports.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Klik tombol edit untuk mengubah atau tombol print untuk mencetak rapot</span>
                    </div>
                </div>
            )}
        </div>
    );
}