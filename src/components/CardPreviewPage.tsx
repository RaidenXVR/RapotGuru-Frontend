import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { Button, Card, IconButton } from "@material-tailwind/react";
import React, { useState, useEffect, useRef } from "react";
import StudentReportCard, { StudentReportCardPage2 } from "./StudentReportCard";
import type { Student } from "../types/Student";
import type { NotesAttendance } from "../types/NotesAttendance";
import type { ExtraMark, SubjectMarks } from "../types/MarkTypes";
import type { School } from "../types/School";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import type { ReportData } from "../types/Report";
import { getCPsBySubjectIDs, getExtraMarksByExtraIds, getExtrasByReport, getNotesAttendanceByReport, getReportById, getStudentsByReport, getSubjectMarksBySubjectIds, getSubjectsByReport } from "../api/reportApi";
import { getSchoolDataByUserId } from "../api/schoolApi";
import { useUser } from "../context/userContext";
import type { Subject } from "../types/Subject";
import type { Extra } from "../types/Extra";
import type { CP } from "../types/CP";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export default function CardPreviewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { report_id } = useParams();
    const [reportData, setReportData] = useState<ReportData>()
    const [schoolProfile, setSchoolProfile] = useState<School>();
    const { user } = useUser();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [cps, setCPs] = useState<CP[]>([]);
    const [subjectsMark, setSubjectsMark] = useState<SubjectMarks[]>([]);
    const [extras, setExtras] = useState<Extra[]>([]);
    const [extrasMark, setExtrasMark] = useState<ExtraMark[]>([]);
    const [notesAttendance, setNotesAttendance] = useState<NotesAttendance[]>([]);
    const [studentData, setStudentData] = useState<Student[]>([]);
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);

    const handleSavePDF = async () => {
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4",
        });

        // Card 1
        if (card1Ref.current) {
            const canvas1 = await html2canvas(card1Ref.current, {
                scale: 4,
                useCORS: true,
                onclone: (clonedDoc) => {
                    document.fonts.forEach(font => {
                        clonedDoc.fonts.add(font);
                    });
                }
            });
            const imgData1 = canvas1.toDataURL("image/png");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgWidth = pageWidth;
            const imgHeight = (canvas1.height * imgWidth) / canvas1.width;
            pdf.addImage(imgData1, "PNG", 0, 0, imgWidth, imgHeight);
        }

        // Card 2
        if (card2Ref.current) {
            pdf.addPage();
            const canvas2 = await html2canvas(card2Ref.current, {
                scale: 4,
                useCORS: true,
                onclone: (clonedDoc) => {
                    document.fonts.forEach(font => {
                        clonedDoc.fonts.add(font);
                    });
                }
            });
            const imgData2 = canvas2.toDataURL("image/png");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgWidth = pageWidth;
            const imgHeight = (canvas2.height * imgWidth) / canvas2.width;
            pdf.addImage(imgData2, "PNG", 0, 0, imgWidth, imgHeight);
        }

        pdf.save("student-report.pdf");
    };

    const handleSaveAllPDF = async () => {
        if (!studentData.length) return;

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4",
        });

        for (let i = 0; i < studentData.length; i++) {
            const student = studentData[i];
            setCurrentStudent(student);
            // await new Promise((resolve) => setTimeout(resolve, 300)); // Memberi sedikit waktu untuk React merender ulang

            // Card 1
            if (card1Ref.current) {
                const canvas1 = await html2canvas(card1Ref.current, {
                    scale: 4,
                    useCORS: true,
                    onclone: (clonedDoc) => {
                        document.fonts.forEach(font => {
                            clonedDoc.fonts.add(font);
                        });
                    }
                });
                const imgData1 = canvas1.toDataURL("image/png");
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                let imgWidth = pageWidth;
                let imgHeight = (canvas1.height * imgWidth) / canvas1.width;
                if (imgHeight > pageHeight) {
                    imgHeight = pageHeight;
                    imgWidth = (canvas1.width * imgHeight) / canvas1.height;
                }
                pdf.addImage(imgData1, "PNG", 0, 0, imgWidth, imgHeight);
            }

            // Card 2
            if (card2Ref.current) {
                pdf.addPage();
                const canvas2 = await html2canvas(card2Ref.current, {
                    scale: 4,
                    useCORS: true,
                    onclone: (clonedDoc) => {
                        document.fonts.forEach(font => {
                            clonedDoc.fonts.add(font);
                        });
                    }
                });
                const imgData2 = canvas2.toDataURL("image/png");
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                let imgWidth = pageWidth;
                let imgHeight = (canvas2.height * imgWidth) / canvas2.width;
                if (imgHeight > pageHeight) {
                    imgHeight = pageHeight;
                    imgWidth = (canvas2.width * imgHeight) / canvas2.height;
                }
                pdf.addImage(imgData2, "PNG", 0, 0, imgWidth, imgHeight);
            }
        }
        pdf.save("all-students-report.pdf");
    };

    useEffect(() => {
        if (studentData.length > 0) {
            setCurrentStudent(studentData[currentStudentIndex]);
        } else {
            setCurrentStudent(null);
        }
    }, [currentStudentIndex, studentData]);

    useEffect(() => {
        getReportById(report_id!).then((data) => {
            setReportData(data);
        })

        getSchoolDataByUserId(user!.nip).then((data) => {
            setSchoolProfile(data);
        })
        getSubjectsByReport(report_id!).then((data) => {
            if (data) {
                setSubjects(data);
                const subjectIds = data.map(subject => subject.subject_id);
                getSubjectMarksBySubjectIds(subjectIds).then((marks) => {
                    setSubjectsMark(marks);
                })

                getCPsBySubjectIDs(subjectIds).then((cps) => {
                    setCPs(cps);
                })
            }
        })
        getExtrasByReport(report_id!).then((data) => {
            if (data) {
                setExtras(data);
                const extraIds = data.map(extra => extra.extra_id);
                getExtraMarksByExtraIds(extraIds).then((marks) => {
                    setExtrasMark(marks);
                })
            }
        })
        getNotesAttendanceByReport(report_id!).then((data) => {
            setNotesAttendance(data);
        })
        getStudentsByReport(report_id!).then((data) => {
            console.log(data, "student data")
            setStudentData(data);
            setCurrentStudent(data[0]);
            setCurrentStudentIndex(0);


        }).catch(error => {
            console.error("Error fetching data:", error);
            // Handle error, mungkin tampilkan pesan kepada pengguna
        });
    }, []);
    return (
        <div className="min-h-screen bg-blue-gray-50 p-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4 mb-8 bg-white shadow-lg rounded-xl mx-auto max-w-5xl">
                <Button className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" onClick={() => navigate('..')}>
                    Kembali
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" onClick={handleSavePDF}>
                    Simpan Ke PDF (Saat Ini)
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" onClick={handleSaveAllPDF} >
                    Simpan Semua Ke PDF
                </Button>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 mt-8">
                <IconButton className="bg-blue-gray-700 hover:bg-blue-gray-800 text-white p-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
                    onClick={() => setCurrentStudentIndex((prev) => prev - 1 < 0 ? studentData.length - 1 : prev - 1)}>
                    <ArrowLeftCircleIcon className="h-8 w-8" />
                </IconButton>

                <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
                    <div ref={card1Ref} className="shadow-2xl rounded-xl overflow-hidden bg-white border border-gray-200 transform transition-transform duration-300 hover:scale-[1.01]">
                        <Card className="w-[8.5in] h-[11in] flex-shrink-0">
                            {(reportData && schoolProfile && user && subjectsMark && extrasMark && notesAttendance && studentData && currentStudent) &&
                                (< StudentReportCard
                                    student_data={currentStudent}
                                    report_data={reportData}
                                    school_profile={schoolProfile}
                                    subjects={subjects}
                                    cps={cps}
                                    subjects_mark={subjectsMark} />
                                )}
                        </Card>
                    </div>
                    <div ref={card2Ref} className="shadow-2xl rounded-xl overflow-hidden bg-white border border-gray-200 transform transition-transform duration-300 hover:scale-[1.01]">
                        <Card className="w-[8.5in] h-[11in] flex-shrink-0">
                            {(reportData && schoolProfile && user && subjectsMark && extrasMark && notesAttendance && studentData && currentStudent) &&
                                (< StudentReportCardPage2
                                    student_data={currentStudent}
                                    report_data={reportData}
                                    school_profile={schoolProfile}
                                    user={user}
                                    subjects={subjects}
                                    subjects_mark={subjectsMark}
                                    extras={extras}
                                    extras_mark={extrasMark}
                                    notes_attendance={notesAttendance}
                                />
                                )}
                        </Card>
                    </div>
                </div>

                <IconButton className="bg-blue-gray-700 hover:bg-blue-gray-800 text-white p-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
                    onClick={() => setCurrentStudentIndex((prev) => prev + 1 >= studentData.length ? 0 : prev + 1)}>
                    <ArrowRightCircleIcon className="h-8 w-8" />
                </IconButton>
            </div>
        </div>
    )
}