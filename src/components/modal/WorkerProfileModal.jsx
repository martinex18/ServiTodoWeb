import { useEffect } from "react";
import { Avatar, Badge, Divider } from "@mui/material";
import { Briefcase, Check, CheckCircle, Clock, MedalIcon, Star, X } from "lucide-react";

export default function WorkerProfileModal({ open, onClose, worker }) {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Perfil del trabajador</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors hover:cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>
                <Divider />
                <div className="px-6 py-5 overflow-y-auto">
                    <div className="w-full flex items-center gap-4">
                        <Badge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} badgeContent={
                            <Check size={25} className="bg-green-500 text-white rounded-full p-1" />
                        }>
                            <Avatar alt={worker?.name} sx={{ width: 90, height: 90, bgcolor: '#5f8d92' }}>{worker?.name?.charAt(0) || "?"}</Avatar>
                        </Badge>
                        <div className="flex-1">
                            <h1 className="font-bold text-gray-900 text-xl sm:text-2xl md:text-3xl wrap-break-word">{worker?.name}</h1>
                            <span className="flex items-center gap-2 text-sm sm:text-base">
                                <Briefcase size={16} /> {worker?.job}
                            </span>
                            <span className="flex items-center gap-2 text-sm sm:text-base">
                                <Star size={16} /> 4.9 (128 reviews)
                            </span>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 my-10 gap-4">
                        <div className="flex flex-col items-center justify-center bg-gray-200 gap-1 rounded-md">
                            <MedalIcon size={30} />
                            <p className="font-black text-gray-900 text-3xl">{parseInt(worker?.exp)}</p>
                            <p className="text-gray-500 text-sm">Años de exp.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-200 gap-1 py-2 rounded-md w-full">
                            <CheckCircle size={30} />
                            <p className="font-black text-gray-900 text-3xl">100+</p>
                            <p className="text-gray-500 text-sm text-center">Trabajos complet.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-200 gap-1 rounded-md">
                            <Clock size={30} />
                            <p className="font-black text-gray-900 text-3xl"> {'< 5m'} </p>
                            <p className="text-gray-500 text-sm text-center">Tiempo de resp.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <h2 className="text-gray-600">Biogarfia</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit facere laborum, minima praesentium quasi ex blanditiis aspernatur reiciendis quam sequi beatae ducimus, necessitatibus cum. At facere corporis sint itaque tenetur.</p>
                    </div>

                    <div className="flex gap-3 pt-1 mt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancelar</button>

                        <button type="button" className="flex-1 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                            Contactar
                        </button>
                    </div>
                </div>
            </div>

        </div >
    )
}