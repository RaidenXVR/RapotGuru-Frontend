import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Button, Card, IconButton } from "@material-tailwind/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Subject } from "../types/Subject";
import { useEffect, useState } from "react";
import { getSubjectsByReport, removeSubjectByID } from "../api/reportApi";
import { v4 as uuidv4 } from "uuid";

export default function SubjectsEdit() {
    const params = useParams()
    const report_id: string = params.report_id!;
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        getSubjectsByReport(report_id).then((val) => {
            console.log(report_id)
            setSubjects(val);
            console.log(val)
        })
    }, []);

    const handleNewMaPel = () => {
        const sub: Subject = { subject_id: uuidv4(), subject_name: "", subject_category: "Kelompok A", report_id: report_id, min_mark: 0 }
        navigate(`/report-cards/edit/${report_id}/subjects/edit`, {
            state: { subjects: subjects, currentSubject: sub, report_id: report_id }
        }
        )

    }

    const handleSubjectDelete = (subject: Subject) => {
        removeSubjectByID(subject.subject_id).then((val) => {
            if (val) {
                setSubjects(prev => prev.filter((val) => val.subject_id !== subject.subject_id));

            }
        })
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <Card className="m-4">
                    <Button className="p-3 bg-green-600"
                        onClick={handleNewMaPel}
                    >
                        <p>Tambah Mata Pelajaran</p>
                    </Button>
                </Card>
                <Card className="m-4">
                    <Button className="p-3 bg-blue-600"
                        onClick={() => navigate(`..`)}
                    >
                        <p>Kembali</p>
                    </Button>
                </Card>
            </div>
            <div
                className="relative flex flex-col m-4 w-screen h-fit overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">

                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    No.
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Nama Mata Pelajaran
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    KKM
                                </p>
                            </th>

                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Kategori
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Edit Mata Pelajaran dan CP
                                </p>
                            </th>

                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Hapus Mata Pelajaran
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{subjects.length !== 0 ? (subjects.map((sub, idx) => (
                        < tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200 py-5">
                                <p className="block font-semibold text-sm text-slate-800">{idx + 1}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200 py-5">
                                <p className="text-sm text-slate-500">{sub.subject_name}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200 py-5">
                                <p className="text-sm text-slate-500">{sub.min_mark}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200 py-5">
                                <p className="text-sm text-slate-500">{sub.subject_category}</p>
                            </td>
                            <td className="border-b border-slate-200">
                                <IconButton className="bg-green-500 w-12 h-12 content-center"
                                    onClick={() => navigate(`/report-cards/edit/${sub.report_id}/subjects/edit`, { state: { subjects: subjects, currentSubject: sub, report_id: report_id } })}
                                >
                                    <PencilSquareIcon className="h-8 w-8" color="white"
                                    />
                                </IconButton>

                            </td>
                            <td className="p-4 border-b border-slate-200 py-5">
                                <IconButton className="bg-red-500 w-12 h-12"
                                    onClick={() => handleSubjectDelete(sub)}>
                                    <TrashIcon className="w-8 h-8" color="white" />
                                </IconButton>
                            </td>

                        </tr>
                    ))) :
                        (<tr>
                            <td className="p-4 border-b border-slate-200 py-5">
                                <h1>
                                    Belum ada data mata pelajaran.
                                </h1>
                            </td>
                        </tr>)

                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}