import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Student } from '../types/Student';
import { SpreadsheetTable, type ColHeaderGroupProps, type ColHeaderProps } from './SpreadsheetTable';
import { Alert, Button } from '@material-tailwind/react';
import type { NotesAttendance } from '../types/NotesAttendance';
import { getNotesAttendanceByReport, getStudentsByReport, setNotesAttendanceByReport } from '../api/reportApi';
import type { CPTableType, ExtraMarkTableType, ExtraTableType, NotesAttendanceTableType, StudentTableType, SubjectMarksTableTypes } from '../types/TableTypes';
import ConfirmDialog from './ConfirmDialog';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/16/solid';

const ColDefs: (ColHeaderProps | ColHeaderGroupProps)[] = [
    {
        headerName: "Nama",
        field: "name",
        editable: false,
        dataType: "text",
        width: 400,
    },
    {
        headerName: "Absen",
        children: [
            {
                headerName: "Sakit",
                field: "sick",
                editable: true,
                dataType: "number",
                width: 100,
            },
            {
                headerName: "Izin",
                field: "leave",
                editable: true,
                dataType: "number",
                width: 100,
            },
            {
                headerName: "Alpha",
                field: "alpha",
                editable: true,
                dataType: "number",
                width: 100,
            },

        ]
    },
    {
        headerName: "Jumlah",
        editable: false,
        dataType: "number",
        field: "total",
        width: 100,
        formula(params) {
            const cols = params.api.getAllDisplayedColumns();
            const sick = cols.find(col => col.getColDef().field === 'sick');
            const leave = cols.find(col => col.getColDef().field === 'leave');
            const alpha = cols.find(col => col.getColDef().field === 'alpha');

            if (sick && leave && alpha) {
                const sickValue = params.data[sick.getColDef().field!] || 0;
                const leaveValue = params.data[leave.getColDef().field!] || 0;
                const alphaValue = params.data[alpha.getColDef().field!] || 0;
                return sickValue + leaveValue + alphaValue;
            }

        },
    },
    {
        headerName: "Catatan",
        field: "notes",
        editable: true,
        dataType: "text",
        width: 700,
    }
]

export default function NotesEdit() {
    const location = useLocation();
    const { report_id } = location.state || {};
    const [_students, setStudents] = useState<Student[]>([]);
    const [notesAttendance, setNotesAttendance] = useState<NotesAttendance[]>([]);
    const [initRows, setInitRows] = useState<NotesAttendanceTableType[]>([]);
    const [changedData, setChangedData] = useState<NotesAttendanceTableType[]>([]);
    const [savedData, setSavedData] = useState<NotesAttendanceTableType[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSaveAlert, setOpenSaveAlert] = useState(false);
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [alertMessage, setAlertMessage] = useState('Perubahan berhasil disimpan!');
    const navigate = useNavigate()

    useEffect(() => {
        getStudentsByReport(report_id).then((data) => {
            setStudents(data);
            getNotesAttendanceByReport(report_id).then((notesData) => {
                setNotesAttendance(notesData);
                console.log("Notes Attendance Data:", notesData);
                console.log("Students Data:", data);

                //fix this, this assume that notesData is not empty
                const rows: NotesAttendanceTableType[] = data.map((student) => {
                    const note = notesData.find(note => note.student_id === student.student_id);

                    return {
                        student_id: student.student_id!,
                        name: student.name,
                        sick: note ? note.sick : 0,
                        leave: note ? note.leave : 0,
                        alpha: note ? note.alpha : 0,
                        notes: note ? note.notes : '',
                    }
                });
                setInitRows(rows);
            })
        })
    }, []);

    const handleDataChange = (newData: (CPTableType | ExtraTableType | ExtraMarkTableType | StudentTableType | SubjectMarksTableTypes | NotesAttendanceTableType)[]) => {
        setChangedData(newData as NotesAttendanceTableType[]);
    }

    const handleSaveChanges = () => {
        const dataToSave: NotesAttendance[] = changedData.map((row) => {
            const originalNote = notesAttendance.find(note => note.student_id === row.student_id);
            return {
                id: originalNote ? originalNote.id : '',
                report_id: report_id,
                student_id: row.student_id,
                notes: row.notes || '',
                sick: row.sick || 0,
                leave: row.leave || 0,
                alpha: row.alpha || 0,
            }
        })
        setNotesAttendanceByReport(report_id, dataToSave).then((status) => {
            if (status) {
                setSavedData(changedData);
                setAlertType('success');
                setOpenSaveAlert(true);
                setAlertMessage('Perubahan berhasil disimpan!');
            } else {
                console.error("Failed to save changes");
                setAlertType('error');
                setOpenSaveAlert(true);
                setAlertMessage('Gagal menyimpan perubahan. Silakan coba lagi.');
            }
        }).catch((error) => {
            console.error("Error saving changes:", error);
            setAlertType('error');
            setOpenSaveAlert(true);
            setAlertMessage('Terjadi kesalahan saat menyimpan perubahan. Silakan coba lagi.');
        })
    }

    const handleBack = () => {
        if (changedData.length > 0 && JSON.stringify(changedData) !== JSON.stringify(savedData)) {
            setOpenDialog(true);
        } else {
            navigate('..');
        }
    }

    return (
        <div>
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
                        {alertType === 'success' ? (<CheckCircleIcon className="h-6 w-6" />) : (<ExclamationCircleIcon className="h-6 w-6" />)}
                    </Alert.Icon>
                    <Alert.Content>
                        {alertMessage}
                    </Alert.Content>
                </Alert>
            )}
            <div className="flex flex-row m-3 justify-items-center items-center gap-3">
                <Button variant='ghost' className="bg-blue-600 text-white justify-center items-center"
                    onClick={handleBack}
                >
                    Kembali
                </Button>
                <Button variant='ghost' className="bg-green-600 text-white justify-center items-center"
                    onClick={handleSaveChanges}
                >
                    Simpan Perubahan
                </Button>
            </div>
            <div className='m-3'>
                <SpreadsheetTable columnHeaders={ColDefs} initRowsData={initRows} isNumbered onRowDataChange={handleDataChange} />
            </div>
        </div>
    )
}