import { useState } from "react";

export default function ReportHistory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");

    // Sample data - replace with actual data
    const reportData = [
        {
            id: "R001A-20240503",
            kelas: "1A",
            fase: "A",
            semester: "Ganjil",
            tahun: "2024/2025",
            titiMangsa: "2024-08-15",
            status: "completed"
        },
        {
            id: "R002B-20240404",
            kelas: "1B",
            fase: "A", 
            semester: "Genap",
            tahun: "2023/2024",
            titiMangsa: "2024-03-20",
            status: "completed"
        },
        {
            id: "R003A-20240305",
            kelas: "2A",
            fase: "B",
            semester: "Ganjil",
            tahun: "2023/2024",
            titiMangsa: "2023-12-15",
            status: "draft"
        }
    ];

    const filteredData = reportData.filter(report => 
        report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.kelas.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            completed: { bg: "bg-green-100", text: "text-green-800", label: "Selesai", icon: "✅" },
            draft: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Draft", icon: "📝" },
            pending: { bg: "bg-blue-100", text: "text-blue-800", label: "Pending", icon: "⏳" }
        };
        
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        
        return (
            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                <span>{config.icon}</span>
                <span>{config.label}</span>
            </span>
        );
    };

    return (
        <div className="flex-1 m-2 sm:m-4 lg:m-6">
            {/* Header Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-t-2xl shadow-lg border border-white/50 p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                    {/* Title Section */}
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                Riwayat Rapor
                            </h2>
                            <p className="text-slate-500 text-sm sm:text-base">Kelola dan lihat riwayat rapor siswa</p>
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                        {/* Filter Dropdown */}
                        <select 
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <option value="all">Semua Status</option>
                            <option value="completed">Selesai</option>
                            <option value="draft">Draft</option>
                            <option value="pending">Pending</option>
                        </select>

                        {/* Search Input */}
                        <div className="relative min-w-[250px]">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-4 pr-12 py-2 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                                placeholder="Cari ID rapor atau kelas..."
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400 hover:text-purple-600 transition-colors duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 py-4 bg-white/90 backdrop-blur-sm border-x border-white/50">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-500 rounded-lg">
                            <span className="text-white text-lg">✅</span>
                        </div>
                        <div>
                            <p className="text-green-800 font-semibold text-lg">2</p>
                            <p className="text-green-600 text-sm">Rapor Selesai</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-100">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-500 rounded-lg">
                            <span className="text-white text-lg">📝</span>
                        </div>
                        <div>
                            <p className="text-yellow-800 font-semibold text-lg">1</p>
                            <p className="text-yellow-600 text-sm">Draft</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-500 rounded-lg">
                            <span className="text-white text-lg">📊</span>
                        </div>
                        <div>
                            <p className="text-purple-800 font-semibold text-lg">3</p>
                            <p className="text-purple-600 text-sm">Total Rapor</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-lg border border-white/50 overflow-hidden">
                {/* Mobile Card View */}
                <div className="block lg:hidden">
                    {filteredData.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4 opacity-50">📄</div>
                            <p className="text-slate-500">Tidak ada rapor yang ditemukan</p>
                        </div>
                    ) : (
                        <div className="space-y-4 p-4">
                            {filteredData.map((report, index) => (
                                <div key={index} className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all duration-300">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-semibold text-slate-800">{report.id}</h4>
                                        {getStatusBadge(report.status)}
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-slate-500">Kelas:</span>
                                            <span className="ml-2 font-medium text-slate-700">{report.kelas}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">Fase:</span>
                                            <span className="ml-2 font-medium text-slate-700">{report.fase}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">Semester:</span>
                                            <span className="ml-2 font-medium text-slate-700">{report.semester}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">Tahun:</span>
                                            <span className="ml-2 font-medium text-slate-700">{report.tahun}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-slate-200">
                                        <span className="text-slate-500 text-xs">Dibuat: </span>
                                        <span className="font-medium text-slate-700 text-xs">{report.titiMangsa}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop Table View */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <span>ID Rapor</span>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <span>Kelas</span>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <span>Fase</span>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <span>Semester</span>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <span>Tahun</span>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <span>Tanggal Dibuat</span>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <span>Status</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12">
                                        <div className="text-6xl mb-4 opacity-50">📄</div>
                                        <p className="text-slate-500">Tidak ada rapor yang ditemukan</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((report, index) => (
                                    <tr key={index} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 group">
                                        <td className="p-4 border-b border-slate-100">
                                            <div className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors duration-300">
                                                {report.id}
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-slate-100">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                                                {report.kelas}
                                            </span>
                                        </td>
                                        <td className="p-4 border-b border-slate-100">
                                            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-sm font-medium">
                                                Fase {report.fase}
                                            </span>
                                        </td>
                                        <td className="p-4 border-b border-slate-100 text-slate-600">
                                            {report.semester}
                                        </td>
                                        <td className="p-4 border-b border-slate-100 text-slate-600">
                                            {report.tahun}
                                        </td>
                                        <td className="p-4 border-b border-slate-100 text-slate-600">
                                            {report.titiMangsa}
                                        </td>
                                        <td className="p-4 border-b border-slate-100">
                                            {getStatusBadge(report.status)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer with Actions */}
                {filteredData.length > 0 && (
                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-4 py-3 border-t border-slate-200">
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                            <p className="text-sm text-slate-600">
                                Menampilkan {filteredData.length} dari {reportData.length} rapor
                            </p>
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                                    Export Data
                                </button>
                                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md">
                                    Cetak Laporan
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}