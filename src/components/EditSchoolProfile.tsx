import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { School } from "../types/School";
import { useEffect, useState } from "react";
import { getSchoolList } from "../api/schoolApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";


export default function EditSchoolProfile() {
    const [schools, setSchools] = useState<School[]>([]);
    const { setUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const oldProfile = location.state?.oldProfile

    const [disPen, setDisPen] = useState<String>("");
    const [npsn, setNpsn] = useState<String>("");
    const [nss, setNss] = useState<String>("");
    const [address, setAddress] = useState<String>("");
    const [satPen, setSatPen] = useState<String>("");
    const [subDis, setSubDis] = useState<String>("");
    const [regen, setRegen] = useState<String>("");
    const [prov, setProv] = useState<String>("");
    const [postCode, setPostCode] = useState<String>("");
    const [web, setWeb] = useState<String>("");
    const [email, setEmail] = useState<String>("");
    const [telp, setTelp] = useState<String>("");

    const [npsnList, setNpsnList] = useState<String[]>([])
    const [nssList, setNssList] = useState<String[]>([])

    const isFormValid = disPen.trim() !== "" && npsn.trim() !== ""
        && nss.trim() !== ""
        && address.trim() !== ""
        && satPen.trim() !== ""
        && subDis.trim() !== ""
        && regen.trim() !== ""
        && prov.trim() !== ""
        && postCode.trim() !== "";

    let isEditMode = false;

    if (oldProfile) {
        isEditMode = true
    }

    useEffect(() => {
        getSchoolList()
            .then((data) => {
                console.log(data)
                setSchools(data);

                const newNpsnList = data.map((s) => s.npsn);
                const newNssList = data.map((s) => s.nss);

                setNpsnList(newNpsnList);
                setNssList(newNssList);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="flex flex-row w-full object-center m-2 justify-center">

            <div className="flex m-2 rounded-2xl h-fit w-1/2 flex-col">

                <div
                    className="relative flex flex-col w-full h-fit overflow-visible text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                    <table className="w-full text-left table-auto min-w-max">
                        {
                            <tbody>
                                <tr>
                                    <td className="p-4">
                                        <Typography className="justify-center align-middle">
                                            <h1>
                                                <strong>Profil Sekolah</strong>
                                            </h1>
                                        </Typography>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            Dinas Pendidikan
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" crossOrigin={undefined} onChange={(e) => setDisPen(e.target.value)} />
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            NPSN
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className=" p-2 rounded-lg" crossOrigin={undefined}
                                                onChange={(e) => {
                                                    const cleaned = e.target.value.replace(/\D/g, "");
                                                    setNpsn(cleaned);
                                                    e.target.value = cleaned
                                                }} />
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            NSS
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" crossOrigin={undefined}
                                                onChange={(e) => {
                                                    const cleaned = e.target.value.replace(/\D/g, "");
                                                    setNss(cleaned);
                                                    e.target.value = cleaned
                                                }} />
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            Alamat
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" crossOrigin={undefined} onChange={(e) => setAddress(e.target.value)} />
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            Satuan Pendidikan
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" crossOrigin={undefined} onChange={(e) => setSatPen(e.target.value)} />
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            Kecamatan
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" crossOrigin={undefined} onChange={(e) => setSubDis(e.target.value)} />
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            Kabupaten
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" crossOrigin={undefined} onChange={(e) => setRegen(e.target.value)} />
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            Provinsi                </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" crossOrigin={undefined} onChange={(e) => setProv(e.target.value)} />
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            Kode Pos                </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" crossOrigin={undefined}
                                                onChange={(e) => {
                                                    const cleaned = e.target.value.replace(/\D/g, "");
                                                    setPostCode(cleaned);
                                                    e.target.value = cleaned

                                                }} />
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            Website                </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" crossOrigin={undefined} onChange={(e) => setWeb(e.target.value)} />

                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            E-Mail                </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" crossOrigin={undefined} onChange={(e) => setEmail(e.target.value)} />

                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className=" block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            No. Telepon                </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" crossOrigin={undefined}
                                                onChange={(e) => {
                                                    const cleaned = e.target.value.replace(/\D/g, "");
                                                    setTelp(cleaned);
                                                    e.target.value = cleaned
                                                }} />

                                        </p>
                                    </td>
                                </tr>
                            </tbody>}
                    </table>
                </div>
            </div>
            <div className="w-1/3 m-2">
                <Card className="m-2 p-4" onClick={() => console.log(npsn.trim())}>
                    <Typography className="text-center">
                        <h1><strong>Isi Identitas Sekolah</strong></h1>
                    </Typography>
                    <hr className="m-2"></hr>
                    <Typography>
                        <p>Jika Identitas sekolah sudah ada, pilih sekolah di halaman sebelumnya. Akan ada peringatan jika NPSN atau NSS sudah ada.</p>
                    </Typography>
                </Card>
                {!isEditMode && (npsnList.includes(npsn) || nssList.includes(nss)) ?
                    (
                        <Card className="m-2 p-4 bg-red-400">

                            <Typography className="text-center">
                                <h1><strong>Identitas Sekolah Sudah Ada!</strong></h1>
                            </Typography>
                            <hr className="m-2"></hr>
                            <Typography>
                                <p>NPSN atau NSS sudah ada di Database, silahkan kembali ke halaman sebelumnya.</p>
                            </Typography>
                        </Card>
                    ) :
                    (<></>)
                }
                <div className="w-full m-2 justify-evenly flex p-3">
                    <Button className={`p-3  ${(!isEditMode && (npsnList.includes(npsn) || nssList.includes(nss))) || !isFormValid ?
                        "bg-gray-400" : "bg-green-500"}`}
                        disabled={(!isEditMode && (npsnList.includes(npsn) || nssList.includes(nss))) || !isFormValid}>
                        <p>Tambah Sekolah</p>
                    </Button>
                    <Button className="p-3 bg-blue-500" onClick={() => { navigate('/school-profile') }}>
                        <p>Kembali Ke List</p>
                    </Button>
                </div>
            </div>

        </div >
    );
}