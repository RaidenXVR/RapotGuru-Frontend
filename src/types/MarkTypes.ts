export type ExtraMark = {
    extra_mark_id?: string;
    value: number;
    desc: string;
    recommendation: string;
    extra_id: string;
    student_id: string;
}

export type CPMark = {
    mark_id?: string;
    value: number;
    cp_id: string;
    cp_num: string;
    student_id: string;
    subject_id: string;
};

export type OtherMark = {
    mark_id?: string;
    type: 'non_test' | 'test';
    value: number;
    student_id: string;
    subject_id: string;
};

export type SubjectMarks = {
    mark_id?: string;
    subject_id: string;
    student_id: string;
    cp_marks: CPMark[];
    other_marks: OtherMark[];
};

export type FlattenedSubjectMarks = {
    subject_id: string;
    student_id: string;
    subject_name: string;
    subject_category: 'Kelompok A' | 'Kelompok B' | 'Muatan Lokal';
    min_mark: number;
    final_marks: number;
    most_competent: string;
    least_competent: string;
}

export type FlattenedExtraMarks = {
    extra_id: string;
    student_id: string;
    extra_name: string;
    predicate: string;
    desc: string;
    recommendation: string;
};