// src/api/schoolApi.ts
import axios from 'axios';

import type { School } from '../types/School';

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function getSchoolList(): Promise<School[]> {
  try {
    const response = await axios.get(BASE_URL + '/api/school-list');
    const data = await response.data;
    return data;
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch school list');

  }
}

export async function getSchoolDataByUserId(user_id: string): Promise<School> {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/${user_id}/school-data`);
    const data = await response.data;
    return data;
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch school data for user');
  }
}

export async function setUserSchool(id: String, npsn: String) {

  try {
    const response = await axios.post(`${BASE_URL}/api/users/${id}/change-school`, { npsn: npsn });
    const data = await response.data;
    return data;
  } catch (err) {
    console.log(err)
    throw new Error('Failed to change user school');
  }
}

export async function updateSchoolData(
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
  kepalaSekolah: string,
  nipKepalaSekolah: string) {

  try {
    const response = await axios.post(`${BASE_URL}/api/schools/${npsn}/update-school`,
      {
        dinas_pendidikan: dinasPendidikan,
        satuan_pendidikan: satuanPendidikan,
        nss: nss,
        alamat: alamat,
        desa: desa,
        kecamatan: kecamatan,
        kabupaten: kabupaten,
        provinsi: provinsi,
        kode_pos: kodePos,
        website: website,
        email: email,
        telp: telp,
        kepala_sekolah: kepalaSekolah,
        nip_kepala_sekolah: nipKepalaSekolah
      })

    const status = await response.status;
    if (status == 200) return true
    else return false
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update school data");

  }
}

export async function setSchoolData(
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
  kepalaSekolah: string,
  nipKepalaSekolah: string) {

  try {
    const response = await axios.post(`${BASE_URL}/api/schools/add-school`,
      {
        dinas_pendidikan: dinasPendidikan,
        satuan_pendidikan: satuanPendidikan,
        npsn: npsn,
        nss: nss,
        alamat: alamat,
        desa: desa,
        kecamatan: kecamatan,
        kabupaten: kabupaten,
        provinsi: provinsi,
        kode_pos: kodePos,
        website: website,
        email: email,
        telp: telp,
        kepala_sekolah: kepalaSekolah,
        nip_kepala_sekolah: nipKepalaSekolah
      })

    const status = await response.status;
    if (status == 200) return true
    else return false
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add school data");

  }

}
