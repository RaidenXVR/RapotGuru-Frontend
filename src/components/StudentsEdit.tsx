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
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
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
        setHasUnsavedChanges(true);
    };

    const clearMessages = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    useEffect(() => {
        if (isInitState.current) {
            setIsLoading(true);
            getStudentsByReport(report_id)
                .then((val) => {
                    const stu: StudentTableType[] = val.map((st) => st as StudentTableType);
                    setInitRows(stu);
                    setSavedTableStudents(stu);
                })
                .catch((err) => {
                    console.error('Error loading students:', err);
                    setErrorMessage('Gagal memuat data siswa');
                })
                .finally(() => {
                    setIsLoading(false);
                    isInitState.current = false;
                });
        }
    }, [report_id]);

    const handleTableChange = (
        updatedData: (CPTableType | ExtraTableType | ExtraMarkTableType | StudentTableType)[],
        isDelete: boolean
    ) => {
        setInitRows(updatedData as StudentTableType[]);
        setHasUnsavedChanges(true);
        clearMessages();
    };

    const handleSave = async () => {
        setIsSaving(true);
        clearMessages();

        try {
            const result = await setStudentData(initRows as Student[], report_id);
            if (result) {
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
        } catch (error) {
            console.error('Error saving student data:', error);
            setAlertMessage('Terjadi kesalahan saat menyimpan data siswa!');
            setAlertType('error');
            setOpenSaveAlert(true);
            setTimeout(() => {
                setOpenSaveAlert(false);
            }, 3000);
        }
    }

    const handleBack = () => {
        if (hasUnsavedChanges) {
            const confirmLeave = window.confirm(
                'Anda memiliki perubahan yang belum disimpan. Apakah Anda yakin ingin keluar?'
            );
            if (!confirmLeave) return;
        }
        navigate('..');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center space-x-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-gray-700 font-medium">Memuat data siswa...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header Section */}
            <div className="bg-white shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Edit Data Siswa</h1>
                                <p className="text-sm text-gray-600">Kelola informasi data siswa</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            {hasUnsavedChanges && (
                                <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-yellow-700 font-medium">Perubahan belum disimpan</span>
                                </div>
                            )}

                            <Button
                                variant="outline"
                                className="flex items-center space-x-2 px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                onClick={handleBack}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Kembali</span>
                            </Button>

                            <Button
                                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                                onClick={handleSave}
                                disabled={isSaving || !hasUnsavedChanges}
                            >
                                {isSaving ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Simpan Perubahan</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            {(successMessage || errorMessage) && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                    {successMessage && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3 mb-4">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-green-700 font-medium">{successMessage}</p>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 mb-4">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-red-700 font-medium">{errorMessage}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Table Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Tabel Data Siswa</h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Total: <span className="font-medium text-blue-600">{initRows.length}</span> siswa
                                </p>
                            </div>

                            <Button
                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                                onClick={handleAddRow}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Tambah Siswa</span>
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <SpreadsheetTable
                            ref={tableRef}
                            isNumbered={true}
                            columnHeaders={studentColHeaders}
                            initRowsData={initRows}
                            isRowDeletable={true}
                            onRowDataChange={handleTableChange}
                        />
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Tips Penggunaan</p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Klik dua kali pada sel untuk mengedit • Tekan Delete untuk menghapus baris yang dipilih
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>Data tersimpan</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>Perubahan belum disimpan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}