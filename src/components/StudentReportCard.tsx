import React, { useEffect } from 'react';
import type { Student } from '../types/Student';
import type { School } from '../types/School';
import type { User } from '../types/User';
import type { ExtraMark, FlattenedExtraMarks, FlattenedSubjectMarks, SubjectMarks } from '../types/MarkTypes';
import type { NotesAttendance } from '../types/NotesAttendance';
import type { ReportData } from '../types/Report';
import type { Subject } from '../types/Subject';
import type { Extra } from '../types/Extra';
import type { CP } from '../types/CP';

export type StudentReportCardProps = {
    student_data: Student;
    report_data: ReportData;
    school_profile: School;
    subjects: Subject[];
    cps: CP[];
    subjects_mark: SubjectMarks[];

}

const StudentReportCard = ({ student_data, report_data, school_profile, subjects, cps, subjects_mark }: StudentReportCardProps) => {

    const [subjectsA, setSubjectsA] = React.useState<FlattenedSubjectMarks[]>([]);
    const [subjectsB, setSubjectsB] = React.useState<FlattenedSubjectMarks[]>([]);
    const [localSubjects, setLocalSubjects] = React.useState<FlattenedSubjectMarks[]>([]);

    useEffect(() => {
        const subjectAGroup = subjects.filter(subject => subject.subject_category === 'Kelompok A');
        const subjectBGroup = subjects.filter(subject => subject.subject_category === 'Kelompok B');
        const localSubjectsData = subjects.filter(subject => subject.subject_category === 'Muatan Lokal');

        const subjectAMarks: FlattenedSubjectMarks[] = subjects_mark
            .filter(mark => subjectAGroup.some(subject => subject.subject_id === mark.subject_id))
            .filter(mark => mark.student_id === student_data.student_id)
            .map(mark => {

                const cpMarksSorted = mark.cp_marks.sort((a, b) => a.value - b.value);
                const maxValue = cpMarksSorted.length > 0 ? cpMarksSorted[cpMarksSorted.length - 1].value : undefined;
                const maxCPs = cpMarksSorted.filter(cp => cp.value === maxValue);
                const cpMaxDesc = cps.filter(cp => maxCPs.some(mcp => mcp.cp_id === cp.cp_id)).map(cp => cp.cp_desc);
                const minValue = cpMarksSorted.length > 0 ? cpMarksSorted[0].value : undefined;
                const minCPs = cpMarksSorted.filter(cp => cp.value === minValue);
                const cpMinDesc = cps.filter(cp => minCPs.some(mcp => mcp.cp_id === cp.cp_id)).map(cp => cp.cp_desc);
                const bestCompetent = "Menunjukkan pengetahuan yang baik dalam memahami ".concat(...cpMaxDesc.join(', '));
                const leastCompetent = "Perlu bimbingan untuk meningkatkan pengetahuan dalam ".concat(...cpMinDesc.join(', '));

                return {
                    subject_id: mark.subject_id,
                    student_id: mark.student_id,
                    subject_name: subjects.find(subject => subject.subject_id === mark.subject_id)?.subject_name || '',
                    subject_category: subjects.find(subject => subject.subject_id === mark.subject_id)?.subject_category || 'Kelompok A',
                    min_mark: subjects.find(subject => subject.subject_id === mark.subject_id)?.min_mark || 0,
                    final_marks: (mark.cp_marks.reduce((sum, cp) => sum + cp.value, 0) + mark.other_marks.reduce((sum, cp) => sum + cp.value, 0)) / (mark.cp_marks.length + mark.other_marks.length || 1),
                    most_competent: bestCompetent,
                    least_competent: leastCompetent,
                }
            });

        const subjectBMarks: FlattenedSubjectMarks[] = subjects_mark
            .filter(mark => mark.student_id === student_data.student_id)
            .filter(mark => subjectBGroup.some(subject => subject.subject_id === mark.subject_id))
            .map(mark => {
                const cpMarksSorted = mark.cp_marks.sort((a, b) => a.value - b.value);
                const maxValue = cpMarksSorted.length > 0 ? cpMarksSorted[cpMarksSorted.length - 1].value : undefined;
                const maxCPs = cpMarksSorted.filter(cp => cp.value === maxValue);
                const cpMaxDesc = cps.filter(cp => maxCPs.some(mcp => mcp.cp_id === cp.cp_id)).map(cp => cp.cp_desc);
                const minValue = cpMarksSorted.length > 0 ? cpMarksSorted[0].value : undefined;
                const minCPs = cpMarksSorted.filter(cp => cp.value === minValue);
                const cpMinDesc = cps.filter(cp => minCPs.some(mcp => mcp.cp_id === cp.cp_id)).map(cp => cp.cp_desc);
                const bestCompetent = "Menunjukkan pengetahuan yang baik dalam memahami ".concat(...cpMaxDesc.join(', '));
                const leastCompetent = "Perlu bimbingan untuk meningkatkan pengetahuan dalam ".concat(...cpMinDesc.join(', '));

                return {
                    subject_id: mark.subject_id,
                    student_id: mark.student_id,
                    subject_name: subjects.find(subject => subject.subject_id === mark.subject_id)?.subject_name || '',
                    subject_category: subjects.find(subject => subject.subject_id === mark.subject_id)?.subject_category || 'Kelompok B',
                    min_mark: subjects.find(subject => subject.subject_id === mark.subject_id)?.min_mark || 0,
                    final_marks: (mark.cp_marks.reduce((sum, cp) => sum + cp.value, 0) + mark.other_marks.reduce((sum, cp) => sum + cp.value, 0)) / (mark.cp_marks.length + mark.other_marks.length || 1),
                    most_competent: bestCompetent,
                    least_competent: leastCompetent,

                }
            });

        const localSubjectMarks: FlattenedSubjectMarks[] = subjects_mark
            .filter(mark => mark.student_id === student_data.student_id)
            .filter(mark => localSubjectsData.some(subject => subject.subject_id === mark.subject_id))
            .map(mark => {
                const cpMarksSorted = mark.cp_marks.sort((a, b) => a.value - b.value);
                const maxValue = cpMarksSorted.length > 0 ? cpMarksSorted[cpMarksSorted.length - 1].value : undefined;
                const maxCPs = cpMarksSorted.filter(cp => cp.value === maxValue);
                const cpMaxDesc = cps.filter(cp => maxCPs.some(mcp => mcp.cp_id === cp.cp_id)).map(cp => cp.cp_desc);
                const minValue = cpMarksSorted.length > 0 ? cpMarksSorted[0].value : undefined;
                const minCPs = cpMarksSorted.filter(cp => cp.value === minValue);
                const cpMinDesc = cps.filter(cp => minCPs.some(mcp => mcp.cp_id === cp.cp_id)).map(cp => cp.cp_desc);
                const bestCompetent = "Menunjukkan pengetahuan yang baik dalam memahami ".concat(...cpMaxDesc.join(', '));
                const leastCompetent = "Perlu bimbingan untuk meningkatkan pengetahuan dalam ".concat(...cpMinDesc.join(', '));

                return {
                    subject_id: mark.subject_id,
                    student_id: mark.student_id,
                    subject_name: subjects.find(subject => subject.subject_id === mark.subject_id)?.subject_name || '',
                    subject_category: subjects.find(subject => subject.subject_id === mark.subject_id)?.subject_category || 'Muatan Lokal',
                    min_mark: subjects.find(subject => subject.subject_id === mark.subject_id)?.min_mark || 0,
                    final_marks: (mark.cp_marks.reduce((sum, cp) => sum + cp.value, 0) + mark.other_marks.reduce((sum, cp) => sum + cp.value, 0)) / (mark.cp_marks.length + mark.other_marks.length || 1),
                    most_competent: bestCompetent,
                    least_competent: leastCompetent,
                }
            });

        setSubjectsA(subjectAMarks);
        setSubjectsB(subjectBMarks);
        setLocalSubjects(localSubjectMarks);

        console.log("Subjects A:", subjectAMarks);
        console.log("Subjects B:", subjectBMarks);
        console.log("Local Subjects:", localSubjectMarks);
        console.log("Subjects:", subjects);

    }, [subjects, subjects_mark, cps, student_data]);

    return (
        <div className="max-w-4xl mx-auto p-6 text-sm font-sans text-black bg-white print:bg-white print:text-black"
            style={{
                width: '210mm', // A4 width
                height: '297mm', // A4 height
                minHeight: '297mm', // Ensure it fits A4 height
            }}>
            <div className="grid grid-cols-2 gap-x-40 gap-y-2 text-sm mb-3">
                {/* Left Column */}
                <div className="grid grid-cols-[auto_1ch_1fr] gap-x-3">
                    <span>Nama</span><span>:</span><span>{student_data.name}</span>
                    <span>NIS/NISN</span><span>:</span><span>{`${student_data.nis}/${student_data.nisn}`}</span>
                    <span>Nama Sekolah</span><span>:</span><span>{school_profile.satuan_pendidikan}</span>
                    <span>Alamat</span><span>:</span>
                    <span>
                        {`${school_profile.alamat}, ${school_profile.desa}, ${school_profile.kecamatan}, ${school_profile.kabupaten}`}
                    </span>
                </div>

                {/* Right Column */}
                <div className="grid grid-cols-[auto_1ch_1fr] gap-x-1">
                    <span>Kelas</span><span>:</span><span>{report_data.class}</span>
                    <span>Fase</span><span>:</span><span>{report_data.phase}</span>
                    <span>Semester</span><span>:</span>
                    <span>{`${report_data.semester} ${report_data.semester == '1' ? '(Ganjil)' : '(Genap)'}`}</span>
                    <span>Tahun Pelajaran</span><span>:</span><span>{report_data.school_year}</span>
                </div>
            </div>
            <hr />
            <br />


            <h2 className="text-center font-bold text-base mb-2">LAPORAN HASIL BELAJAR</h2>
            <h2 className="text-center font-bold text-base mb-4">(RAPOR)</h2>


            <section>
                <h3 className="font-bold">A. Pengetahuan</h3>
                <p className="italic mb-2">Kelompok A (Umum)</p>
                <table className="table-print w-full border border-black text-sm mb-2">
                    <thead>
                        <tr className="bg-gray-200 border border-black">
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '40px' // Set a width to control wrapping
                                }}>No</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '150px' // Set a width to control wrapping
                                }}>Mata Pelajaran</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '80px' // Set a width to control wrapping
                                }}>Nilai Akhir</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                }}>Capaian Kompetensi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectsA.map((item, idx) => (
                            <React.Fragment key={item.subject_id}>
                                <tr>
                                    {/* The key is now on the fragment, but it's better on each element */}
                                    <td rowSpan={2} className="border border-black p-1 text-center">{idx + 1}</td>
                                    <td rowSpan={2} className="border border-black p-1">{item.subject_name}</td>
                                    <td rowSpan={2} className="border border-black p-1 text-center">{Math.round(item.final_marks)}</td>
                                    <td className="border border-black p-1">{item.most_competent}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-1">{item.least_competent}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <p className="italic mb-2">Kelompok B (Umum)</p>
                <table className="table-print w-full border border-black text-sm mb-6">
                    <thead>
                        <tr className="bg-gray-200 border border-black">
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '40px' // Set a width to control wrapping
                                }}>No</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '150px' // Set a width to control wrapping
                                }}>Mata Pelajaran</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '80px' // Set a width to control wrapping
                                }}>Nilai Akhir</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                }}>Capaian Kompetensi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectsB.map((item, idx) => (
                            <React.Fragment key={item.subject_id}>
                                <tr>
                                    {/* The key is now on the fragment, but it's better on each element */}
                                    <td rowSpan={2} className="border border-black p-1 text-center">{idx + 1}</td>
                                    <td rowSpan={2} className="border border-black p-1 wrap-break-all text-wrap">{item.subject_name}</td>
                                    <td rowSpan={2} className="border border-black p-1 text-center">{Math.round(item.final_marks)}</td>
                                    <td className="border border-black p-1 wrap-break-all text-wrap">{item.most_competent}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-1 wrap-break-all text-wrap">{item.least_competent}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </section>
            <section>
                <h3 className="font-bold">B. Muatan Lokal</h3>
                <table className="table-print w-full border border-black text-sm mb-6">
                    <thead>
                        <tr className="bg-gray-200 border border-black">
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '40px' // Set a width to control wrapping
                                }}>No</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '150px' // Set a width to control wrapping
                                }}>Mata Pelajaran</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '80px' // Set a width to control wrapping
                                }}>Nilai Akhir</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                }}>Capaian Kompetensi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localSubjects.map((item, idx) => (
                            <React.Fragment key={item.subject_id}>
                                <tr>
                                    {/* The key is now on the fragment, but it's better on each element */}
                                    <td rowSpan={2} className="border border-black p-1 text-center">{idx + 1}</td>
                                    <td rowSpan={2} className="border border-black p-1">{item.subject_name}</td>
                                    <td rowSpan={2} className="border border-black p-1 text-center">{Math.round(item.final_marks)}</td>
                                    <td className="border border-black p-1">{item.most_competent}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-1">{item.least_competent}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </section>

        </div>
    );
};

export default StudentReportCard;


export type StudentReportCardPage2Props = {
    student_data: Student;
    report_data: ReportData;
    school_profile: School;
    user: User;
    subjects: Subject[];
    subjects_mark: SubjectMarks[];
    extras: Extra[];
    extras_mark: ExtraMark[];
    notes_attendance: NotesAttendance[]
}
export const StudentReportCardPage2 = ({ user, student_data, report_data, school_profile, subjects, subjects_mark, extras, extras_mark, notes_attendance }: StudentReportCardPage2Props) => {

    const [extrasData, setExtrasData] = React.useState<FlattenedExtraMarks[]>([]);
    const [notesAttendanceData, setNotesAttendanceData] = React.useState<NotesAttendance>();
    const [decision, setDecision] = React.useState<string>('');

    const mapPredicate = (value: number) => {
        switch (value) {
            case 1: return "Kurang";
            case 2: return "Cukup";
            case 3: return "Baik";
            case 4: return "Sangat Baik";
            default: return "";
        }
    };
    useEffect(() => {
        const filteredExtras: FlattenedExtraMarks[] = extras_mark
            .filter(extra => extras.some(e => e.extra_id === extra.extra_id && e.name !== ''))
            .filter(extra => extra.student_id === student_data.student_id)
            .map(extra => ({
                extra_id: extra.extra_id,
                student_id: extra.student_id,
                extra_name: extras.find(e => e.extra_id === extra.extra_id)?.name || '',
                predicate: mapPredicate(extra.value),
                desc: extra.description,
                recommendation: extra.recommendation,
            }));
        setExtrasData(filteredExtras);
        setNotesAttendanceData(notes_attendance.filter(note => note.student_id === student_data.student_id)[0] || {});

        const marks: { value: number, minMark: number }[] = subjects_mark
            .filter(mark => mark.student_id == student_data.student_id)
            .map(mark => ({
                value: (mark.cp_marks.reduce((sum, cp) => sum + cp.value, 0) + mark.other_marks.reduce((sum, cp) => sum + cp.value, 0)) / (mark.cp_marks.length + mark.other_marks.length || 1),
                minMark: subjects.find(subject => subject.subject_id === mark.subject_id)?.min_mark || 0,
            }));

        const passed: boolean = marks.every(mark => mark.value >= mark.minMark) && marks.length > 0 && marks.length === subjects.length;
        console.log("Marks:", marks, "Passed:", passed, subjects_mark);
        const texts: { [key: string]: { [key2: string]: string } } = {
            "true": {
                "1": `TELAH MENUNTASKAN CAPAIAN PEMBELAJARAN PADA SEMESTER ${report_data.semester}`,
                "2": report_data.class !== '5' ? `NAIK KE KELAS ${Number(report_data.class) + 1}` : 'LULUS'
            },
            "false": {
                "1": `BELUM MENUNTASKAN CAPAIAN PEMBELAJARAN PADA SEMESTER ${report_data.semester}`,
                "2": report_data.class !== '5' ? `tIDAK NAIK KE KELAS ${Number(report_data.class) + 1}` : 'TIDAK LULUS'

            }
        }
        const decisionText = texts[`${passed}`][report_data.semester] || '';
        setDecision(decisionText);



    }, [extras, extras_mark, notes_attendance, student_data.student_id]);

    return (
        <div
            className="max-w-4xl mx-auto p-6 text-sm font-sans text-black bg-white print:bg-white print:text-black"
            style={{
                width: '210mm', // A4 width
                height: '297mm', // A4 height
                minHeight: '297mm', // Ensure it fits A4 height
            }}>
            <div className="grid grid-cols-2 gap-x-40 gap-y-2 text-sm mb-3">
                {/* Left Column */}
                <div className="grid grid-cols-[auto_1ch_1fr] gap-x-3">
                    <span>Nama</span><span>:</span><span>{student_data.name}</span>
                    <span>NIS/NISN</span><span>:</span><span>{`${student_data.nis}/${student_data.nisn}`}</span>
                    <span>Nama Sekolah</span><span>:</span><span>{school_profile.satuan_pendidikan}</span>
                    <span>Alamat</span><span>:</span>
                    <span>
                        {`${school_profile.alamat}, ${school_profile.desa}, ${school_profile.kecamatan}, ${school_profile.kabupaten}`}
                    </span>
                </div>

                {/* Right Column */}
                <div className="grid grid-cols-[auto_1ch_1fr] gap-x-1">
                    <span>Kelas</span><span>:</span><span>{report_data.class}</span>
                    <span>Fase</span><span>:</span><span>{report_data.phase}</span>
                    <span>Semester</span><span>:</span>
                    <span>{`${report_data.semester} ${report_data.semester == '1' ? '(Ganjil)' : '(Genap)'}`}</span>
                    <span>Tahun Pelajaran</span><span>:</span><span>{report_data.school_year}</span>
                </div>
            </div>
            <hr />
            <br />

            <section>
                <h3 className="font-bold">C. Ekstrakurikuler</h3>
                <table className="table-print w-full border border-black text-sm mb-2">
                    <thead>
                        <tr className="bg-gray-200 border border-black">
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '40px' // Set a width to control wrapping
                                }}>No</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '150px' // Set a width to control wrapping
                                }}>Ekstrakurikuler</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                    width: '70px' // Set a width to control wrapping
                                }}>Predikat</th>
                            <th className="border border-black p-1"
                                style={{
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordBreak: 'break-all', // Break long words
                                }}>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {extrasData.map((item, idx) => (
                            <React.Fragment key={item.extra_id}>
                                <tr>
                                    {/* The key is now on the fragment, but it's better on each element */}
                                    <td className="border border-black p-1 text-center">{idx + 1}</td>
                                    <td className="border border-black p-1">{item.extra_name}</td>
                                    <td className="border border-black p-1 text-center">{item.predicate}</td>
                                    <td className="border border-black p-1">{item.desc}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h3 className='font-bold'>D. Ketidakhadiran</h3>
                <table className="table-print w-1/2 border border-black text-sm mb-6">
                    {notesAttendanceData && (
                        <React.Fragment>
                            <tr>
                                <td className="border border-black p-1">Sakit</td>
                                <td className="border border-black p-1 text-center border-r-transparent">{notesAttendanceData.sick}</td>
                                <td className="border border-black p-1">Hari</td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1">Izin</td>
                                <td className="border border-black p-1 text-center border-r-transparent">{notesAttendanceData.leave}</td>
                                <td className="border border-black p-1">Hari</td>
                            </tr>
                            <tr>
                                <td className="border border-black p-1">Tanpa Keterangan</td>
                                <td className="border border-black p-1 text-center border-r-transparent">{notesAttendanceData.alpha}</td>
                                <td className="border border-black p-1">Hari</td>
                            </tr>
                        </React.Fragment>)}
                </table>
            </section>

            <section>
                <h3 className='font-bold'>E. Catatan Wali Kelas</h3>
                <p className='border border-black p-2'>{notesAttendanceData?.notes || 'Tidak ada catatan'}</p>
            </section>
            <br />
            <br />
            <section className='flex items-end justify-end'>
                <p className='border border-black p-2 w-3/5'><strong>Keputusan : </strong><br />
                    Berdasarkan pencapaian seluruh kompetensi, peserta didik dinyatakan: <strong>{decision}</strong>.
                </p>

            </section>
            <br />
            <br />
            <section>
                <div className="p-10 text-sm font-sans leading-relaxed">
                    <div className="flex justify-between">
                        <div>
                            <p className='text-center'>Orang Tua,</p>
                            <br />
                            <br />
                            <br />
                            <div className="mt-10">..............................</div>
                        </div>
                        <div className="text-right">
                            <p className='text-center'>Sumedang, 20 Desember 2024</p>
                            <p className='text-center'>Wali Kelas {report_data.class}</p>
                            <br />

                            <div className="mt-10">
                                <p className='text-center'><strong>{user?.name}</strong></p>
                                <p className='text-center'>NIP. {user?.nip}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <p>Mengetahui,</p>
                        <p>Kepala Sekolah</p>
                        <br />

                        <div className="mt-10">
                            <p><strong>{school_profile.kepala_sekolah}</strong></p>
                            <p>NIP. {school_profile.nip_kepala_sekolah}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

