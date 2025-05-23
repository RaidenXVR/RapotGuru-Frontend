import { Button, Card } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Extra } from "../types/Extra";
import { useEffect, useRef, useState } from "react";
import { getExtraMarksByExtra, getExtrasByReport, getStudentsByReport, setExtraMarksToDB, setExtrasToDB } from "../api/reportApi";
import { v4 as uuidv4 } from "uuid";
import SpreadsheetTable, { ColHeaderProps, TableGridRef } from "./SpreadsheetTable";
import { CPTableType, ExtraTableType, ExtraMarkTableType } from "../types/TableTypes";
import { Student } from "../types/Student";
import "../index.css";
import { ExtraMark } from "../types/MarkTypes";

export default function ExtrasEdit() {
    const params = useParams()
    const report_id: string = params.report_id!;
    const [extras, setExtras] = useState<Extra[]>([]);
    const [initExtras, setInitExtras] = useState<ExtraTableType[]>(extras);
    const [tableExtras, setInitTableExtras] = useState<ExtraTableType[]>(initExtras);
    const [savedTableExtras, setSavedTableExtras] = useState<ExtraTableType[]>(initExtras);
    const [_students, setStudents] = useState<Student[]>([]);
    const [studentsColHeaders, setStudentsColHeaders] = useState<ColHeaderProps[]>([{ field: "name", editable: false, dataType: "text", headerName: "Nama Siswa", width: 250, centerHeader: true }])
    const [selectedExtra, setSelectedExtra] = useState<string | null>(null);
    const [initStudents, setInitStudents] = useState<ExtraMarkTableType[]>([]);
    const [marks, setMarks] = useState<{ [extra_name: string]: ExtraMarkTableType[] }>({});
    const [savedMarks, setSavedMarks] = useState<{ [extra_name: string]: ExtraMarkTableType[] }>({});
    const tableRef = useRef<TableGridRef>(null);
    const isInitialMount = useRef(true); // Track initial mount


    const handleAddRow = () => {
        tableRef.current?.addRow();
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false; // Set to false after the first render
            // console.log("called useEffect");
            getExtrasByReport(report_id).then((val) => {
                // console.log("called get extra")
                setExtras(val);
                // console.log(val, "from useeffect set extras");
                getStudentsByReport(report_id).then((st) => {
                    setStudents(st);
                    const s: ExtraMarkTableType[] = st.map((sm) => {
                        return { student_id: sm.student_id, name: sm.name, key: sm.student_id, }
                    })
                    setInitStudents(s);
                    const extraMarks: { [extra_name: string]: ExtraMarkTableType[] } = {}

                    val.forEach((e, idx) => {
                        setInitExtras(prev => [...prev, { extra_id: e.extra_id, name: e.name }]);
                        setInitTableExtras(prev => [...prev, { extra_id: e.extra_id, name: e.name }])

                        getExtraMarksByExtra(e.extra_id).then((emr) => {
                            // console.log(emr, "emr emr")
                            const items = emr.filter((item => item.extra_id === e.extra_id));
                            const stt: ExtraMarkTableType[] = items.map((l) => {
                                return {
                                    student_id: l.student_id,
                                    name: s.find((m) => m.student_id === l.student_id)!.name,
                                    extra_mark_id: l.extra_mark_id,
                                    mark: l.value,
                                    desc: l.desc,
                                    recom: l.recommendation,
                                    extra_id: l.extra_id
                                }
                            })
                            extraMarks[e.name] = stt
                            console.log(extraMarks, "extra marks built", idx)


                            setMarks(prevMarks => ({ ...prevMarks, ...extraMarks }));
                            setSavedMarks(prevMarks => ({ ...prevMarks, ...extraMarks }));

                        });
                    })

                    // console.log(extraMarks, "extramarks outside")
                })
            })
        }
    }, []);

    // const handleExtraDelete = (extra: Extra) => {
    //     removeExtraByID(extra.extra_id).then((val) => {
    //         if (val) {
    //             setExtras(prev => prev.filter((val) => val.extra_id !== extra.extra_id));

    //         }
    //     })
    // }

    const handleTableChange = (updatedData: (CPTableType | ExtraTableType | ExtraMarkTableType)[], isDelete: boolean) => {
        // Save to state, send to server, etc.

        setInitTableExtras(updatedData as ExtraTableType[]);
        if (isDelete) {
            setMarks(prevMarks => {
                let deletedExtraName = null;
                for (const extraName in prevMarks) {
                    if (!updatedData.find(item => (item as ExtraTableType).name === extraName)) {
                        deletedExtraName = extraName;
                        break;
                    }
                }

                if (deletedExtraName) {
                    const newMarks = { ...prevMarks };
                    delete newMarks[deletedExtraName];
                    return newMarks;
                }
                return prevMarks;
            });
        }

        setInitStudents(prevStudents => {
            return prevStudents.map(student => {
                return { ...student, desc: '', mark: 0, recom: '' };
            });
        });
    };

    const handleMarkTableChange = (updatedData: (CPTableType | ExtraTableType | ExtraMarkTableType)[], isDelete: boolean) => {
        const selEx: string = selectedExtra!
        // console.log(selEx);
        const newMarks = marks
        newMarks[selEx] = updatedData as ExtraMarkTableType[]
        setMarks(newMarks);
    }

    const handleRadioChange = (name: string) => {
        console.log(extras)
        setSelectedExtra(name);
        setStudentsColHeaders(prev => {
            if (prev.length === 1) {
                return [
                    ...prev,
                    { field: "mark", editable: true, dataType: "number", headerName: "Nilai", width: 100, centerHeader: true },
                    { field: "desc", editable: true, dataType: "text", headerName: "Deskripsi", width: 500, centerHeader: true },
                    { field: "recom", editable: true, dataType: "text", headerName: "Rekomendasi", width: 400, centerHeader: true }
                ];
            }
            return prev;
        });
        // console.log(marks, "marks");
        // console.log(tableExtras, 'table extras')
        // Load saved marks when radio button is clicked
        setInitStudents(prevStudents => {
            return prevStudents.map(student => {
                const thisSavedMarks: ExtraMarkTableType[] = marks[name];
                // console.log("called set init student")
                if (thisSavedMarks !== undefined && thisSavedMarks.length !== 0) {
                    const markIdx = thisSavedMarks.findIndex((val) => val.student_id === student.student_id);
                    // console.log(thisSavedMarks, "thisSavedMarkss")
                    return {
                        ...student,
                        extra_mark_id: thisSavedMarks[markIdx].extra_mark_id,
                        mark: thisSavedMarks[markIdx].mark ? thisSavedMarks[markIdx].mark : 0,
                        desc: thisSavedMarks[markIdx].desc,
                        recom: thisSavedMarks[markIdx].recom,
                        extra_id: thisSavedMarks[markIdx].extra_id
                    }
                }
                else {

                    return { ...student, desc: '', mark: 0, recom: '' };
                }
            });
        });
    }

    const handleSave = () => {
        console.log(tableExtras, 'table extras')

        if (JSON.stringify(tableExtras) !== JSON.stringify(savedTableExtras)) {
            const newExtras: Extra[] = tableExtras.map((ex) => {
                return { extra_id: ex.extra_id ? ex.extra_id : uuidv4(), name: ex.name, report_id: report_id }
            })
            setExtrasToDB(newExtras).then((val) => {
                if (val) {
                    setSavedTableExtras(tableExtras);
                    // setExtras(newExtras);
                }

            });
            if (JSON.stringify(marks) !== JSON.stringify(savedMarks)) {
                const newMarks: ExtraMark[] = Object.entries(marks).map(([name, studentMarksArray]) => {
                    return studentMarksArray.map((val) => {
                        const theExtra = newExtras.find((c) => c.name === name)
                        console.log(val.extra_mark_id, "the extras in if extras")
                        return { extra_mark_id: val.extra_mark_id ? val.extra_mark_id : uuidv4(), value: Number(val.mark), desc: val.desc, recommendation: val.recom, student_id: val.student_id, extra_id: theExtra?.extra_id, } as ExtraMark
                    })
                }).flat();
                setSavedMarks(marks);
                setExtraMarksToDB(newMarks);
            }
        } else {
            if (JSON.stringify(marks) !== JSON.stringify(savedMarks)) {

                const newMarks: ExtraMark[] = Object.entries(marks).map(([name, studentMarksArray]) => {
                    return studentMarksArray.map((val) => {
                        const theExtra = extras.find((c) => c.name === name)
                        console.log(name, theExtra, "the extras else extras")
                        return { extra_mark_id: val.extra_mark_id ? val.extra_mark_id : uuidv4(), value: Number(val.mark), desc: val.desc, recommendation: val.recom, student_id: val.student_id, extra_id: theExtra?.extra_id, } as ExtraMark
                    })
                }).flat();
                setSavedMarks(marks);
                setExtraMarksToDB(newMarks);
            }
        }

        // don't use initStudent for saving, it needs radio to be updated to change

        // console.log(JSON.stringify(marks), JSON.stringify(savedMarks))


    }
    return (
        <div className="flex flex-col mr-3">
            <div className="flex flex-row">
                <Card className="m-4">
                    <Button className="p-3 bg-green-600"
                        onClick={handleSave}
                    >
                        <p>Simpan Perubahan</p>
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
            <div className="mr-4 ml-4">
                <Card className="m-4">
                    <Button className="p-3 bg-green-600"
                        onClick={handleAddRow}
                    >
                        <p>Tambah Ekstrakulikuler</p>
                    </Button>
                </Card>

            </div>
            <div
                className="relative flex flex-col m-4 w-full h-fit overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">

                <SpreadsheetTable
                    ref={tableRef}
                    isNumbered
                    isRowDeletable={true}
                    columnHeaders={[
                        { field: "name", editable: true, dataType: "text", headerName: "Nama Ekstrakulikuler", width: 1100, centerHeader: true },]}
                    initRowsData={initExtras}
                    onRowDataChange={handleTableChange}
                />
            </div>
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 m-4 w-full h-fit overflow-auto text-gray-700 bg-white shadow-md bg-clip-border rounded-xl p-4">
                {
                    tableExtras.map((ex, idx) => (
                        ex.name !== "" ? (
                            <div key={`${idx}-${ex.extra_id}`}>
                                <input
                                    key={`${idx}-${ex.extra_id}`}
                                    radioGroup="extras"
                                    checked={selectedExtra === ex.name}
                                    className="w-8 "
                                    type="radio"
                                    title={ex.name}
                                    id={ex.name}
                                    onChange={() => handleRadioChange(ex.name)}

                                /><label>{ex.name}</label>
                            </div>
                        ) : null
                    ))
                }
            </div>
            <div
                className="relative flex flex-col m-4 w-full h-fit overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">

                <SpreadsheetTable
                    isNumbered
                    columnHeaders={studentsColHeaders}
                    initRowsData={initStudents}
                    onRowDataChange={handleMarkTableChange}
                />
            </div>

        </div>
    )
}