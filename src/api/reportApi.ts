import axios from "axios";
import { ReportData } from "../types/Report";
import { CP } from "../types/CP";
import { Subject } from "../types/Subject";
import { Student } from "../types/Student";
import { Extra } from "../types/Extra";
import { ExtraMark } from "../types/MarkTypes";

export async function getReportsByUser(id: string): Promise<ReportData[]> {

    try {
        const response = await axios.get(`/api/users/${id}/reports/`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report list');

    }
}

export async function getReportById(report_id: string) {

    try {
        const response = await axios.get(`/api/reports/${report_id}`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }
}

export async function getStudentsByReport(report_id: string): Promise<Student[]> {

    try {
        const response = await axios.get(`/api/reports/${report_id}/students`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }
}

export async function getSubjectsByReport(report_id: string) {

    try {
        const response = await axios.get(`/api/reports/${report_id}/subjects`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }
}

export async function setSubjectByReport(report_id: string, subject: Subject) {

    try {
        const response = await axios.post(`/api/reports/${report_id}/subjects`, { subject });
        const status = response.status;
        console.log(response.data, "subjects data");
        if (status == 200) return true
        else false
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set CP data');

    }

}

export async function removeSubjectByID(subject_id: string) {

    try {
        const response = await axios.delete(`/api/subjects/${subject_id}`);
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
        const response = await axios.post(`/api/subjects/${subject_id}/cp`, { cp_data: cps });
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
        const response = await axios.get(`/api/subjects/${subject_id}/cp`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }

}

export async function getExtrasByReport(report_id: string): Promise<Extra[]> {
    try {
        const response = await axios.get(`/api/reports/${report_id}/extras`)
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
        const response = await axios.post(`/api/extras/`, { extras_data: extras });
        const status = response.status;
        if (status == 200) { return true }
        else { false }
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set CP data');

    }
}

export async function removeExtraByID(extra_id: string) {
    return true
}

export async function getExtraMarksByExtra(extra_id: string): Promise<ExtraMark[]> {

    try {
        const response = await axios.get(`/api/extras/${extra_id}/extra-marks`)
        const data = await response.data;
        console.log(data, 'extra marks get')
        return data;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch report data');
    }
}

export async function setExtraMarksToDB(extraMarks: ExtraMark[]) {
    try {
        const response = await axios.post(`/api/extra-marks/`, { extra_marks_data: extraMarks });
        const status = response.status;
        console.log(response.data, "extramarks setted");
        if (status == 200) return true
        else false
    } catch (err) {
        console.log("Error occured", err);
        throw new Error('Failed to set CP data');

    }

}