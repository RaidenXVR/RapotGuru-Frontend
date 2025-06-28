import axios from "axios";
import type { ReportData } from "../types/Report";
import type { CP } from "../types/CP";
import type { Subject } from "../types/Subject";
import type { Student } from "../types/Student";
import type { Extra } from "../types/Extra";
import type { ExtraMark, SubjectMarks } from "../types/MarkTypes";
import type { NotesAttendance } from "../types/NotesAttendance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function getReportsByUser(id: string): Promise<ReportData[]> {

    try {
        const response = await axios.get(`${BASE_URL}/api/users/${id}/reports/`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report list');

    }
}

export async function setReportByUser(report_data: ReportData, user_id: string): Promise<boolean> {
    try {
        const response = await axios.post(`${BASE_URL}/api/users/${user_id}/reports/`, { report_data });
        const status = response.status;
        if (status == 200) return true
        else return false
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set report data');

    }
}

export async function getReportById(report_id: string): Promise<ReportData> {

    try {
        const response = await axios.get(`${BASE_URL}/api/reports/${report_id}`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }
}

export async function getStudentsByReport(report_id: string): Promise<Student[]> {

    try {
        const response = await axios.get(`${BASE_URL}/api/reports/${report_id}/students`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }
}

export async function getSubjectsByReport(report_id: string): Promise<Subject[]> {

    try {
        const response = await axios.get(`${BASE_URL}/api/reports/${report_id}/subjects`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }
}

export async function setSubjectByReport(report_id: string, subject: Subject) {

    try {
        const response = await axios.post(`${BASE_URL}/api/reports/${report_id}/subjects`, { subject });
        const status = response.status;
        if (status == 200) return true
        else false
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set CP data');

    }

}

export async function removeSubjectByID(subject_id: string) {

    try {
        const response = await axios.delete(`${BASE_URL}/api/subjects/${subject_id}`);
        const status = response.status;
        if (status == 200) return true
        else false
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set CP data');

    }
}

export async function setCPBySubjectID(cps: CP[], subject_id: string) {

    try {
        const response = await axios.post(`${BASE_URL}/api/subjects/${subject_id}/cp`, { cp_data: cps });
        const status = response.status;
        console.log(response.data);
        if (status == 200) return true
        else false
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set CP data');

    }

}

export async function getCPBySubjectID(subject_id: string): Promise<CP[]> {
    try {
        const response = await axios.get(`${BASE_URL}/api/subjects/${subject_id}/cp`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }

}

export async function getExtrasByReport(report_id: string): Promise<Extra[]> {
    try {
        const response = await axios.get(`${BASE_URL}/api/reports/${report_id}/extras`)
        const data = await response.data;
        console.log(response.data, "extra get res")
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }
}



export async function setExtrasToDB(extras: Extra[]) {
    try {
        const response = await axios.post(`${BASE_URL}/api/extras/`, { extras_data: extras });
        const status = response.status;
        if (status == 200) { return true }
        else { false }
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set CP data');

    }
}

// export async function removeExtraByID(extra_id: string) {
//     return true
// }

export async function getExtraMarksByExtra(extra_id: string): Promise<ExtraMark[]> {

    try {
        const response = await axios.get(`${BASE_URL}/api/extras/${extra_id}/extra-marks`)
        const data = await response.data;
        console.log(data, 'extra marks get')
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }
}

export async function getExtraMarksByExtraIds(extra_ids: string[]): Promise<ExtraMark[]> {

    try {
        const response = await axios.post(`${BASE_URL}/api/extras/extra-marks`, { extra_ids })
        const data = await response.data;
        return data['extra_marks'];
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch data');
    }

}

export async function setExtraMarksToDB(extraMarks: ExtraMark[]) {
    try {
        const response = await axios.post(`${BASE_URL}/api/extra-marks/`, { extra_marks_data: extraMarks });
        const status = response.status;
        console.log(response.data, "extramarks setted");
        if (status == 200) return true
        else false
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set Extra Marks data');

    }

}

export async function setStudentData(students_data: Student[], report_id: string) {
    try {
        const response = await axios.post(`${BASE_URL}/api/reports/${report_id}/students/`, { students_data });
        const status = response.status;
        console.log(response.data, "students setted");
        if (status == 200) return true
        else false
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set Students data');


    }
}

export async function getCPsBySubjectIDs(subject_ids: string[]): Promise<CP[]> {

    try {
        const response = await axios.post(`${BASE_URL}/api/subjects/cps`, { subject_ids })
        const data = await response.data;
        return data['cp'];
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch data');
    }
}



export async function getSubjectMarksBySubjectIds(subject_ids: string[]): Promise<SubjectMarks[]> {

    try {
        const response = await axios.post(`${BASE_URL}/api/subjects/get-marks`, { subject_ids })
        const data = await response.data;
        console.log(data, "subject marks get")
        return data["subject_marks"];
    } catch (err) {

        throw new Error('Failed to fetch data');
    }
}

export async function setSubjectMarks(subject_marks_data: SubjectMarks[]) {

    try {
        const response = await axios.post(`${BASE_URL}/api/subjects/set-marks`, subject_marks_data);
        const status = response.status;
        console.log(response.data, "subject marks setted");
        if (status == 200) return true
        else false
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set Subject Marks data');

    }
}

export async function getNotesAttendanceByReport(report_id: string): Promise<NotesAttendance[]> {

    try {
        const response = await axios.get(`${BASE_URL}/api/reports/${report_id}/notes-attendance`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }
}

export async function setNotesAttendanceByReport(report_id: string, notes_attendance_data: NotesAttendance[]) {
    try {
        const response = await axios.post(`${BASE_URL}/api/reports/${report_id}/notes-attendance`, notes_attendance_data);
        const status = response.status;
        if (status == 200) return true
        else false
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set Notes Attendance data');

    }
}


