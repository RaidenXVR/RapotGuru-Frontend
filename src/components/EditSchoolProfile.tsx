import { Button, Card, Input, Typography } from "@material-tailwind/react";
import type { School } from "../types/School";
import { useEffect, useState } from "react";
import { getSchoolList, setSchoolData, updateSchoolData } from "../api/schoolApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";


export default function EditSchoolProfile() {
    const [schools, setSchools] = useState<School[]>([]);
    const { setUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const oldProfile: School | undefined = location.state?.oldProfile

    const [disPen, setDisPen] = useState<string>("");
    const [npsn, setNpsn] = useState<string>("");
    const [nss, setNss] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [satPen, setSatPen] = useState<string>("");
    const [village, setVillage] = useState<string>("");
    const [subDis, setSubDis] = useState<string>("");
    const [regen, setRegen] = useState<string>("");
    const [prov, setProv] = useState<string>("");
    const [postCode, setPostCode] = useState<string>("");
    const [web, setWeb] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telp, setTelp] = useState<string>("");
    const [headmaster, setHeadmaster] = useState<string>("");
    const [nipHeadmaster, setNipHeadmaster] = useState<string>("");

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

    const isEditMode = !!oldProfile;

    useEffect(() => {
        if (oldProfile) {
            setDisPen(oldProfile.dinasPendidikan);
            setNpsn(oldProfile.npsn);
            setNss(oldProfile.nss);
            setAddress(oldProfile.alamat);
            setSatPen(oldProfile.satuanPendidikan);
            setVillage(oldProfile.desa);
            setSubDis(oldProfile.kecamatan);
            setRegen(oldProfile.kabupaten);
            setProv(oldProfile.provinsi);
            setPostCode(oldProfile.kodePos);
            setWeb(oldProfile.website);
            setEmail(oldProfile.email);
            setTelp(oldProfile.telp);
            setHeadmaster(oldProfile.kepalaSekolah || "");
            setNipHeadmaster(oldProfile.nipKepalaSekolah || "");
        }
    }, [oldProfile]);

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

    const onChangesSaved = () => {
        if (isEditMode) {
            updateSchoolData(disPen, satPen, npsn, nss, address, village, subDis, regen, prov, postCode, web, email, telp)
                .then((con) => {
                    if (con) navigate("/profile")

                })
        }
        else {
            setSchoolData(disPen, satPen, npsn, nss, address, village, subDis, regen, prov, postCode, web, email, telp)
                .then((con) => {
                    if (con) navigate("/profile")
                })
        }
    }

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
                                            <Input className="rounded-lg p-2" onChange={(e) => setDisPen(e.target.value)}
                                                value={disPen} />
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
                                            <Input className=" p-2 rounded-lg"
                                                onChange={(e) => {
                                                    const cleaned = e.target.value.replace(/\D/g, "");
                                                    setNpsn(cleaned);
                                                    e.target.value = cleaned
                                                }}
                                                value={npsn}
                                                disabled={isEditMode} />
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
                                            <Input className="rounded-lg p-2"
                                                onChange={(e) => {
                                                    const cleaned = e.target.value.replace(/\D/g, "");
                                                    setNss(cleaned);
                                                    e.target.value = cleaned
                                                }}
                                                value={nss}
                                                disabled={isEditMode} />
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            Kepala Sekolah
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" onChange={(e) => setHeadmaster(e.target.value)}
                                                value={headmaster} />
                                        </p>
                                    </td>
                                </tr>
                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            NIP Kepala Sekolah
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" onChange={(e) => setNipHeadmaster(e.target.value)}
                                                value={nipHeadmaster} />
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
                                            <Input className="rounded-lg p-2" onChange={(e) => setAddress(e.target.value)}
                                                value={address} />
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
                                            <Input className="rounded-lg p-2" onChange={(e) => setSatPen(e.target.value)}
                                                value={satPen} />
                                        </p>
                                    </td>
                                </tr>

                                <tr className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            Desa
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            <Input className="rounded-lg p-2" onChange={(e) => setSubDis(e.target.value)}
                                                value={subDis} />
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
                                            <Input className="rounded-lg p-2" onChange={(e) => setSubDis(e.target.value)}
                                                value={subDis} />
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
                                            <Input className="rounded-lg p-2" onChange={(e) => setRegen(e.target.value)}
                                                value={regen} />
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
                                            <Input className="rounded-lg p-2" onChange={(e) => setProv(e.target.value)}
                                                value={prov} />
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
                                            <Input className="rounded-lg p-2"
                                                onChange={(e) => {
                                                    const cleaned = e.target.value.replace(/\D/g, "");
                                                    setPostCode(cleaned);
                                                    e.target.value = cleaned

                                                }}
                                                value={postCode} />
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
                                            <Input className="rounded-lg p-2" onChange={(e) => setWeb(e.target.value)}
                                                value={web} />
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
                                            <Input className="rounded-lg p-2" onChange={(e) => setEmail(e.target.value)}
                                                value={email} />

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
                                            <Input className="rounded-lg p-2"
                                                onChange={(e) => {
                                                    const cleaned = e.target.value.replace(/\D/g, "");
                                                    setTelp(cleaned);
                                                    e.target.value = cleaned
                                                }}
                                                value={telp} />
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
                        disabled={(!isEditMode && (npsnList.includes(npsn) || nssList.includes(nss))) || !isFormValid}
                        onClick={() => onChangesSaved()}>
                        <p>{isEditMode ? "Edit Profil Sekolah" : "Tambah profil Sekolah"}</p>
                    </Button>
                    <Button className="p-3 bg-blue-500" onClick={() => { navigate('/profile') }}>
                        <p>Kembali Ke List</p>
                    </Button>
                </div>
            </div>

        </div >
    );
}