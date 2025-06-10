import { Typography } from "@material-tailwind/react"
import { useEffect, useState } from "react";
import type { School } from "../types/School";
import { getSchoolList } from "../api/schoolApi";
import { useUser } from "../context/userContext";

export default function SchoolProfile() {

  const [school, setSchool] = useState<School | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    getSchoolList()
      .then((data) => {
        console.log(data)
        const sch = data.find((x) => x.npsn == user?.npsn)
        setSchool(sch)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load user data');
        setLoading(false);
      });
  }, []);


  return (
    <div className="flex-1/2 m-4 object-top-left h-fit">
      <Typography className="justify-center align-middle">
        <strong>Profil Sekolah</strong>
      </Typography>
      <div
        className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
        <table className="w-full text-left table-auto min-w-max">
          {
            <tbody>
              <tr className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                    Dinas Pendidikan
                  </p>
                </td>
                <td className="p-4">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {school ? school.dinasPendidikan : "Belum Pilih Sekolah"}
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
                    {school ? school.npsn : "Belum Pilih Sekolah"}
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
                    {school ? school.nss : "Belum Pilih Sekolah"}
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
                    {school ? school.nipKepalaSekolah : "Belum Pilih Sekolah"}
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
                    {school ? school.kepalaSekolah : "Belum Pilih Sekolah"}
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
                    {school ? school.alamat : "Belum Pilih Sekolah"}
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
                    {school ? school.satuanPendidikan : "Belum Pilih Sekolah"}
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
                    {school ? school.kecamatan : "Belum Pilih Sekolah"}
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
                    {school ? school.kabupaten : "Belum Pilih Sekolah"}
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
                    {school ? school.provinsi : "Belum Pilih Sekolah"}
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
                    {school ? school.kodePos : "Belum Pilih Sekolah"}
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
                    {school ? school.website : "Belum Pilih Sekolah"}

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
                    {school ? school.email : "Belum Pilih Sekolah"}

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
                    {school ? school.telp : "Belum Pilih Sekolah"}

                  </p>
                </td>
              </tr>
            </tbody>}
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