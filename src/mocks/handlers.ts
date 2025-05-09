import { http, HttpResponse } from 'msw';

let name = "FTRN"
let npsn = "12345678"

type SetUserSchoolParamType = {
  id: string
}
type SetUserSchoolBodyType = {
  npsn: string
}

export const handlers = [
  http.get('/api/school-list', ({ request }) => {
    return HttpResponse.json([
      {
        dinasPendidikan: "Dinas Pendidikan Kota A",
        satuanPendidikan: "SMA Negeri 1 Kota A",
        npsn: "12345678",
        nss: "9876543210",
        alamat: "Jl. Pendidikan No.1",
        desa: "Desa Maju",
        kecamatan: "Kecamatan Belajar",
        kabupaten: "Kabupaten Semangat",
        provinsi: "Provinsi Ilmu",
        kodePos: "12345",
        website: "http://sman1kotaa.sch.id",
        email: "info@sman1kotaa.sch.id",
        telp: "021-1234567"
      },
      {
        dinasPendidikan: "Dinas Pendidikan Kabupaten B",
        satuanPendidikan: "SMP Negeri 2 Kabupaten B",
        npsn: "87654321",
        nss: "0123456789",
        alamat: "Jl. Pelajar No.2",
        desa: "Desa Pintar",
        kecamatan: "Kecamatan Kreatif",
        kabupaten: "Kabupaten Inspirasi",
        provinsi: "Provinsi Pengetahuan",
        kodePos: "67890",
        website: "http://smpn2kabupatenb.sch.id",
        email: "contact@smpn2kabupatenb.sch.id",
        telp: "022-7654321"
      }
    ]);
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
  })
];
