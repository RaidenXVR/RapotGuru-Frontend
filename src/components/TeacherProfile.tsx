import { Typography } from "@material-tailwind/react"
import { useUser } from "../context/userContext";
import { useState } from "react";

export default function TeacherProfile() {
    const { user } = useUser();
    const [isEditing, setIsEditing] = useState(false);

    // Extended teacher profile fields - you can add more based on your user data structure
    const teacherFields = [
        { label: "NIP", value: user?.nip, icon: "🆔", key: "nip" },
        { label: "Nama Lengkap", value: user?.name, icon: "👨‍🏫", key: "name" },
        { label: "Email", value: user?.email, icon: "📧", key: "email", isEmail: true },
        { label: "No. Telepon", value: user?.phone || "Belum diatur", icon: "📞", key: "phone" },
        { label: "Mata Pelajaran", value: user?.subject || "Belum diatur", icon: "📚", key: "subject" },
        { label: "Jabatan", value: user?.position || "Guru", icon: "👔", key: "position" },
        { label: "Status", value: user?.status || "Aktif", icon: "✅", key: "status" },
        { label: "Bergabung Sejak", value: user?.joinDate || "Belum diatur", icon: "📅", key: "joinDate" }
    ];

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            "Aktif": { bg: "bg-green-100", text: "text-green-800", icon: "✅" },
            "Tidak Aktif": { bg: "bg-red-100", text: "text-red-800", icon: "❌" },
            "Cuti": { bg: "bg-yellow-100", text: "text-yellow-800", icon: "⏳" }
        };
        
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig["Aktif"];
        
        return (
            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
                <span>{config.icon}</span>
                <span>{status}</span>
            </span>
        );
    };

    return (
        <div className="flex-1 m-2 sm:m-4 lg:m-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                {/* Header with Avatar */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl sm:text-5xl border-4 border-white/30 shadow-lg">
                                👨‍🏫
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                                <span className="text-white text-sm">✓</span>
                            </div>
                        </div>
                        
                        {/* Profile Info */}
                        <div className="text-center sm:text-left flex-1">
                            <Typography className="text-white font-bold text-2xl sm:text-3xl mb-2">
                                {user?.name || "Nama Guru"}
                            </Typography>
                            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-white/90">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg">🆔</span>
                                    <span className="font-medium">{user?.nip || "NIP tidak tersedia"}</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg">📚</span>
                                    <span className="font-medium">{user?.subject || "Mata Pelajaran"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-medium text-sm border border-white/30 hover:border-white/50"
                            >
                                {isEditing ? "💾 Simpan" : "✏️ Edit"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="p-6 sm:p-8">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <span className="text-white text-lg">📋</span>
                                </div>
                                <div>
                                    <p className="text-blue-800 font-semibold text-lg">5</p>
                                    <p className="text-blue-600 text-sm">Kelas Diampu</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-500 rounded-lg">
                                    <span className="text-white text-lg">👥</span>
                                </div>
                                <div>
                                    <p className="text-green-800 font-semibold text-lg">120</p>
                                    <p className="text-green-600 text-sm">Total Siswa</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-500 rounded-lg">
                                    <span className="text-white text-lg">⭐</span>
                                </div>
                                <div>
                                    <p className="text-purple-800 font-semibold text-lg">4.8</p>
                                    <p className="text-purple-600 text-sm">Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Fields */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <Typography className="text-lg font-bold text-gray-800">
                                Informasi Detail
                            </Typography>
                            <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {teacherFields.map((field, index) => (
                                <div
                                    key={index}
                                    className="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 p-4 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-md"
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                                            {field.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Typography className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                {field.label}
                                            </Typography>
                                            <div className="break-words">
                                                {field.key === "status" ? (
                                                    getStatusBadge(field.value || "Aktif")
                                                ) : field.isEmail && field.value && field.value !== "Belum diatur" ? (
                                                    <a
                                                        href={`mailto:${field.value}`}
                                                        className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base transition-colors duration-300 hover:underline"
                                                    >
                                                        {field.value}
                                                    </a>
                                                ) : (
                                                    <Typography className={`font-medium text-sm sm:text-base ${
                                                        field.value === "Belum diatur" 
                                                            ? "text-gray-400 italic" 
                                                            : "text-gray-800"
                                                    }`}>
                                                        {field.value || "Tidak tersedia"}
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="text-2xl">📊</span>
                            <Typography className="font-bold text-gray-800">
                                Aktivitas Terbaru
                            </Typography>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-600">Mengupdate rapor kelas 1A - 2 jam yang lalu</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-600">Login sistem - 4 jam yang lalu</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-gray-600">Menambah data siswa baru - 1 hari yang lalu</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                        <div className="flex items-center space-x-2 text-blue-700">
                            <span className="text-lg">ℹ️</span>
                            <Typography className="text-sm font-medium">
                                Profil terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
                            </Typography>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                                📄 Unduh Profil
                            </button>
                            <button className="px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md">
                                🔄 Sinkronisasi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}