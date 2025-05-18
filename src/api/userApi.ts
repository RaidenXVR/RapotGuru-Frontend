import axios from "axios";

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