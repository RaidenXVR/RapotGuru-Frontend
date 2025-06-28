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
    ];

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

                                                <Typography className={`font-medium text-sm sm:text-base ${field.value === "Belum diatur"
                                                    ? "text-gray-400 italic"
                                                    : "text-gray-800"
                                                    }`}>
                                                    {field.value || "Tidak tersedia"}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}