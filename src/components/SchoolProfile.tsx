import { Typography } from "@material-tailwind/react"

export default function SchoolProfile() {
  return (
    <div className="flex-1/2 m-4 object-top-left">
      <Typography className="justify-center align-middle">
        <h1>
          <strong>Profil Sekolah</strong>
        </h1>
      </Typography>
      <div
        className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
        <table className="w-full text-left table-auto min-w-max">
          <tbody>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Dinas Pendidikan
                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
                </p>
              </td>
            </tr>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  NPSN
                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
                </p>
              </td>
            </tr>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  NSS
                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
                </p>
              </td>
            </tr>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Alamat
                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
                </p>
              </td>
            </tr>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Dinas Pendidikan
                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Desa
                </p>
              </td>
            </tr>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Kecamatan
                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
                </p>
              </td>
            </tr>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Kabupaten
                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
                </p>
              </td>
            </tr>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Provinsi                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
                </p>
              </td>
            </tr>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Kode Pos                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
                </p>
              </td>
            </tr>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Website                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
                </p>
              </td>
            </tr>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  E-Mail                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
                </p>
              </td>
            </tr>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  No. Telepon                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
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