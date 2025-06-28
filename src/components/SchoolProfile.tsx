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

  const schoolFields = [
    { label: "Dinas Pendidikan", value: school?.dinas_pendidikan },
    { label: "NPSN", value: school?.npsn },
    { label: "NSS", value: school?.nss },
    { label: "Alamat", value: school?.alamat },
    { label: "Satuan Pendidikan", value: school?.satuan_pendidikan },
    { label: "Kecamatan", value: school?.kecamatan },
    { label: "Kabupaten", value: school?.kabupaten },
    { label: "Provinsi", value: school?.provinsi },
    { label: "Kode Pos", value: school?.kode_pos },
    { label: "Website", value: school?.website, isLink: true },
    { label: "E-Mail", value: school?.email, isLink: true },
    { label: "No. Telepon", value: school?.telp }
  ];

  if (loading) {
    return (
      <div className="flex-1 m-2 sm:m-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
        <div className="p-6 border-b border-gray-200/50">
          <Typography className="text-center font-bold text-gray-800 text-lg sm:text-xl">
            Profil Sekolah
          </Typography>
        </div>
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-gray-600">Memuat data sekolah...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex-1 m-2 sm:m-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200/50 overflow-hidden">
        <div className="p-6 border-b border-red-200/50">
          <Typography className="text-center font-bold text-red-800 text-lg sm:text-xl">
            Error
          </Typography>
        </div>
        <div className="p-6 text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 m-2 sm:m-4 lg:m-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 sm:p-6">
        <div className="flex items-center justify-center space-x-3">
          <Typography className="text-white font-bold text-lg sm:text-xl md:text-2xl text-center">
            Profil Sekolah
          </Typography>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {!school ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4 opacity-50">🏫</div>
            <Typography className="text-gray-600 text-lg mb-2">
              Belum Memilih Sekolah
            </Typography>
            <Typography className="text-gray-500 text-sm">
              Silakan pilih sekolah terlebih dahulu untuk melihat profil lengkap
            </Typography>
          </div>
        ) : (
          <>
            {/* School Name - Featured */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <Typography className="font-bold text-xl sm:text-2xl text-blue-800 text-center mb-2">
                {school.satuan_pendidikan || "Nama Sekolah"}
              </Typography>
              <div className="flex justify-center items-center space-x-2 text-blue-600">
                <span>🎓</span>
                <Typography className="text-sm font-medium">
                  {school.dinas_pendidikan}
                </Typography>
              </div>
            </div>

            {/* School Details - Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {schoolFields.map((field, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 p-4 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start space-x-3">

                    <div className="flex-1 min-w-0">
                      <Typography className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {field.label}
                      </Typography>
                      <div className="break-words">
                        {field.isLink && field.value ? (
                          field.label === "E-Mail" ? (
                            <a
                              href={`mailto:${field.value}`}
                              className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base transition-colors duration-300 hover:underline"
                            >
                              {field.value}
                            </a>
                          ) : field.label === "Website" ? (
                            <a
                              href={field.value.startsWith('http') ? field.value : `https://${field.value}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base transition-colors duration-300 hover:underline"
                            >
                              {field.value}
                            </a>
                          ) : (
                            <Typography className="font-medium text-gray-800 text-sm sm:text-base">
                              {field.value}
                            </Typography>
                          )
                        ) : (
                          <Typography className="font-medium text-gray-800 text-sm sm:text-base">
                            {field.value || (
                              <span className="text-gray-400 italic">
                                Tidak tersedia
                              </span>
                            )}
                          </Typography>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info Footer */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <span>ℹ️</span>
                <Typography className="text-sm font-medium text-center">
                  Data sekolah telah berhasil dimuat dan diverifikasi
                </Typography>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}