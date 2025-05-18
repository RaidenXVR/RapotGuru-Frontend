// src/api/schoolApi.ts
import axios, { HttpStatusCode } from 'axios';

import { School } from '../types/School';
import { useUser } from '../context/userContext';
import { User } from '../types/User';

export async function getSchoolList(): Promise<School[]> {
  try {
    const response = await axios.get('/api/school-list');
    const data = await response.data;
    return data;
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch school list');

  }
}

export async function setUserSchool(id: String, npsn: String) {

  try {
    const response = await axios.post(`/api/users/${id}/change-school`, { npsn: npsn });
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
  telp: string,) {

  try {
    const response = await axios.post(`/api/schools/${npsn}/update-school`,
      {
        dinasPendidikan: dinasPendidikan,
        satuanPendidikan: satuanPendidikan,
        nss: nss,
        alamat: alamat,
        desa: desa,
        kecamatan: kecamatan,
        kabupaten: kabupaten,
        provinsi: provinsi,
        kodePos: kodePos,
        website: website,
        email: email,
        telp: telp
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
  telp: string) {

  try {
    const response = await axios.post(`/api/schools/add-school`,
      {
        dinasPendidikan: dinasPendidikan,
        satuanPendidikan: satuanPendidikan,
        nss: nss,
        alamat: alamat,
        desa: desa,
        kecamatan: kecamatan,
        kabupaten: kabupaten,
        provinsi: provinsi,
        kodePos: kodePos,
        website: website,
        email: email,
        telp: telp
      })

    const status = await response.status;
    if (status == 200) return true
    else return false
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add school data");

  }

}
