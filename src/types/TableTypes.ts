
export interface CPTableType {
    key?: string;
    no: number;
    desc: string;
}

export interface ExtraTableType {
    key?: string;
    name: string;
    extra_id: string;
}

export interface ExtraMarkTableType {
    key?: string;
    student_id?: string;
    extra_mark_id?: string;
    name: string;
    mark?: number;
    desc?: string;
    recom?: string;
    extra_id?: string;
}

export interface StudentTableType {
    key?: string;
    name: string;
    nis: string;
    nisn: string;
    birthday: string;
    gender: string;
    religion: string;
    prev_edu: string;
    address: string;
    father_name: string;
    father_job: string;
    mother_name: string;
    mother_job: string;
    parent_address: string;
    village: string;
    sub_dis: string;
    regen: string;
    prov: string;
    guardian_name: string;
    guardian_job: string;
    guardian_address: string;
    phone_num: string;
}

export interface SubjectMarksTableTypes {
    key?: string;
    student_id: string;
    name: string;
    test?: number;
    non_test?: number;
    [cpKey: string]: number | string | undefined;
}

export interface NotesAttendanceTableType {
    key?: string;
    student_id: string;
    notes_id?: string;
    name: string;
    sick?: number;
    leave?: number;
    alpha?: number;
    notes?: string;
}