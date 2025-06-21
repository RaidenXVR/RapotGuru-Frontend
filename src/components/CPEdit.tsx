import { Button, Card, Input, Select, Dialog, SelectOption, Alert } from "@material-tailwind/react";
import { data, useLocation, useNavigate } from "react-router-dom";
import type { Subject } from "../types/Subject";
import { useEffect, useRef, useState } from "react";
import SpreadsheetTable, { type TableGridRef } from "./SpreadsheetTable";
import type { CP } from "../types/CP";
import type { CPTableType, ExtraMarkTableType, ExtraTableType, StudentTableType } from "../types/TableTypes";
import { getCPBySubjectID, setCPBySubjectID, setSubjectByReport } from "../api/reportApi";
import ConfirmDialog from "./ConfirmDialog";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";


// (params: any) => {
//                             const row = params.data;
//                             const excludeKeys = ['no', 'name'];

//                             let total = 0;
//                             let count = 0;

//                             for (const key in row) {
//                                 if (!excludeKeys.includes(key)) {
//                                     const val = parseFloat(row[key]);
//                                     if (!isNaN(val)) {
//                                         total += val;
//                                         count++;
//                                     }
//                                 }
//                             }

//                             return count > 0 ? total / count : 0;
//                         },

// Dialog for when user not saving but click kembali or back



export default function CPEdit() {
    const location = useLocation();
    const currentSubject: Subject = location.state.currentSubject;
    const subjects: Subject[] = location.state.subjects;
    const report_id: string = location.state.report_id;
    const [prevSubjectData, setPrevSubjectData] = useState<Subject>(currentSubject)
    const [subjectName, setSubjectName] = useState(currentSubject.subject_name);
    const [subjectCategory, setSubjectCategory] = useState(currentSubject.subject_category);
    const [subjectMinMark, setSubjectMinMark] = useState(currentSubject.min_mark);
    const navigate = useNavigate();
    const [cpSaved, setCpSaved] = useState<CPTableType[]>([]);
    const [cpChanged, setCpChanged] = useState<CPTableType[]>([]);
    const tableRef = useRef<TableGridRef>(null);
    const [cps, setCPs] = useState<CP[]>([])
    const [initCPs, setInitCPs] = useState<CPTableType[]>([])
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSaveAlert, setOpenSaveAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        getCPBySubjectID(currentSubject.subject_id).then((val) => {
            setCPs(val);
            const cs: CPTableType[] = val.map((c) => {
                return { no: Number(c.cp_num), desc: c.cp_desc }
            })
            setInitCPs(cs);
            setCpSaved(cs);
            setCpChanged(cs);
        })
    }, [])

    const handleTableChange = (updatedData: (CPTableType | ExtraTableType | ExtraMarkTableType | StudentTableType)[]) => {
        console.log("Updated Table Data:", updatedData);
        // Save to state, send to server, etc.
        setCpChanged(updatedData as CPTableType[]);
    };

    const saveTableChanges = () => {
        //do save to db
        const tobeUpdateCP: CP[] = cpChanged.filter((val) => val.no !== 0 && val.desc !== "").map((val) => {
            const inCP = cps.filter((c) => c.cp_num == String(val.no))
            if (inCP.length !== 0) {
                return { cp_id: inCP[0].cp_id, cp_num: String(val.no), cp_desc: val.desc, subject_id: currentSubject.subject_id } as CP
            }
            else {
                return { cp_num: String(val.no), cp_desc: val.desc, subject_id: currentSubject.subject_id } as CP
            }
        })
        if (currentSubject.subject_name === "" && currentSubject.min_mark === 0) {
            const sub: Subject = { subject_id: currentSubject.subject_id, subject_name: subjectName, min_mark: subjectMinMark, subject_category: subjectCategory, report_id: report_id }
            setSubjectByReport(report_id, sub).then(() => {
                setPrevSubjectData(sub)
                setCPBySubjectID(tobeUpdateCP, currentSubject.subject_id).then((val) => {
                    if (val) {
                        setCpSaved(cpChanged)
                        setOpenSaveAlert(true);
                        setAlertMessage("Perubahan berhasil disimpan!");
                        setAlertType('success');
                        setTimeout(() => {
                            setOpenSaveAlert(false);

                        }, 2000);
                    }
                    else {
                        setOpenSaveAlert(true);
                        setAlertMessage("Gagal menyimpan perubahan!");
                        setAlertType('error');
                        setTimeout(() => {
                            setOpenSaveAlert(false);
                        }, 2000);
                    }
                }).catch((err) => {
                    console.error("Error saving CP:", err);
                    setOpenSaveAlert(true);
                    setAlertMessage("Gagal menyimpan perubahan!");
                    setAlertType('error');
                    setTimeout(() => {
                        setOpenSaveAlert(false);
                    }, 2000);
                });

            });
        }
        else {
            setCPBySubjectID(tobeUpdateCP, currentSubject.subject_id).then((val) => {
                console.log(tobeUpdateCP, "tobe update")
                if (val) {
                    setCpSaved(cpChanged);
                    setOpenSaveAlert(true);
                    setAlertMessage("Perubahan berhasil disimpan!");
                    setAlertType('success');
                    setTimeout(() => {
                        setOpenSaveAlert(false);
                    }, 2000);
                }
                else {
                    setOpenSaveAlert(true);
                    setAlertMessage("Gagal menyimpan perubahan!");
                    setAlertType('error');
                    setTimeout(() => {
                        setOpenSaveAlert(false);
                    }, 2000);
                }
            }).catch((err) => {
                console.error("Error saving CP:", err);
                setOpenSaveAlert(true);
                setAlertMessage("Gagal menyimpan perubahan!");
                setAlertType('error');
                setTimeout(() => {
                    setOpenSaveAlert(false);
                }, 2000);
            });
        };
        if (currentSubject.subject_name !== subjectName || currentSubject.min_mark !== subjectMinMark || currentSubject.subject_category !== subjectCategory) {
            const sub: Subject = { subject_id: currentSubject.subject_id, subject_name: subjectName, min_mark: subjectMinMark, subject_category: subjectCategory, report_id: report_id }

            setSubjectByReport(report_id, sub).then(() => {
                setPrevSubjectData(sub)
            })
        }
    }

    const handleAddRow = () => {
        tableRef.current?.addRow();
    };
    const handleKembali = () => {
        if (JSON.stringify(cpSaved) !== JSON.stringify(cpChanged) ||
            prevSubjectData.subject_name !== subjectName ||
            prevSubjectData.subject_category !== subjectCategory ||
            prevSubjectData.min_mark !== subjectMinMark
        ) {
            console.log(JSON.stringify(cpSaved) !== JSON.stringify(cpChanged), prevSubjectData.subject_name !== subjectName, prevSubjectData.subject_category !== subjectCategory, prevSubjectData.min_mark !== subjectMinMark)
            console.log(prevSubjectData.subject_name, subjectName)
            handleOpen();
        } else {
            navigate(`..`);
        }
    };
    const handleConfirmKembali = () => {
        navigate(`..`);
    };
    return (
        <div className="flex flex-col  m-4">
            {/* className="w-1/2 justify-center" */}
            <Dialog open={open}>
                <Dialog.Overlay>
                    <Dialog.Content>
                        <Card className="m-3 p-3 w-full">
                            Terdapat perubahan yang belum disimpan. Apakah Anda yakin ingin kembali tanpa menyimpan perubahan?
                        </Card>
                        <div className="w-full flex justify-evenly p-4">
                            <Dialog.DismissTrigger>
                                <Button
                                    variant="solid"
                                    color="primary"
                                    onClick={handleOpen}
                                    className="p-3 mr-1 bg-green-600"
                                >
                                    <span>Lanjutkan</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="error"
                                    onClick={handleConfirmKembali}
                                    className=" p-3 bg-red-600"
                                >
                                    <span>Kembali Ke List</span>
                                </Button>
                            </Dialog.DismissTrigger>
                        </div>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog>
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
                <div className="m-4 w-fit" onClick={saveTableChanges}>
                    <Button
                        variant="ghost"

                        className="p-3 bg-green-600"
                    >
                        <p className="text-white">Simpan Perubahan</p>
                    </Button>
                </div>
                <div className="m-4 w-fit">
                    <Button
                        variant="ghost"
                        className="p-3 bg-blue-600"
                        onClick={handleKembali}
                    >
                        <p className="text-white">Kembali</p>
                    </Button>
                </div>
            </div>
            <div className="relative flex flex-col m-4 w- h-fit overflow-visible text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">

                <div className=" m-4">
                    <table className="w-full text-center table-auto min-w-max">
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p>Nama Mata Pelajaran</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p>KKM</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p>Kategori</p>
                            </th>
                        </tr>
                        <tr>
                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    <Input
                                        className="rounded-lg p-2"
                                        onChange={(e) => setSubjectName(e.target.value)}
                                        value={subjectName}
                                    />
                                </p>
                            </td>

                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    <Input className="rounded-lg p-2"
                                        onChange={(e) => {
                                            const cleaned = e.target.value.replace(/\D/g, "");
                                            setSubjectMinMark(Number(cleaned));
                                            e.target.value = cleaned;
                                        }}
                                        value={subjectMinMark}
                                    />
                                </p>
                            </td>

                            <td className="p-4">
                                <div className="text-sm">
                                    <Select
                                        color="primary"
                                        variant="outlined"
                                        value={subjectCategory}
                                        onValueChange={(e: any) => setSubjectCategory(e as "Kelompok A" | "Kelompok B" | "Muatan Lokal")}
                                    >
                                        <Select.Trigger className="w-full rounded-lg" placeholder="Pilih Kategori..." />
                                        <Select.List>
                                            <Select.Option key={"001"} value="Kelompok A">Kelompok A</Select.Option>
                                            <Select.Option key={"002"} value="Kelompok B">Kelompok B</Select.Option>
                                            <Select.Option key={"003"} value="Muatan Lokal">Muatan Lokal</Select.Option>
                                        </Select.List>
                                    </Select>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="m-4 w-fit">
                    <Button className="p-3 bg-green-600"
                        variant='ghost'
                        onClick={handleAddRow}
                    >
                        <p className="text-white">Tambah Capaian Pembelajaran</p>
                    </Button>
                </div>
            </div>

            <div>
                <SpreadsheetTable
                    ref={tableRef}
                    columnHeaders={[
                        { field: "no", editable: true, dataType: "number", headerName: "Nomor TP", width: 100, centerData: true, centerHeader: true },
                        { field: "desc", editable: true, dataType: "text", headerName: "Deskripsi Sumatif Lingkup Materi", width: 1100, centerHeader: true },]}
                    initRowsData={initCPs}
                    onRowDataChange={handleTableChange}
                    isRowDeletable={true}

                />
            </div>
        </div>
    )
}