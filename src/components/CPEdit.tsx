import { Button, Card, Input, Option, Select, DialogHeader, DialogBody, DialogFooter, Dialog } from "@material-tailwind/react";
import { data, useLocation, useNavigate } from "react-router-dom";
import { Subject } from "../types/Subject";
import { useEffect, useRef, useState } from "react";
import SpreadsheetTable, { TableGridRef } from "./SpreadsheetTable";
import { CP } from "../types/CP";
import { CPTableType, ExtraTableType } from "../types/TableTypes";
import { getCPBySubjectID, setCPBySubjectID, setSubjectByReport } from "../api/reportApi";


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

    const handleTableChange = (updatedData: (CPTableType | ExtraTableType)[]) => {
        console.log("Updated Table Data:", updatedData);
        // Save to state, send to server, etc.
        setCpChanged(updatedData as CPTableType[]);
    };

    const saveTableChanges = () => {
        //do save to db
        const tobeUpdateCP: CP[] = cpChanged.filter((val) => val.no !== 0 && val.desc !== "").map((val) => {
            const inCP = cps.filter((c) => c.cp_num == String(val.no))
            console.log("VAL save table changes:", val)
            console.log("inCP save table changes:", inCP)
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
                    }
                    else {
                        //throw error
                    }
                })

            });
        }
        else {
            setCPBySubjectID(tobeUpdateCP, currentSubject.subject_id).then((val) => {
                console.log(tobeUpdateCP, "tobe update")
                if (val) {
                    setCpSaved(cpChanged)
                }
                else {
                    //throw error
                }
            })
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
            <Dialog open={open} handler={handleOpen} className="w-1/2 justify-center">
                <DialogHeader>Anda yakin ingin kembali?</DialogHeader>
                <DialogBody>
                    Terdapat perubahan yang belum disimpan. Apakah Anda yakin ingin kembali tanpa menyimpan perubahan?
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="p-3 mr-1 bg-red-600"
                    >
                        <span>Batal</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleConfirmKembali}
                        className=" p-3 bg-green-600"
                    >
                        <span>Kembali</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <div className="flex flex-row">
                <Card className="m-4" onClick={saveTableChanges}>
                    <Button className="p-3 bg-green-600"
                    >
                        <p>Simpan Perubahan</p>
                    </Button>
                </Card>
                <Card className="m-4">
                    <Button className="p-3 bg-blue-600"
                        onClick={handleKembali}
                    >
                        <p>Kembali</p>
                    </Button>
                </Card>
            </div>
            <div className="relative flex flex-col m-4 w- h-fit overflow-visible text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">

                <Card className="rounded-xl m-4" shadow={false}>
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
                                        crossOrigin={undefined}
                                        onChange={(e) => setSubjectName(e.target.value)}
                                        value={subjectName}
                                    />
                                </p>
                            </td>

                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    <Input className="rounded-lg p-2" crossOrigin={undefined}
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
                                        label="Pilih Kategori..."
                                        color="blue"
                                        variant="outlined"
                                        className="w-full rounded-lg"
                                        value={subjectCategory}
                                        onChange={(e) => setSubjectCategory(e as "Kelompok A" | "Kelompok B" | "Muatan Lokal")}
                                    >
                                        <Option key={"001"} value="Kelompok A">Kelompok A</Option>
                                        <Option key={"002"} value="Kelompok B">Kelompok B</Option>
                                        <Option key={"003"} value="Muatan Lokal">Muatan Lokal</Option>
                                    </Select>
                                </div>
                            </td>
                        </tr>
                    </table>
                </Card>
            </div>
            <div className="flex flex-row">
                <Card className="m-4">
                    <Button className="p-3 bg-green-600"
                        onClick={handleAddRow}
                    >
                        <p>Tambah Capaian Pembelajaran</p>
                    </Button>
                </Card>
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