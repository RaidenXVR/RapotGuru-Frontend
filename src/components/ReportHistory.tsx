
import { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';
import { getReportsByUser } from '../api/reportApi';
import type { ReportData } from '../types/Report';


export default function ReportHistory() {
    const { user } = useUser();

    const [reports, setReports] = useState<ReportData[]>([]);
    useEffect(() => {
        if (user) {
            getReportsByUser(user.nip).then((data) => {
                setReports(data);
            })
        }
    }, []);






    return (<div className="flex-1/2 m-4 object-top-left">
        <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
            <div>
                <h3 className="text-lg font-semibold text-slate-800">History Rapot</h3>
                <p className="text-slate-500">Rapot-rapot terdahulu.</p>
            </div>

        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 py-4 bg-white/90 backdrop-blur-sm border-x border-white/50">

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                        <span className="text-white text-lg">📊</span>
                    </div>
                    <div>
                        <p className="text-purple-800 font-semibold text-lg">{reports.length}</p>
                        <p className="text-purple-600 text-sm">Total Rapor</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Table Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-lg border border-white/50 overflow-hidden">
            {/* Mobile Card View */}
            <div className="block lg:hidden">
                {reports.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4 opacity-50">📄</div>
                        <p className="text-slate-500">Tidak ada rapor yang ditemukan</p>
                    </div>
                ) : (
                    <div className="space-y-4 p-4">
                        {reports.map((report, index) => (
                            <div key={index} className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all duration-300">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-slate-500">Kelas:</span>
                                        <span className="ml-2 font-medium text-slate-700">{report.class}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500">Fase:</span>
                                        <span className="ml-2 font-medium text-slate-700">{report.phase}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500">Semester:</span>
                                        <span className="ml-2 font-medium text-slate-700">{report.semester}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500">Tahun:</span>
                                        <span className="ml-2 font-medium text-slate-700">{report.school_year}</span>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-slate-200">
                                    <span className="text-slate-500 text-xs">Dibuat: </span>
                                    <span className="font-medium text-slate-700 text-xs">{report.deadline}</span>
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
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-12">
                                    <div className="text-6xl mb-4 opacity-50">📄</div>
                                    <p className="text-slate-500">Tidak ada rapor yang ditemukan</p>
                                </td>
                            </tr>
                        ) : (
                            reports.map((report, index) => (
                                <tr key={index} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 group">
                                    <td className="p-4 border-b border-slate-100">
                                        <div className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors duration-300">
                                            {report.report_id}
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-slate-100">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                                            {report.class}
                                        </span>
                                    </td>
                                    <td className="p-4 border-b border-slate-100">
                                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-sm font-medium">
                                            Fase {report.phase}
                                        </span>
                                    </td>
                                    <td className="p-4 border-b border-slate-100 text-slate-600">
                                        {report.semester}
                                    </td>
                                    <td className="p-4 border-b border-slate-100 text-slate-600">
                                        {report.school_year}
                                    </td>
                                    <td className="p-4 border-b border-slate-100 text-slate-600">
                                        {report.deadline}
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


        </div>
    </div>
    );
}