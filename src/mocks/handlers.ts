import { http, HttpResponse } from 'msw';
import { students, reports, schools, subjects, cps, extras, extra_marks, subject_marks, notes_attendance, users } from "./mockData"
import type { CP } from '../types/CP';
import type { Subject } from '../types/Subject';
import { v4 as uuidv4 } from 'uuid';
import type { Extra } from '../types/Extra';
import type { ExtraMark, SubjectMarks } from '../types/MarkTypes';
import type { Student } from '../types/Student';
import type { NotesAttendance } from '../types/NotesAttendance';
import type { ReportData } from '../types/Report';

let name = "FTRN";
let nip = "123456789";
let npsn = "12345678";

type EmptyParamType = {
}

type SetUserReportParamType = {
  nip: string;
}

type SetUserReportBodyType = {
  report_data: ReportData;
}

type SetUserSchoolParamType = {
  id: string
}
type SetUserSchoolBodyType = {
  npsn: string
}

type SetUserProfileParamType = {
  id: string
}
type SetUserProfileBodyType = {
  nip: string,
  name: string
}

type SetSchoolProfileParamType = {
  id: string
}

type SetSchoolProfileBodyType = {
  dinasPendidikan: string,
  satuanPendidikan: string,
  npsn: string,
  nss: string,
  alamat: string,
  desa: string,
  kecamatan: string,
  kabupaten: string,
  provinsi: string,
  kodePos: string,
  website: string,
  email: string,
  telp: string,
}

type SetCPParamType = {
  subject_id: string;
}

type SetCPBodyType = {
  cp_data: CP[];
}

type SetSubjectParamType = {
  report_id: string;
}

type SetSubjectBodyType = {
  subject: Subject;
}

type SetExtrasBodyType = {
  extras_data: Extra[]
}


type SetExtraMarksBodyType = {
  extra_marks_data: ExtraMark[]
}

type SetStudentsParamType = {
  report_id: string;
}

type SetStudentsBodyType = {
  students_data: Student[]
}


type GetSubjectMarksBodyType = {
  subject_ids: string[]
}

type GetSubjectCPsBodyType = {
  subject_ids: string[]
}

type GetNotesAttendanceParamType = {
  report_id: string;

}

export const handlers = [
  http.get('/api/school-list', ({ request }) => {
    return HttpResponse.json(schools);
  }),
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      nip: id,
      name: name,
      npsn: npsn
    })
  }),
  http.get('/api/user/:id/school-data', ({ params }) => {
    const { id } = params;

    const school_id = users.find(user => user!.nip === id)?.npsn;
    const school = schools.find(school => school.npsn === school_id);
    if (!school) {
      return HttpResponse.json({ error: 'School not found' }, { status: 404 });
    }

    return HttpResponse.json(school, { status: 200 });
  }),
  http.post<SetUserSchoolParamType, SetUserSchoolBodyType>('/api/users/:id/change-school', async ({ params, request }) => {
    const { id } = params;

    const data = await request.json();
    npsn = data.npsn;

    return HttpResponse.json({
      nip: id,
      name: name,
      npsn: npsn
    }, { status: 200 })
  }),
  http.post<SetUserProfileParamType, SetUserProfileBodyType>('/api/users/:id/update-user', async ({ params, request }) => {
    const { id } = params;
    const data = await request.json();

    nip = data.nip;
    name = data.name;

    return HttpResponse.json({
    }, { status: 200 })
  }),
  http.post<SetSchoolProfileParamType, SetSchoolProfileBodyType>('/api/schools/:id/update-school', async ({ params, request }) => {
    const { id } = params;
    const data = await request.json();

    schools.forEach(item => {
      if (item.npsn === id) {
        item.dinasPendidikan = data.dinasPendidikan; // Directly adding a new property
        item.satuanPendidikan = data.satuanPendidikan;
        item.alamat = data.alamat;
        item.desa = data.desa;
        item.kecamatan = data.kecamatan;
        item.kabupaten = data.kabupaten;
        item.provinsi = data.provinsi;
        item.kodePos = data.kodePos;
        item.website = data.website;
        item.email = data.email;
        item.telp = data.telp;
      }

      return HttpResponse.json({ status: 200 })
    });
  }),
  http.get('/api/users/:user_id/reports/', async ({ params }) => {
    const { user_id } = params;

    const user_reports = reports.filter((val) => val.nip == user_id);

    return HttpResponse.json(user_reports, { status: 200 });
  }),
  http.post<SetUserReportParamType, SetUserReportBodyType>('/api/users/:nip/reports', async ({ params, request }) => {
    const { nip } = params;
    const { report_data } = await request.json();

    if (!report_data.report_id) {
      report_data.report_id = uuidv4();
      report_data.nip = nip;

      reports.push(report_data);

    } else {
      const existingReportIndex = reports.findIndex((report) => report.report_id === report_data.report_id);
      if (existingReportIndex !== -1) {
        reports[existingReportIndex] = report_data; // Update existing report
      } else {
        return HttpResponse.json({ error: 'Report not found' }, { status: 404 });
      }
    }
    console.log(reports, 'reports after set user report');
    return HttpResponse.json({ status: 200 });
  }),

  http.get('/api/reports/:report_id', async ({ params }) => {
    const { report_id } = params;

    const user_reports = reports.filter((val) => val.report_id == report_id)[0];

    return HttpResponse.json(user_reports, { status: 200 });
  }),

  http.get('/api/reports/:report_id/students', async ({ params }) => {
    const { report_id } = params;

    const students_data = students.filter((val) => val.report_id == report_id);

    return HttpResponse.json(students_data, { status: 200 });
  }),

  http.get('/api/reports/:report_id/subjects', async ({ params }) => {
    const { report_id } = params;

    const subjects_data = subjects.filter((val) => val.report_id == report_id);

    return HttpResponse.json(subjects_data, { status: 200 });
  }),
  http.get('/api/subjects/:subject_id/cp', async ({ params }) => {
    const { subject_id } = params;

    const cp_data = cps.filter((val) => val.subject_id == subject_id);

    return HttpResponse.json(cp_data, { status: 200 });
  }),
  http.post<SetCPParamType, SetCPBodyType>('/api/subjects/:subject_id/cp', async ({ params, request }) => {
    const { subject_id } = params;
    const { cp_data } = await request.json();
    const thisSubjectCP = cps.filter((val) => val.subject_id === subject_id);

    cp_data.forEach((val) => {
      const index = thisSubjectCP.findIndex(item => item.cp_id === val.cp_id);
      if (index !== -1) {
        // Update existing item (requires finding the index again)
        const idxCPs = cps.findIndex((item => item.cp_id === val.cp_id))
        cps[idxCPs] = val;

      } else {
        // Insert new item
        val.cp_id = uuidv4();
        cps.push(val);
      }
    });

    const deleted = thisSubjectCP.filter(val =>
      cp_data.findIndex(c => c.cp_id == val.cp_id) == -1
    )

    deleted.forEach(del => {
      const indexToDelete = cps.findIndex(item => item.cp_id === del.cp_id);
      if (indexToDelete !== -1) {
        cps.splice(indexToDelete, 1);
      }
    });


    return HttpResponse.json({ cps }, { status: 200 });
  }),

  http.delete('/api/subjects/:subject_id', async ({ params }) => {
    const { subject_id } = params;

    const indexToDelete = subjects.findIndex(item => item.subject_id === subject_id);
    if (indexToDelete !== -1) {
      subjects.splice(indexToDelete, 1);
    }

    const deletedCP = cps.filter(item => item.subject_id === subject_id);
    if (deletedCP.length !== 0) {
      deletedCP.forEach((val) => {
        const idxCPToDelete = cps.findIndex(item => item.cp_id === val.cp_id);
        cps.splice(idxCPToDelete, 1);

      })
    }

    return HttpResponse.json({ status: 200 })
  }),

  http.post<SetSubjectParamType, SetSubjectBodyType>('/api/reports/:report_id/subjects', async ({ params, request }) => {
    const { report_id } = params;
    const { subject } = await request.json();
    const existing = subjects.filter((val) => val.subject_id === subject.subject_id);

    if (existing.length === 0) {
      subjects.push(subject);
    } else {
      subjects.forEach((val) => {
        if (val.subject_id === subject.subject_id) {
          val.min_mark = subject.min_mark;
          val.subject_category = subject.subject_category;
          val.subject_name = subject.subject_name;
        }
      })
    }
    return HttpResponse.json({ subjects, existing }, { status: 200 })
  }),

  http.post<EmptyParamType, SetExtrasBodyType>('/api/extras', async ({ request }) => {
    const { extras_data } = await request.json();

    extras_data.forEach((ex) => {
      const idx = extras.findIndex((item) => item.extra_id == ex.extra_id);

      if (idx !== -1) {
        extras[idx] = ex;
      }
      else {
        extras.push(ex)
      }
    })

    const thisExtra = extras.filter((val) => val.report_id === extras_data[0].report_id)
    const deleted = thisExtra.filter((val) =>
      extras_data.findIndex((v) => v.extra_id === val.extra_id) === -1
    )

    deleted.forEach(del => {
      const indexToDelete = extras.findIndex(item => item.extra_id === del.extra_id);
      if (indexToDelete !== -1) {
        extras.splice(indexToDelete, 1);
      }
    });
    return HttpResponse.json({ extras }, { status: 200 })
  }),

  http.get('/api/reports/:report_id/extras', async ({ params }) => {
    const { report_id } = params;

    const extras_data = extras.filter((val) => val.report_id == report_id);

    return HttpResponse.json(extras_data, { status: 200 });
  }),


  http.get('/api/extras/:extra_id/extra-marks', async ({ params }) => {
    const { extra_id } = params;

    const extras_data = extra_marks.filter((val) => val.extra_id == extra_id);

    return HttpResponse.json(extras_data, { status: 200 });
  }),

  http.post<EmptyParamType, SetExtraMarksBodyType>('/api/extra-marks', async ({ request }) => {
    const { extra_marks_data } = await request.json();

    extra_marks_data.forEach((ex) => {
      const idx = extra_marks.findIndex((item) => item.extra_mark_id == ex.extra_mark_id);

      if (idx !== -1) {
        extra_marks[idx] = ex;
      }
      else {
        extra_marks.push(ex)
      }
    })

    const thisExtra = extra_marks.filter((val) => val.extra_id === extra_marks_data[0].extra_id)
    const deleted = thisExtra.filter((val) =>
      extra_marks_data.findIndex((v) => v.extra_mark_id === val.extra_mark_id) === -1
    )

    deleted.forEach(del => {
      const indexToDelete = extra_marks.findIndex(item => item.extra_mark_id === del.extra_mark_id);
      if (indexToDelete !== -1) {
        extra_marks.splice(indexToDelete, 1);
      }
    });
    return HttpResponse.json({ extra_marks }, { status: 200 })
  }),


  http.post<EmptyParamType, { extra_ids: string[] }>('/api/extras/extra-marks', async ({ request }) => {

    const { extra_ids } = await request.json();

    const extraMarks: ExtraMark[] = extra_ids.map((extraId) => {
      return extra_marks.filter((sm) => sm.extra_id == extraId)
    }).flat()
    return HttpResponse.json({ extra_marks: extraMarks }, {
      status: 200
    })
  }),


  http.post<SetStudentsParamType, SetStudentsBodyType>('/api/reports/:report_id/students', async ({ params, request }) => {
    const { students_data } = await request.json();
    const { report_id } = params;

    students_data.forEach((st) => {
      const idx = students.findIndex((item) => item.nisn == st.nisn && item.report_id == st.report_id);

      if (idx !== -1) {
        students[idx] = st;
      }
      else {
        students.push(st)
      }
    })

    const thisStudent = students.filter((val) => val.report_id === report_id)
    const deleted = thisStudent.filter((val) => students_data.findIndex((v) => v.nisn === val.nisn) === -1)

    deleted.forEach(del => {
      const indexToDelete = students.findIndex(item => item.student_id === del.student_id);
      if (indexToDelete !== -1) {
        students.splice(indexToDelete, 1);
      }
    });
    return HttpResponse.json({ students }, { status: 200 })
  }),

  http.post<EmptyParamType, GetSubjectCPsBodyType>('/api/subjects/cps', async ({ request }) => {
    const { subject_ids } = await request.json();

    const cp: CP[] = subject_ids.map((subjectIds) => {
      return cps.filter((sm) => sm.subject_id == subjectIds)
    }).flat()
    return HttpResponse.json({ cp }, { status: 200 })

  }),

  http.post<EmptyParamType, GetSubjectMarksBodyType>('/api/subjects/get-marks', async ({ request }) => {
    const { subject_ids } = await request.json();

    const subMarks: SubjectMarks[] = [];
    subject_ids.forEach((subject_id) => {
      // Get all student_ids for this subject
      const studentIds = [
        ...new Set(subject_marks.filter(m => m.subject_id === subject_id).map(m => m.student_id))
      ];
      studentIds.forEach((student_id) => {
        const marks: SubjectMarks = {
          subject_id,
          student_id,
          cp_marks: [],
          other_marks: []
        };
        const cpMarks = subject_marks.filter((val) => val.subject_id === subject_id && val.cp_id && val.student_id === student_id);
        const otherMarks = subject_marks.filter((val) => val.subject_id === subject_id && !val.cp_id && val.student_id === student_id);
        cpMarks.forEach((cpMark) => {
          const cp_num = cps.find((cp) => cp.cp_id === cpMark.cp_id)?.cp_num || '';
          marks.cp_marks.push({
            mark_id: cpMark.mark_id,
            value: cpMark.value,
            cp_id: cpMark.cp_id!,
            cp_num: cp_num,
            student_id: cpMark.student_id,
            subject_id: cpMark.subject_id
          });
        });
        otherMarks.forEach((otherMark) => {
          marks.other_marks.push({
            mark_id: otherMark.mark_id,
            type: otherMark.type!,
            value: otherMark.value,
            student_id: otherMark.student_id,
            subject_id: otherMark.subject_id
          });
        });
        subMarks.push(marks);
      });
    });
    return HttpResponse.json({ subject_marks: subMarks }, { status: 200 });
  }),

  http.post<EmptyParamType, SubjectMarks[]>('/api/subjects/set-marks', async ({ request }) => {
    const subject_marks_data = await request.json();
    console.log(subject_marks_data, 'subject marks data');
    try {
      subject_marks_data.forEach((sm) => {
        sm.cp_marks.forEach((cp) => {
          const idx = subject_marks.findIndex((item) => item.mark_id == cp.mark_id);

          if (idx !== -1) {
            subject_marks[idx] = { ...cp, mark_id: subject_marks[idx].mark_id }; // Preserve existing mark_id
          }
          else {
            subject_marks.push({ ...cp, mark_id: uuidv4() }); // Generate new mark_id
          }
        })

        sm.other_marks.forEach((other) => {
          const idx = subject_marks.findIndex((item) => item.mark_id == other.mark_id);

          if (idx !== -1) {
            subject_marks[idx] = { ...other, mark_id: subject_marks[idx].mark_id }; // Preserve existing mark_id
          }
          else {
            subject_marks.push({ ...other, mark_id: uuidv4() }); // Generate new mark_id
          }
        })
      })

      return HttpResponse.json({ status: 200 });
    } catch (err) {
      console.error("Error setting subject marks:", err);
      return HttpResponse.json({ error: 'Failed to set subject marks' }, { status: 500 });
    }
  }),

  http.get('/api/reports/:report_id/notes-attendance', async ({ params }) => {
    const { report_id } = params;

    const notes_attendance_data = notes_attendance.filter((val) => val.report_id == report_id);

    return HttpResponse.json(notes_attendance_data, { status: 200 });
  }),

  http.post<GetNotesAttendanceParamType, NotesAttendance[]>('/api/reports/:report_id/notes-attendance', async ({ params, request }) => {

    const { report_id } = params;
    const notes_attendance_data = await request.json();

    notes_attendance_data.forEach((na) => {
      const idx = notes_attendance.findIndex((item) => item.id == na.id);

      if (idx !== -1) {
        notes_attendance[idx] = na;
      }
      else {
        notes_attendance.push(na)
      }
    })

    const thisNotesAttendance = notes_attendance.filter((val) => val.report_id === report_id)
    const deleted = thisNotesAttendance.filter((val) =>
      notes_attendance_data.findIndex((v) => v.id === val.id) === -1
    )

    deleted.forEach(del => {
      const indexToDelete = notes_attendance.findIndex(item => item.id === del.id);
      if (indexToDelete !== -1) {
        notes_attendance.splice(indexToDelete, 1);
      }
    });
    return HttpResponse.json({ notes_attendance }, { status: 200 })
  }),

];
