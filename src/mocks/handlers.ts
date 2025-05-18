import { http, HttpResponse } from 'msw';
import { students, reports, schools, subjects, cps, extras, extra_marks } from "./mockData"
import { CP } from '../types/CP';
import { Subject } from '../types/Subject';
import { v4 as uuidv4 } from 'uuid';
import { Extra } from '../types/Extra';
import { ExtraMark } from '../types/MarkTypes';

let name = "FTRN";
let nip = "123456789";
let npsn = "12345678";


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

type SetExtrasParamType = {}

type SetExtraMarksParamType = {}

type SetExtraMarksBodyType = {
  extra_marks_data: ExtraMark[]
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

    const students_data = subjects.filter((val) => val.report_id == report_id);

    return HttpResponse.json(students_data, { status: 200 });
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

  http.post<SetExtrasParamType, SetExtrasBodyType>('/api/extras', async ({ request }) => {
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

  http.post<SetExtraMarksParamType, SetExtraMarksBodyType>('/api/extra-marks', async ({ request }) => {
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
];
