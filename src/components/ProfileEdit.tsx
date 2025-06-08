import { CheckIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import { Button } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import SchoolProfile from "./SchoolProfile";
import { useEffect, useMemo, useState } from "react";
import { getSchoolList, setUserSchool } from "../api/schoolApi";
import { getUserData, } from "../api/userApi"
import type { School } from "../types/School";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import TeacherProfile from "./TeacherProfile";

export default function ProfileEdit() {

    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const { user, setUser } = useUser();
    const navigate = useNavigate();


    const filteredSchools = useMemo(() => {
        return schools.filter((s) =>
            Object.values(s).some((val) =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [schools, searchTerm]);

    const sortedSchools = useMemo(() => {
        if (!user) return filteredSchools;

        const userSchool = filteredSchools.find(s => s.npsn === user.npsn);
        const otherSchools = filteredSchools.filter(s => s.npsn !== user.npsn);

        return userSchool ? [userSchool, ...otherSchools] : filteredSchools;
    }, [filteredSchools, user]);


    const rowsPerPage = 10;
    const paginatedSchools = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedSchools.slice(start, start + rowsPerPage);
    }, [sortedSchools, currentPage]);


    const totalPages = Math.ceil(sortedSchools.length / rowsPerPage);

    useEffect(() => {
        setLoading(true);

        Promise.all([
            getUserData('123456789'),
            getSchoolList()
        ])
            .then(([userData, schoolData]) => {
                setUser(userData);
                setSchools(schoolData);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load data");
                setLoading(false);
            });
    }, [refreshKey]);


    if (loading) return <div>Loading schools...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div>

            <TeacherProfile />
            <div className="w-full top-0 right-0 flex-col-reverse">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/profile/edit-teacher")} className="flex top-0 right-0 ml-3 object-right p-3 bg-green-500">
                    <h1>Edit Profil Guru</h1>
                </Button>
            </div>
            <SchoolProfile />
            <div className="m-3 flex w-full">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/profile/new-school")}
                    className="flex top-0 right-0 ml-3 object-right p-3 bg-green-500">
                    <h1>+ Tambah Profil Sekolah</h1>
                </Button>
            </div>
            <div className="flex-1/2 m-4 object-top-left">
                <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
                    <div className="ml-3">
                        <div className="w-full max-w-sm min-w-[200px] relative">
                            <div className="relative">
                                <input
                                    className=" w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Cari Sekolah..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1); // reset to page 1 on new search
                                    }}
                                />
                                <button
                                    className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                    type="button"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">
                                        NPSN
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">
                                        Satuan Pendidikan
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">
                                        Kecamatan
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">
                                        Provinsi
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">
                                        Dinas Pendidikan                            </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">
                                        NSS
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">
                                        Aksi
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedSchools.map((school, index) => (
                                <tr key={school.npsn} className="hover:bg-slate-50">
                                    <td className="p-4 border-b border-slate-200 py-5">
                                        <p className="block font-semibold text-sm text-slate-800">{school.npsn}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200 py-5">
                                        <p className="text-sm text-slate-500">{school.satuanPendidikan}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200 py-5">
                                        <p className="text-sm text-slate-500">{school.kecamatan}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200 py-5">
                                        <p className="text-sm text-slate-500">{school.provinsi}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200 py-5">
                                        <p className="text-sm text-slate-500">{school.dinasPendidikan}</p>
                                    </td>

                                    <td className="p-4 border-b border-slate-200 py-5">
                                        <p className="text-sm text-slate-500">{school.nss}</p>
                                    </td>
                                    <td className="border-b border-slate-200">
                                        {user?.npsn == school.npsn ?
                                            (<IconButton
                                                variant="ghost"
                                                className="bg-green-500 w-12 h-12 content-center"
                                                onClick={() => navigate('/profile/edit-school', { state: { oldProfile: school } })}
                                            >
                                                <PencilSquareIcon className="h-8 w-8" color="white" />
                                            </IconButton>) :
                                            (<IconButton
                                                variant="ghost"
                                                className="bg-blue-500 w-12 h-12 content-center"
                                                onClick={async () => {
                                                    await setUserSchool(user!!.nip, school.npsn);
                                                    const newUser = await getUserData(user!!.nip);
                                                    setUser(newUser); // immediate state update
                                                    setRefreshKey(prev => prev + 1)
                                                }}
                                            >
                                                <CheckIcon className="h-8 w-8" color="white" />
                                            </IconButton>)
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {<div className="flex justify-center mt-4 space-x-2">
                            <button
                                className="px-3 py-1 border rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                className="px-3 py-1 border rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                        }
                    </table>
                </div>
            </div>
        </div >
    );
}