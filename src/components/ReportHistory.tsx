import React, { useEffect, useState } from 'react';
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
    }, [])


    return (<div className="flex-1/2 m-4 object-top-left">
        <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
            <div>
                <h3 className="text-lg font-semibold text-slate-800">History Rapot</h3>
                <p className="text-slate-500">Rapot-rapot terdahulu.</p>
            </div>

        </div>

        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <table className="w-full text-left table-auto min-w-max">
                <thead>
                    <tr>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">
                                ID Rapot
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">
                                Kelas
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">
                                Fase
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">
                                Semester
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">
                                Tahun                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">
                                Titi Mangsa                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.report_id}>
                            <td className="p-4 border-b border-slate-300">
                                <p className="block text-sm font-normal leading-none text-slate-700">
                                    {report.report_id}
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-300">
                                <p className="block text-sm font-normal leading-none text-slate-700">
                                    {report.class}
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-300">
                                <p className="block text-sm font-normal leading-none text-slate-700">
                                    {report.phase}
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-300">
                                <p className="block text-sm font-normal leading-none text-slate-700">
                                    {report.semester}
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-300">
                                <p className="block text-sm font-normal leading-none text-slate-700">
                                    {report.school_year}
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-300">
                                <p className="block text-sm font-normal leading-none text-slate-700">
                                    {report.deadline}
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>);
}