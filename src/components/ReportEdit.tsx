
import React from 'react';

import type { ReportData } from '../types/Report';
import { useUser } from '../context/userContext';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, Button, Typography, Card } from '@material-tailwind/react';
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
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const isFormValid = reportClass !== "" && phase !== "" && semester !== "" && schoolYear !== "" && deadline !== "";


    const onReportSaved = () => {


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
        setReportByUser(reportData, user!.nip,)
            .then(() => {
                navigate('..');
            })
            .catch((err) => {
                console.error(err);
                setError(true);
            });
    }

    return (
        <div className="flex-1/2  m-4 object-top-right">
            <Typography className="justify-center align-middle">
                <h1>
                    <strong>Edit Profil Guru</strong>
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
                                <Input className="rounded-lg p-2" onChange={(e) => setReportClass(e.target.value)}
                                    value={reportClass}
                                />
                            </td>
                        </tr>
                        <tr className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    <strong>Fase</strong>
                                </p>
                            </td>
                            <td className="p-4">
                                <Input className="rounded-lg p-2" onChange={(e) => setPhase(e.target.value)}
                                    value={phase}
                                />

                            </td>
                        </tr>
                        <tr className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    <strong>Semester</strong>
                                </p>
                            </td>
                            <td className="p-4">
                                <Input className="rounded-lg p-2" onChange={(e) => setSemester(e.target.value)}
                                    value={semester}
                                />
                            </td>
                        </tr>
                        <tr className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    <strong>Tahun Pelajaran</strong>
                                </p>
                            </td>
                            <td className="p-4">
                                <Input className="rounded-lg p-2" onChange={(e) => setSchoolYear(e.target.value)}
                                    value={schoolYear}
                                />
                            </td>
                        </tr>
                        <tr className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    <strong>Titi Mangsa</strong>
                                </p>
                            </td>
                            <td className="p-4">
                                <Input className="rounded-lg p-2" onChange={(e) => setDeadline(e.target.value)}
                                    value={deadline}
                                    type="date"
                                />
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="w-full m-2 justify-evenly flex p-3">
                <Button className={`p-3  ${!isFormValid ?
                    "bg-gray-400" : "bg-green-500"}`}
                    disabled={!isFormValid}
                    onClick={onReportSaved}>
                    <p>Simpan Perubahan</p>
                </Button>
                <Button className="p-3 bg-blue-500" onClick={() => { navigate('..') }}>
                    <p>Kembali Ke List Rapot</p>
                </Button>
            </div>
            {error ?
                (<Card className="m-2 p-4 bg-red-400">

                    <Typography className="text-center">
                        <h1><strong>Terjadi Error!</strong></h1>
                    </Typography>
                    <hr className="m-2"></hr>
                    <Typography>
                        <p>Terjadi kesalahan pada sistem, coba lagi nanti.</p>
                    </Typography>
                </Card>) :
                (<></>)
            }
        </div>
    );
}