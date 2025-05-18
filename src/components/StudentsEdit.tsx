import { useEffect, useRef, useState } from "react";
import SpreadsheetTable, { ColHeaderProps } from "./SpreadsheetTable"
import { Student } from "../types/Student";
import { Input } from "@material-tailwind/react";
import { getStudentsByReport } from "../api/reportApi";
import { useLocation } from "react-router-dom";
import { StudentTableType } from "../types/TableTypes";

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
    const isInitState = useRef(true)
    const tableRef = useRef(null);
    const location = useLocation();
    const report_id = location.state.report_id

    useEffect(() => {
        if (isInitState) {
            getStudentsByReport(report_id).then((val) => {
                const stu: StudentTableType[] = val.map((st) => {
                    return st as StudentTableType
                })
                setInitRows(stu);
            })
        }
    }, [])

    return (
        <div>

            <SpreadsheetTable
                ref={tableRef}
                isNumbered={true}
                columnHeaders={studentColHeaders}
                initRowsData={initRows}
                isRowDeletable={true}
            />
        </div>
    )
}