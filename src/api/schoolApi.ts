// src/api/schoolApi.ts
import axios from 'axios';

import { School } from '../types/School';
import { useUser } from '../context/userContext';

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

export async function getUserData(id: String) {

  try {
    const response = await axios.get(`/api/users/${id}`)
    const data = await response.data;
    return data;
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch school list');

  }
}
