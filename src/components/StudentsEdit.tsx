import { useEffect, useRef, useState } from "react";
import SpreadsheetTable, { type ColHeaderProps, type TableGridRef } from "./SpreadsheetTable"
import { type Student } from "../types/Student";
import { Alert, Button, Input } from "@material-tailwind/react";
import { getStudentsByReport, setStudentData } from "../api/reportApi";
import { useLocation, useNavigate } from "react-router-dom";
import type { CPTableType, ExtraMarkTableType, ExtraTableType, StudentTableType } from "../types/TableTypes";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/16/solid";
import ConfirmDialog from "./ConfirmDialog";

const studentColHeaders: ColHeaderProps[] = [
    { field: 'name', headerName: 'Nama Siswa', freeze: true, editable: true, width: 200, centerHeader: true, dataType: 'text' },
    { field: 'nis', headerName: 'NIS', editable: true, width: 120, centerHeader: true, dataType: 'text' },
    { field: 'nisn', headerName: 'NISN', editable: true, width: 120, centerHeader: true, dataType: 'text' },
    { field: 'birthday', headerName: 'Tempat Tanggal Lahir', editable: true, width: 150, centerHeader: true, dataType: 'text' },
    { field: 'gender', headerName: 'Jenis Kelamin', editable: true, width: 100, centerHeader: true, dataType: 'text' },
    { field: 'religion', headerName: 'Agama', editable: true, width: 120, centerHeader: true, dataType: 'text' },
    { field: 'prev_edu', headerName: 'Pendidikan Sebelumnya', editable: true, width: 180, centerHeader: true, dataType: 'text' },
    { field: 'address', headerName: 'Alamat', editable: true, width: 250, centerHeader: true, dataType: 'text' },
    { field: 'father_name', headerName: 'Nama Ayah', editable: true, width: 200, centerHeader: true, dataType: 'text' },
    { field: 'father_job', headerName: 'Pekerjaan Ayah', editable: true, width: 150, centerHeader: true, dataType: 'text' },
    { field: 'mother_name', headerName: 'Nama Ibu', editable: true, width: 200, centerHeader: true, dataType: 'text' },
    { field: 'mother_job', headerName: 'Pekerjaan Ibu', editable: true, width: 150, centerHeader: true, dataType: 'text' },
    { field: 'parent_address', headerName: 'Alamat Orang Tua', editable: true, width: 250, centerHeader: true, dataType: 'text' },
    { field: 'village', headerName: 'Desa', editable: true, width: 150, centerHeader: true, dataType: 'text' },
    { field: 'sub_dis', headerName: 'Kecamatan', editable: true, width: 150, centerHeader: true, dataType: 'text' },
    { field: 'regen', headerName: 'Kabupaten', editable: true, width: 150, centerHeader: true, dataType: 'text' },
    { field: 'prov', headerName: 'Provinsi', editable: true, width: 150, centerHeader: true, dataType: 'text' },
    { field: 'guardian_name', headerName: 'Nama Wali', editable: true, width: 200, centerHeader: true, dataType: 'text' },
    { field: 'guardian_job', headerName: 'Pekerjaan Wali', editable: true, width: 150, centerHeader: true, dataType: 'text' },
    { field: 'guardian_address', headerName: 'Alamat Wali', editable: true, width: 250, centerHeader: true, dataType: 'text' },
    { field: 'phone_num', headerName: 'Nomor HP', editable: true, width: 150, centerHeader: true, dataType: 'text' },
];


export default function StudentsEdit() {

    const [initRows, setInitRows] = useState<StudentTableType[]>([]);
    const [savedTableStudents, setSavedTableStudents] = useState<StudentTableType[]>(initRows);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSaveAlert, setOpenSaveAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const isInitState = useRef(true)
    const tableRef = useRef<TableGridRef>(null);
    const location = useLocation();
    const report_id = location.state.report_id;
    const navigate = useNavigate();


    const handleAddRow = () => {
        tableRef.current?.addRow();
    };

    useEffect(() => {
        if (isInitState) {
            getStudentsByReport(report_id).then((val) => {
                const stu: StudentTableType[] = val.map((st) => {
                    return st as StudentTableType
                })
                setInitRows(stu);
                setSavedTableStudents(stu);
            })
        }
    }, [])

    const handleTableChange = (updatedData: (CPTableType | ExtraTableType | ExtraMarkTableType | StudentTableType)[], isDelete: boolean) => {
        setInitRows(updatedData as StudentTableType[])
    }

    const handleSave = () => {
        setStudentData(initRows as Student[], report_id).then((val) => {
            if (val) {
                setSavedTableStudents(initRows);
                setAlertMessage('Data siswa berhasil disimpan!');
                setAlertType('success');
                setOpenSaveAlert(true);
                setTimeout(() => {
                    setOpenSaveAlert(false);
                }, 3000);
            }
            else {
                setAlertMessage('Gagal menyimpan data siswa!');
                setAlertType('error');
                setOpenSaveAlert(true);
                setTimeout(() => {
                    setOpenSaveAlert(false);
                }, 3000);
            }
        }).catch((err) => {
            console.log(err);
            setAlertMessage('Terjadi kesalahan saat menyimpan data siswa!');
            setAlertType('error');
            setOpenSaveAlert(true);
            setTimeout(() => {
                setOpenSaveAlert(false);
            }, 3000);
        })

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
                        {alertType === 'success' ? (<CheckCircleIcon />) : (<ExclamationCircleIcon className="h-6 w-6" />)}
                    </Alert.Icon>
                    <Alert.Content>
                        {alertMessage}
                    </Alert.Content>
                </Alert>
            )}
            <div className="w-screen m-3 flex justify-evenly">
                <Button
                    variant="ghost"
                    className="p-3 bg-blue-600"
                    onClick={() => navigate('..')} >
                    <p className="text-white">
                        Kembali
                    </p>
                </Button>

                <Button
                    variant="ghost"
                    className="p-3 bg-green-600" onClick={handleSave}>
                    <p className='text-white'>
                        Simpan Perubahan
                    </p>
                </Button>
            </div>

            <SpreadsheetTable
                ref={tableRef}
                isNumbered={true}
                columnHeaders={studentColHeaders}
                initRowsData={initRows}
                isRowDeletable={true}
                onRowDataChange={handleTableChange}
            />
            <div className="w-screen m-3 flex items-center justify-center">
                <Button
                    variant="ghost"
                    className="w-100 m-3 p-3 bg-green-600"
                    onClick={handleAddRow}>
                    <p className='text-white'>Tambah Baris</p>
                </Button>
            </div>
        </div >
    )
}