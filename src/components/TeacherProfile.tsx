import { Typography } from "@material-tailwind/react"
import { useUser } from "../context/userContext";

export default function TeacherProfile() {
    const { user } = useUser();
    return (
        <div className="flex-1/2  m-4 object-top-right">
            <Typography className="justify-center align-middle">
                <strong>Profil Guru</strong>
            </Typography>
            <div
                className="relative flex flex-col w-full h-fit overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                <table className="w-full text-left table-auto min-w-max">
                    <tbody>
                        <tr className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    <strong>NIP</strong>
                                </p>
                            </td>
                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {user?.nip}
                                </p>
                            </td>
                        </tr>
                        <tr className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    <strong>Nama</strong>
                                </p>
                            </td>
                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {user?.name}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>



    );
}

/* Dinas Pendidikan
Satuan Pendidikan
NPSN
NSS
Alamat
Desa
Kecamatan
Kabupaten
Provinsi
Kode Pos
Website
e-mail
Telp. */