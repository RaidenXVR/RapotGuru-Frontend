import { Alert, Button, Card, Radio, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import type { Extra } from "../types/Extra";
import { useEffect, useRef, useState } from "react";
import { getExtraMarksByExtra, getExtrasByReport, getStudentsByReport, setExtraMarksToDB, setExtrasToDB } from "../api/reportApi";
import { v4 as uuidv4 } from "uuid";
import SpreadsheetTable, { type ColHeaderProps, type TableGridRef } from "./SpreadsheetTable";
import type { CPTableType, ExtraTableType, ExtraMarkTableType } from "../types/TableTypes";
import type { Student } from "../types/Student";
import "../index.css";
import type { ExtraMark } from "../types/MarkTypes";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import ConfirmDialog from "./ConfirmDialog";

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
    const [openDialog, setOpenDialog] = useState(false);
    const [openSaveAlert, setOpenSaveAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');


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
                                    desc: l.description,
                                    recom: l.recommendation,
                                    extra_id: l.extra_id
                                }
                            })
                            extraMarks[e.extra_id] = stt
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

    const handleRadioChange = (extra_id: string) => {
        console.log(extras)
        setSelectedExtra(extra_id);
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
                const thisSavedMarks: ExtraMarkTableType[] = marks[extra_id];
                // console.log("called set init student")
                if (thisSavedMarks !== undefined && thisSavedMarks.length !== 0) {
                    const markIdx = thisSavedMarks.findIndex((val) => val.student_id === student.student_id);
                    if (markIdx !== -1) {
                        return {
                            ...student,
                            extra_mark_id: thisSavedMarks[markIdx].extra_mark_id,
                            mark: thisSavedMarks[markIdx].mark ? thisSavedMarks[markIdx].mark : 0,
                            desc: thisSavedMarks[markIdx].desc,
                            recom: thisSavedMarks[markIdx].recom,
                            extra_id: thisSavedMarks[markIdx].extra_id
                        }
                    } else {
                        return { ...student, desc: '', mark: 0, recom: '' }
                    }
                }
                else {

                    return { ...student, desc: '', mark: 0, recom: '' };
                }
            });
        });
    }

    const handleSave = () => {
        // Part 1: Save Extras
        if (JSON.stringify(tableExtras) !== JSON.stringify(savedTableExtras)) {
            const extrasToSave: Extra[] = tableExtras
                .filter(ex => ex.name && ex.extra_id) // Only save extras with a name and an ID
                .map(ex => ({ extra_id: ex.extra_id!, name: ex.name, report_id: report_id }));

            setExtrasToDB(extrasToSave).then((val) => {
                if (val) {
                    // After saving, the current table state is the new "saved" state.
                    setSavedTableExtras(tableExtras);
                    setExtras(prev => {
                        const map = new Map(prev.map(e => [e.extra_id, e]));
                        extrasToSave.forEach(e => map.set(e.extra_id, e));
                        return Array.from(map.values());
                    });

                    setAlertMessage("Perubahan Ekstrakulikuler berhasil disimpan.");
                    setAlertType('success');
                    setOpenSaveAlert(true);
                    setTimeout(() => {
                        setOpenSaveAlert(false);
                    }, 3000);
                }
                else {
                    setAlertMessage("Gagal menyimpan perubahan ekstrakulikuler.");
                    setAlertType('error');
                    setOpenSaveAlert(true);
                    setTimeout(() => {
                        setOpenSaveAlert(false);
                    }, 3000);
                }
            }).catch((error) => {
                console.error("Error saving extras:", error)
                setAlertMessage("Terjadi kesalahan saat menyimpan perubahan ekstrakulikuler.")
                setAlertType('error')
                setOpenSaveAlert(true)
                setTimeout(() => {
                    setOpenSaveAlert(false)
                }, 3000)
            });
        }

        // Part 2: Save Marks
        const updatedMarksState: { [extra_id: string]: ExtraMarkTableType[] } = {};

        // Iterate over each extra_id that has been loaded or interacted with.
        Object.entries(marks).forEach(([extra_id, studentMarksArray]) => {

            const marksForThisExtraPayload: ExtraMark[] = [];

            const newStudentMarksArrayWithIds = studentMarksArray.map(markData => {
                const hasContent = markData.mark || markData.desc || markData.recom;
                const newMarkId = markData.extra_mark_id || (hasContent ? uuidv4() : undefined);

                const markWithId = {
                    ...markData,
                    extra_mark_id: newMarkId,
                    extra_id: extra_id
                };

                if (hasContent) {
                    marksForThisExtraPayload.push({
                        extra_mark_id: newMarkId!,
                        value: Number(markData.mark) || 0,
                        description: markData.desc || '',
                        recommendation: markData.recom || '',
                        student_id: markData.student_id!,
                        extra_id: extra_id,
                    });
                }

                return markWithId;
            });

            // Update the state object that will be set after saving.
            updatedMarksState[extra_id] = newStudentMarksArrayWithIds;

            // Check if this specific extra's marks have changed before saving.
            // This prevents sending data for extras that weren't touched.
            // It also correctly sends an empty array for an extra where all marks were deleted,
            // which signals the backend to remove them.
            const originalMarks = savedMarks[extra_id] || [];
            if (JSON.stringify(newStudentMarksArrayWithIds) !== JSON.stringify(originalMarks)) {
                setExtraMarksToDB(marksForThisExtraPayload).then((val) => {
                    if (val) {
                        console.log(`Marks for extra ${extra_id} saved successfully.`);
                        setAlertMessage(`Perubahan nilai untuk ekstrakulikuler ${extra_id} berhasil disimpan.`);
                        setAlertType('success');
                        setOpenSaveAlert(true);
                        setTimeout(() => {
                            setOpenSaveAlert(false);
                        }, 3000);
                    }
                }).catch((error) => {
                    console.error(`Error saving marks for extra ${extra_id}:`, error)
                    setAlertMessage(`Terjadi kesalahan saat menyimpan perubahan nilai untuk ekstrakulikuler ${extra_id}.`)
                    setAlertType('error');
                    setOpenSaveAlert(true);
                    setTimeout(() => {
                        setOpenSaveAlert(false);
                    }, 3000)
                })
                    ;
            }
        });

        // Crucially, update the local state with the version that includes the new IDs.
        setMarks(updatedMarksState);
        setSavedMarks(updatedMarksState);
    }

    return (
        <div className="flex flex-col mr-3">
            {openDialog && (<ConfirmDialog
                open={openDialog}
                header="Anda Belum Menyimpan Perubahan!"
                message="Apakah Anda yakin ingin meninggalkan halaman ini tanpa menyimpan perubahan?"
                confirmText="Ya, Kembali"
                confirmColor="red"
                dismissText="Tidak, Tetap di Halaman Ini"
                dismissColor="blue"
                onDismiss={() => setOpenDialog(false)}
                onConfirm={() => navigate('..')} />
            )}
            {openSaveAlert && (
                <Alert color={alertType} className="m-3">
                    <Alert.Icon>
                        {alertType === 'success' ? (<CheckCircleIcon />) : (<ExclamationCircleIcon className="h-6 w-6" />)}
                    </Alert.Icon>
                    <Alert.Content>
                        {alertMessage}
                    </Alert.Content>
                </Alert>
            )}
            <div className="flex flex-row">
                <Card className="m-4 w-fit p-3">
                    <Button
                        variant='ghost'
                        className="group relative overflow-hidden
                                bg-gradient-to-r from-green-500 to-emerald-600
                                hover:from-green-600 hover:to-emerald-700
                                shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30
                                text-white font-semibold
                                px-6 py-3 rounded-xl
                                transition-all duration-300 ease-out
                                transform hover:-translate-y-0.5 hover:scale-105
                                focus:ring-4 focus:ring-green-200
                                border-0"
                        onClick={handleSave}
                    >
                        <p className="text-white">Simpan Perubahan</p>
                    </Button>
                </Card>

                <Card className="m-4 w-fit p-3">
                    <Button
                        variant='ghost'
                        className="group relative overflow-hidden
                                bg-gradient-to-r from-blue-500 to-blue-600
                                hover:from-blue-600 hover:to-blue-700
                                shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30
                                text-white font-semibold
                                px-6 py-3 rounded-xl
                                transition-all duration-300 ease-out
                                transform hover:-translate-y-0.5 hover:scale-105
                                focus:ring-4 focus:ring-blue-200
                                border-0"
                        onClick={() => navigate(`..`)}
                    >
                        <p className="text-white">Kembali</p>
                    </Button>
                </Card>
            </div>
            <div className="flex justify-center">
                <Card className="w-screen/2 flex justify-center p-3">
                    <Button className="p-3 w-full bg-green-600"
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
            <div className=" m-4 w-full h-fit text-gray-700 bg-white shadow-md bg-clip-border rounded-xl p-4">
                <Radio color="success" className="grid grid-cols-4 gap-2">
                    {
                        tableExtras.map((ex, idx) => (
                            ex.name !== "" ? (
                                <div key={`${idx}-${ex.extra_id}`} className="flex flex-row p-3 gap-4">
                                    <Radio.Item
                                        key={`${idx}-${ex.extra_id}`}
                                        title={ex.name}
                                        id={ex.name}
                                        onChange={() => {
                                            if (ex.extra_id === undefined) {
                                                const uuid = uuidv4();
                                                const newExtra: Extra = { extra_id: uuid, name: ex.name, report_id: report_id };
                                                setExtras(prev => [...prev, newExtra]);
                                                setInitTableExtras(prev => prev.map((item) => item.extra_id === ex.extra_id ? { ...item, extra_id: uuid } : item));
                                                setMarks(prevMarks => ({ ...prevMarks, [uuid]: [] }));
                                                handleRadioChange(uuid);
                                                console.log("Extra id undefined, created new extra with id:", uuid);
                                            }
                                            else {
                                                handleRadioChange(ex.extra_id)

                                            }
                                        }}
                                    >
                                        <Radio.Indicator />
                                    </Radio.Item>
                                    <Typography>
                                        {ex.name}
                                    </Typography>
                                </div>
                            ) : null
                        ))
                    }
                </Radio>
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