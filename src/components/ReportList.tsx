import { PencilIcon, PencilSquareIcon, PrinterIcon } from "@heroicons/react/16/solid";
import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import type { ReportData } from "../types/Report";
import { useNavigate } from "react-router-dom";
import { getReportsByUser } from "../api/reportApi";
import { useUser } from "../context/userContext";

export default function ReportList() {

    const [reports, setReports] = useState<ReportData[]>([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        getReportsByUser(user!.nip).then((val) => {
            setReports(val);
            console.log("Reports: ", val);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setError("Error fetching Reports.");
            setLoading(false)
        })
    }, [])

    return (<div className="flex-1/2 m-4 object-top-left">
        <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
            <div className="ml-3">
                <div className="w-full max-w-sm min-w-[200px] relative">
                    <div className="relative">
                        <input
                            className=" w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder="Search for invoice..."
                        />
                        <button
                            className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                </div>
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
                                Tahun Ajaran
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">
                                Semester                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">
                                Titi Mangsa
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">
                                Aksi
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>{reports?.map((rep, idx) => (
                    < tr key={idx} className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200 py-5">
                            <p className="block font-semibold text-sm text-slate-800">{rep.report_id}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200 py-5">
                            <p className="text-sm text-slate-500">{rep.class}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200 py-5">
                            <p className="text-sm text-slate-500">{rep.phase}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200 py-5">
                            <p className="text-sm text-slate-500">{rep.school_year}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200 py-5">
                            <p className="text-sm text-slate-500">{rep.semester}</p>
                        </td>

                        <td className="p-4 border-b border-slate-200 py-5">
                            <p className="text-sm text-slate-500">{rep.deadline}</p>
                        </td>
                        <td className="flex gap-3 border-b border-slate-200 mt-2 mb-2">
                            <IconButton
                                variant="ghost"
                                className="bg-green-500 w-12 h-12 content-center"
                                onClick={() => navigate(`/report-cards/edit/${rep.report_id}`)}
                            >
                                <PencilSquareIcon className="h-8 w-8" color="white"
                                />
                            </IconButton>
                            <IconButton
                                onClick={() => navigate(`/report-cards/edit/${rep.report_id}/print`)}
                                variant="ghost"
                                className="bg-blue-500 w-12 h-12">
                                <PrinterIcon className="w-8 h-8" color="white" />
                            </IconButton>

                        </td>
                    </tr>
                ))

                }
                </tbody>
            </table>
        </div>
    </div >);
}