import axios from "axios";
import type { User } from "../types/User";

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

export async function setUserData(nip: string, name: string) {

    try {
        const response = await axios.post(`/api/users/${nip}/update-user`, { nip: nip, name: name });
        const status = await response.status;
        if (status == 200) return true
        else return false
    } catch (err) {
        console.log(err);
        throw new Error("Failed to update user data");
    }

}

export async function loginUser(nip: string, password: string): Promise<{ user: User, error: string | null }> {
    try {
        const response = await axios.post(`/api/users/login`, { nip: nip, password: password });
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to login user");
    }
}

export async function registerUser(nip: string, name: string, password: string): Promise<{error: string | null }> {
    try {
        const response = await axios.post(`/api/users/register`, { nip: nip, name: name, password: password });
        const data = await response.data;
        return data;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to register user");
    }
}