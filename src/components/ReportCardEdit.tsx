import { Button, Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import type { Student } from "../types/Student";
import { useNavigate, useParams } from "react-router-dom";
import type { ReportData } from "../types/Report";
import { getReportById, getStudentsByReport } from "../api/reportApi";


export default function ReportCardEdit() {

    const { report_id } = useParams();
    const [report, setReport] = useState<ReportData>();
    const [students, setStudents] = useState<Student[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getReportById(report_id!).then((res) => {
            setReport(res);
            getStudentsByReport(report_id!).then((val) => {
                setStudents(val);
            })
        })
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className="flex-1/2  m-4 object-top-left">
                    <Typography className="justify-center align-middle">
                        <h1>
                            <strong>Profil Rapot</strong>
                        </h1>
                    </Typography>
                    <div
                        className="relative flex flex-col w-full h-fit overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                        <table className="w-full text-left table-auto min-w-max">
                            <tbody>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <strong>Kelas</strong>
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {report?.class}
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <strong>Fase</strong>
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {report?.phase}
                                        </p>
                                    </td>
                                </tr>

                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <strong>Semester</strong>
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {report?.semester}
                                        </p>
                                    </td>
                                </tr>

                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <strong>Tahun Pelajaran</strong>
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {report?.school_year}
                                        </p>
                                    </td>
                                </tr>

                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <strong>Titi Mangsa Rapot</strong>
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {report?.deadline}
                                        </p>
                                    </td>
                                </tr>

                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <strong>Jumlah Siswa</strong>
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {students.length}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex-1/2  m-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="m-4 p-3 w-full">
                            <Button className="p-3 w-full" onClick={() => navigate(`/report-cards/edit/${report_id}/subjects`, { state: { report_id: report_id } })}>
                                <p>Edit Data Mata Pelajaran</p>
                            </Button>
                        </Card>
                        <Card className="m-4 p-3 w-full">
                            <Button className="p-3 w-full"
                                onClick={() => navigate(`/report-cards/edit/${report_id}/extras`, { state: { report_id: report_id } })}
                            >
                                <p>Edit Data Ekstrakulikuler</p>
                            </Button>
                        </Card>
                        <Card className="m-4 p-3 w-full">
                            <Button className="p-3 w-full"
                                onClick={() => navigate(`/report-cards/edit/${report_id}/students`, { state: { report_id: report_id } })}

                            >
                                <p>Edit Data Siswa</p>
                            </Button>
                        </Card>
                        <Card className="m-4 p-3 w-full">
                            <Button className="p-3 w-full"
                                onClick={() => navigate(`/report-cards/edit/${report_id}/subject-marks`, { state: { report_id } })}
                            >
                                <p>Input Nilai Siswa</p>
                            </Button>
                        </Card>
                        <Card className="m-4 p-3 w-full">
                            <Button className="p-3 w-full"
                                onClick={() => navigate(`/report-cards/edit/${report_id}/notes`, { state: { report_id } })}
                            >
                                <p>Edit Absensi dan Catatan Siswa</p>
                            </Button>
                        </Card>
                        <Card className="m-4 p-3 w-full">
                            <Button className="p-3 w-full"
                                onClick={() => navigate(`/report-cards/edit`, { state: { prevData: report } })}
                            >
                                <p>Edit Data Rapot</p>
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex justify-start m-4">
                <Button className="bg-blue-500 p-3"
                    onClick={() => navigate('/report-cards')}
                >
                    Kembali
                </Button>

            </div>
        </div>
    );
}