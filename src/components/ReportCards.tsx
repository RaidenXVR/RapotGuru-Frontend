import { Button } from "@material-tailwind/react";
import ReportList from "./ReportList";
import { useNavigate } from "react-router-dom";

export default function ReportCards() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    {/* Title & Description */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Manajemen Rapot
                            </h1>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base max-w-md">
                            Kelola dan pantau semua rapot siswa dengan mudah dan efisien
                        </p>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                        <Button
                            onClick={() => navigate('/report-cards/new', { state: { prevData: null } })}
                            className="
                                group relative overflow-hidden
                                bg-gradient-to-r from-green-500 to-emerald-600
                                hover:from-green-600 hover:to-emerald-700
                                shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30
                                text-white font-semibold
                                px-6 py-3 rounded-xl
                                transition-all duration-300 ease-out
                                transform hover:-translate-y-0.5 hover:scale-105
                                focus:ring-4 focus:ring-green-200
                                border-0
                            "
                        >
                            <div className="flex items-center gap-2">
                                {/* Plus Icon */}
                                <div className="
                                    w-5 h-5 rounded-full bg-white/20 
                                    flex items-center justify-center
                                    group-hover:rotate-90 transition-transform duration-300
                                ">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-sm sm:text-base">Tambah Rapot</span>
                            </div>

                            {/* Shimmer Effect */}
                            <div className="
                                absolute inset-0 -top-40 -bottom-40
                                bg-gradient-to-r from-transparent via-white/10 to-transparent
                                transform -skew-x-12 -translate-x-full
                                group-hover:translate-x-full
                                transition-transform duration-1000 ease-out
                            " />
                        </Button>
                    </div>
                </div>


                {/* Report List Container */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                    <div className="p-6 border-b border-gray-200/50">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                            Daftar Rapot
                        </h2>
                    </div>
                    <div className="p-6">
                        <ReportList />
                    </div>
                </div>
            </div>
        </div>
    );
}