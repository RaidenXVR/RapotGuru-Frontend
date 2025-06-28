import React, { useEffect, useState } from "react";
import { SpreadsheetTable, type ColHeaderGroupProps, type ColHeaderProps } from "./SpreadsheetTable";
import type { CPTableType, ExtraTableType, ExtraMarkTableType, StudentTableType, SubjectMarksTableTypes } from '../types/TableTypes';
import { getCPsBySubjectIDs, getStudentsByReport, getSubjectMarksBySubjectIds, getSubjectsByReport, setSubjectMarks } from "../api/reportApi";
import { useLocation, useNavigate } from "react-router-dom";
import type { Student } from "../types/Student";
import type { Subject } from "../types/Subject";
import type { CP } from "../types/CP";
import { Alert, Button, Card, Dialog, Radio, Typography } from "@material-tailwind/react";
import type { CPMark, OtherMark, SubjectMarks } from "../types/MarkTypes";
import ConfirmDialog from "./ConfirmDialog";
import { BellAlertIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';


const colDefinitions: (ColHeaderProps | ColHeaderGroupProps)[] = [
    {
        field: "name",
        headerName: "Nama",
        editable: false,
        dataType: "text",

    },
    {
        headerName: "Capaian Pembelajaran",
        children: []
    },
    {
        field: "avg",
        headerName: "Rata-Rata",
        editable: false,
        dataType: 'number',
        formula(params) {
            const allCols = params.api.getAllDisplayedColumns();
            const cpFields = allCols
                .map((col: any) => col.getColDef().field)
                .filter((field: string) => field && field.startsWith("cp_"));
            // Get values from row data
            const values = cpFields.map(f => Number(params.data?.[f])).filter(v => !isNaN(v));
            if (values.length === 0) return 0;
            return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
        },
        format: (params: any) => params.value != null ? params.value : 0
    },
    {
        field: "non_test",
        headerName: "Non Tes",
        editable: true,
        dataType: "number",
    },
    {
        field: "test",
        headerName: "Tes",
        editable: true,
        dataType: "number",
    },
    {
        field: "report_mark",
        headerName: "Nilai Rapot",
        editable: false,
        dataType: 'number',
        formula(params) {
            const allCols = params.api.getAllDisplayedColumns();
            const cpFields = allCols
                .map((col: any) => col.getColDef().field)
                .filter((field: string) => field && (field.includes("cp_") || field.includes("test")));
            // Only include values that are not null, not undefined, not 0, not empty string, and are numbers
            const values = cpFields
                .map(f => Number(params.data?.[f]))
                .filter(v => v !== null && v !== undefined && v !== 0 && v.toString() !== '' && !isNaN(v));
            if (values.length === 0) return 0;
            return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
        },
        format: (params: any) => params.value != null ? params.value : 0
    },


]


export default function SubjectMarksEdit() {

    const location = useLocation();
    const navigate = useNavigate();
    const report_id = location.state?.report_id;
    const [openDialog, setOpenDialog] = useState(false);
    const [openSaveAlert, setOpenSaveAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [students, setStudents] = useState<Student[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>();
    const [currentSubject, setCurrentSubject] = useState<string>('')
    const [cps, setCPs] = useState<{ [subject_id: string]: CP[] }>({});
    const [marks, setMarks] = useState<SubjectMarks[]>([]);
    const [savedData, setSavedData] = useState<{ [subject_id: string]: SubjectMarksTableTypes[] }>({});
    const [changedData, setChangedData] = useState<{ [subject_id: string]: SubjectMarksTableTypes[] }>({});
    const [initRows, setInitRows] = useState<SubjectMarksTableTypes[]>([]);
    const [colDefs, setColDefs] = useState<(ColHeaderProps | ColHeaderGroupProps)[]>([...colDefinitions]);

    useEffect(() => {
        getStudentsByReport(report_id).then((thisStudents) => {
            setStudents(thisStudents);

            getSubjectsByReport(report_id).then((thisSubject) => {
                setSubjects(thisSubject);
                const sub_ids = thisSubject.map((ts) => ts.subject_id);
                getCPsBySubjectIDs(sub_ids).then((cp) => {
                    const thisCps: { [key: string]: CP[] } = {};
                    cp.forEach((c) => {
                        if (thisCps[c.subject_id] !== undefined) {
                            thisCps[c.subject_id].push(c);
                        } else {
                            thisCps[c.subject_id] = [c];
                        }
                    });

                    setCPs(prev => ({ ...prev, ...thisCps }));

                    // For each subject, fetch all marks (CP and Other)
                    getSubjectMarksBySubjectIds(sub_ids).then((thisMarks) => {
                        setMarks(thisMarks);
                        const subjectMarks: { [subject_id: string]: SubjectMarksTableTypes[] } = {};

                        thisSubject.forEach(subject => {
                            const subject_id = subject.subject_id;
                            // Create a base row for every student for this subject
                            const studentRows: SubjectMarksTableTypes[] = thisStudents.map(st => ({
                                student_id: st.student_id!,
                                name: st.name
                            }));

                            // Find the marks for this subject from the fetched marks
                            const marksForSubject = thisMarks.find(m => m.subject_id === subject_id);

                            if (marksForSubject) {
                                // Populate the rows with existing marks and their IDs
                                studentRows.forEach(row => {
                                    marksForSubject.cp_marks
                                        .filter(m => m.student_id === row.student_id)
                                        .forEach(cpMark => {
                                            const fieldName = cpMark.cp_num.replace(/(\d+)\.(\d+)/, 'cp_$1_$2');
                                            row[fieldName] = cpMark.value;
                                            row[`${fieldName}_id`] = (cpMark as any).mark_id;
                                        });
                                    marksForSubject.other_marks
                                        .filter(m => m.student_id === row.student_id)
                                        .forEach(otherMark => {
                                            row[otherMark.type] = otherMark.value;
                                            row[`${otherMark.type}_id`] = (otherMark as any).mark_id;
                                        });
                                });
                            }
                            subjectMarks[subject_id] = studentRows;
                        });

                        setSavedData(subjectMarks);
                        setChangedData(subjectMarks);
                    });

                    const s: SubjectMarksTableTypes[] = thisStudents.map((st) => {
                        return { student_id: st.student_id!, name: st.name };
                    });
                    setInitRows(s);
                });
            });
        });
    }, []);

    const handleSubjectChange = (subject_id: string) => {
        const cpList = cps[subject_id] || [];
        const cpFields: ColHeaderProps[] = cpList.map((c) => ({
            field: c.cp_num.replace(/(\d+)\.(\d+)/, 'cp_$1_$2'),
            headerName: c.cp_num,
            editable: true,
            dataType: 'number'
        }));

        // Build column definitions dynamically
        const newColDefs = [...colDefinitions];
        (newColDefs[1] as ColHeaderGroupProps).children = cpFields;
        setColDefs(newColDefs);

        const subjectMarks: SubjectMarksTableTypes[] = changedData[subject_id]
        if (!subjectMarks || subjectMarks.length == 0) {
            const initRows: SubjectMarksTableTypes[] = students.map((st) => {
                return { student_id: st.student_id!, name: st.name };
            })
            cpFields.forEach((cpField) => {
                initRows.forEach((row) => {
                    row[cpField.field] = 0; // Initialize CP marks to 0
                });
            });
            initRows.forEach((row) => {
                row.non_test = 0; // Initialize non-test marks to 0
                row.test = 0; // Initialize test marks to 0
            });
            setInitRows(initRows);
        } else {

            setInitRows(subjectMarks);
        }
        setCurrentSubject(subject_id);
    };


    const handleTableChange = (updatedData: (CPTableType | ExtraTableType | ExtraMarkTableType | StudentTableType | SubjectMarksTableTypes)[], isDelete: boolean) => {
        if (currentSubject) {
            setChangedData(prev => {
                const oldData = prev[currentSubject] || [];
                const newData = (updatedData as SubjectMarksTableTypes[]).map(newRow => {
                    const oldRow = oldData.find(o => o.student_id === newRow.student_id);
                    if (oldRow) {
                        return { ...oldRow, ...newRow };
                    }
                    return newRow;
                });
                return { ...prev, [currentSubject]: newData };
            });
        }
    };


    const handleSaveChanges = () => {
        // Create a deep copy to modify, so we don't mutate state directly before calling setState
        const newChangedData = JSON.parse(JSON.stringify(changedData));
        const allMarksToSave: SubjectMarks[] = [];

        Object.keys(newChangedData).forEach((subject_id) => {
            const subjectData = newChangedData[subject_id] || [];
            const originalSubjectData = savedData[subject_id] || [];

            // Skip subjects that haven't changed
            if (JSON.stringify(subjectData) === JSON.stringify(originalSubjectData)) {
                return;
            }

            const cpMarks: (CPMark & { mark_id: string })[] = [];
            const otherMarks: (OtherMark & { mark_id: string })[] = [];

            subjectData.forEach((row: SubjectMarksTableTypes) => {
                const studentId = row.student_id;
                if (!studentId) return;

                // Process CP marks
                const subjectCps = cps[subject_id] || [];
                subjectCps.forEach(cp => {
                    const fieldName = cp.cp_num.replace(/(\d+)\.(\d+)/, 'cp_$1_$2');
                    const idFieldName = `${fieldName}_id`;
                    const value = row[fieldName];

                    if (value !== null && value !== undefined && value.toString().trim() !== '') {
                        if (!row[idFieldName]) {
                            row[idFieldName] = uuidv4(); // Assign new ID in the copied data
                        }
                        cpMarks.push({
                            mark_id: row[idFieldName] as string,
                            value: Number(value),
                            cp_id: cp.cp_id!,
                            cp_num: cp.cp_num,
                            student_id: studentId,
                            subject_id: subject_id
                        });
                    }
                });

                // Process other marks
                (['test', 'non_test'] as const).forEach(type => {
                    const idFieldName = `${type}_id`;
                    const value = row[type];

                    if (value !== null && value !== undefined && value.toString().trim() !== '') {
                        if (!row[idFieldName]) {
                            row[idFieldName] = uuidv4(); // Assign new ID
                        }
                        otherMarks.push({
                            mark_id: row[idFieldName] as string,
                            type: type,
                            value: Number(value),
                            student_id: studentId,
                            subject_id: subject_id
                        });
                    }
                });
            });

            allMarksToSave.push({
                subject_id: subject_id,
                student_id: '', // Keep for consistency
                cp_marks: cpMarks,
                other_marks: otherMarks
            });
        });

        if (allMarksToSave.length === 0) {
            setOpenSaveAlert(true);
            setAlertMessage("Tidak ada perubahan untuk disimpan.");
            setAlertType('success');
            setTimeout(() => setOpenSaveAlert(false), 2000);
            return;
        }

        // Update the component's state with the data that includes new IDs
        setChangedData(newChangedData);

        setSubjectMarks(allMarksToSave).then((status) => {
            if (status) {
                setOpenSaveAlert(true);
                setAlertMessage("Perubahan berhasil disimpan!");
                setAlertType('success');
                setTimeout(() => setOpenSaveAlert(false), 2000);
                setSavedData(newChangedData);
            } else {
                setOpenSaveAlert(true);
                setAlertMessage("Gagal menyimpan perubahan!");
                setAlertType('error');
                setTimeout(() => setOpenSaveAlert(false), 2000);
            }
        }).catch((error) => {
            console.error("Error saving subject marks:", error);
            setOpenSaveAlert(true);
            setAlertMessage("Terjadi kesalahan saat menyimpan perubahan!");
            setAlertType('error');
            setTimeout(() => setOpenSaveAlert(false), 2000);
        });
    }
    const handleBack = () => {
        if (JSON.stringify(changedData) !== JSON.stringify(savedData)) {
            setOpenDialog(true);
        }
        else {
            navigate('..'); // Navigate back to the previous page
        }
    }



    return (
        <div className="flex flex-col w-screen/4 m-3">
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
            <div className="flex flex-row m-3 justify-items-center items-center gap-3">
                <Button onClick={handleBack} variant='ghost' className="bg-blue-600 text-white justify-center items-center">
                    Kembali
                </Button>
                <Button variant='ghost' className="bg-green-600 text-white justify-center items-center"
                    onClick={handleSaveChanges}
                >
                    Simpan Perubahan
                </Button>
            </div>
            <div className="relative m-3">

                <Card className="w-full flex flex-row p-3 gap-3 justify-items-center items-center">
                    <Radio color="warning" className='grid grid-cols-5 gap-2 m-3'

                    >
                        {
                            subjects?.map((val) => {
                                return (
                                    <div className="flex flex-cols p-1 gap-2" key={val.subject_id}>
                                        <Radio.Item
                                            id={val.subject_id}
                                            key={val.subject_id}
                                            className='bg-black'
                                            onChange={() => handleSubjectChange(val.subject_id)}
                                        >
                                            <Radio.Indicator />
                                        </Radio.Item>
                                        <Typography>
                                            {val.subject_name}
                                        </Typography>
                                    </div>
                                )
                            })

                        }
                    </Radio>
                </Card>
            </div>
            <div className='m-3'>
                <SpreadsheetTable columnHeaders={colDefs} initRowsData={initRows} onRowDataChange={handleTableChange} />
            </div>

        </div>
    );
}