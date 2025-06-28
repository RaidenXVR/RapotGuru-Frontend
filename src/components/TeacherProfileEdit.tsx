import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../api/userApi";

export default function TeacherProfileEdit() {
    const { user } = useUser();
    const [nip, setNip] = useState(user!.nip);
    const [name, setName] = useState(user!.name);
    const navigate = useNavigate();
    const isFormValid = nip.trim() !== "" && name.trim() !== "";
    const [error, setError] = useState(false)

    const onProfileSaved = () => {
        setUserData(nip, name).then((con) => {
            if (con) navigate("/profile")
            else setError(true)
        }).catch((err) => {
            setError(true)
        })
    }

    useEffect(() => {
        setNip(user!.nip);
        setName(user!.name);
    }, [])
    return (
        <div className="flex-1/2  m-4 object-top-right">
            <Typography className="justify-center align-middle">
                <h1>
                    <strong>Edit Profil Guru</strong>
                </h1>
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
                                <Input className="rounded-lg p-2" onChange={(e) => setNip(e.target.value)}
                                    value={nip} />
                            </td>
                        </tr>
                        <tr className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    <strong>Nama</strong>
                                </p>
                            </td>
                            <td className="p-4">
                                <Input className="rounded-lg p-2" onChange={(e) => setName(e.target.value)}
                                    value={name} readOnly={false} />

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="w-full m-2 justify-evenly flex p-3">
                <Button className={`p-3  ${!isFormValid ?
                    "bg-gray-400" : "bg-green-500"}`}
                    disabled={!isFormValid}
                    onClick={() => onProfileSaved()}>
                    <p>Simpan Perubahan</p>
                </Button>
                <Button className="p-3 bg-blue-500" onClick={() => { navigate('/profile') }}>
                    <p>Kembali Ke Profil</p>
                </Button>
            </div>
            {error ?
                (<Card className="m-2 p-4 bg-red-400">

                    <Typography className="text-center">
                        <h1><strong>Terjadi Error!</strong></h1>
                    </Typography>
                    <hr className="m-2"></hr>
                    <Typography>
                        <p>Terjadi kesalahan pada sistem, coba lagi nanti.</p>
                    </Typography>
                </Card>) :
                (<></>)
            }
        </div>
    );
}