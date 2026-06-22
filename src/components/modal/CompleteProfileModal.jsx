import { useState, useEffect } from "react";
import { X, Loader2, ImageIcon, FolderOpen, Camera, FileText } from "lucide-react";
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "@/services/cloudinary/uploadImage.js";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

import { categories } from "@/services/categories";
import { typeIDs } from "@/services/typeIDs";

const inputClass = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
const inputClassDisabled = "w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-500 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

export default function CompleteProfileModal({ open, onClose }) {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const [profileImage, setProfileImage] = useState('');
    const [profileImagePreview, setProfileImagePreview] = useState('');

    const [idType, setIdType] = useState("images");

    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    const [frontPreview, setFrontPreview] = useState(null);
    const [backPreview, setBackPreview] = useState(null);

    const [form, setForm] = useState({
        name: '',
        lastname: '',
        category: '',
        exp: '',
        typeId: '',
        idNumber: '',
        biography: ''
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setProfileImage(file);
            setProfileImagePreview(URL.createObjectURL(file));
        }
    });

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                lastname: user.lastname || "",
                category: categories.find((c) => c.id === user.workerData.category)?.name || "",
                typeId: typeIDs.find((t) => t.id === user.workerData.verification.typeId)?.name || "",
                idNumber: user.workerData.verification.idNumber || "",
            });
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!profileImage || !form.name || !form.lastname || !form.category || !form.exp || !form.typeId || !form.idNumber || !form.biography) {
            setError("Todos los campos son obligatorios");
            setLoading(false);
            return;
        }

        if (form.biography.length < 20) {
            setError("La biografía debe tener al menos 20 caracteres");
            setLoading(false);
            return;
        }

        if (!profileImage) {
            setError('La foto de perfil es obligatoria')
            setLoading(false);
            return;
        }

        if (idType === "images" && (!frontImage || !backImage)) {
            setError('Debes subir el frente y reverso de la identificación')
            setLoading(false);
            return;
        }

        setError("");
        setLoading(true);

        const workerFolder = `servitodo/workers/${form.idNumber}`;

        const profileResult = await uploadImage(profileImage, `${workerFolder}/profile`);
        const frontResult = await uploadImage(frontImage, `${workerFolder}/verification`);
        const backResult = await uploadImage(backImage, `${workerFolder}/verification`);

        if (!profileResult.success || !frontResult.success || !backResult.success) {
            setError("Error subiendo las imágenes. Por favor intenta de nuevo.");
            setLoading(false);
            return;
        }

        await updateDoc(doc(db, "users", user.uid), {
            name: form.name,
            lastname: form.lastname,
            "workerData.exp": form.exp,
            "workerData.biography": form.biography,
            "photoUrl": profileResult.url,
            "workerData.verification.frontImage": frontResult.url,
            "workerData.verification.backImage": backResult.url,
            "workerData.verification.status": "reviewing",
        });

        setLoading(false);
        onClose();
    }

    if (!open) return null;
    return (
        <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Completar perfil</h2>
                        <p className="text-sm text-gray-500 mt-0.5">Completa tu perfil para que puedas estar disponible y verificado</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form className="px-6 py-5 space-y-4 overflow-y-auto">
                    {/* Imagen */}
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                        {profileImagePreview ? (
                            <div className="relative">
                                <img src={profileImagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-full" />
                                <button type="button" onClick={() => { setProfileImage(null); setProfileImagePreview(null); }} className="absolute top-2 right-2 p-1 bg-white rounded-full shadow text-gray-500 hover:text-error transition-colors">
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                {/* Dropzone */}
                                <div {...getRootProps()} className=" w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                                    <input {...getInputProps()} />
                                    <ImageIcon size={28} className="text-gray-400" />
                                    <p className="text-xs text-gray-500 text-center mt-1">
                                        {isDragActive ? 'Suelta aqui...' : 'Arrasta una imagen de perfil aqui'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex-1 h-px bg-gray-200" />
                                    <span className="text-xs text-gray-400">o</span>
                                    <div className="flex-1 h-px bg-gray-200" />
                                </div>

                                {/* Botones */}
                                <div className="flex gap-2 w-full">
                                    <label className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) { setProfileImage(file); setProfileImagePreview(URL.createObjectURL(file)); }
                                        }} />
                                        <FolderOpen size={14} />
                                        Seleccionar foto
                                    </label>

                                    {/* Desde el celular */}
                                    <label className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors sm:hidden">
                                        <input type="file" accept="image/*" capture='environment' className="hidden" onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) { setProfileImage(file); setProfileImagePreview(URL.createObjectURL(file)); }
                                        }} />
                                        <Camera size={14} />
                                        Tomar foto
                                    </label>
                                </div>
                            </div>
                        )}
                        <p className="text-xs text-gray-500 mt-4 text-center">Una foto nítida genera confianza. Utiliza una imagen luminosa y profesional donde tu rostro sea claramente visible.</p>
                    </div>

                    {/* Nombre y apellido */}
                    <div className="lg:flex items-center justify-between gap-3">
                        <div>
                            <label className={labelClass}>Nombre</label>
                            <input
                                type="text"
                                className={inputClass}
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Apellido</label>
                            <input
                                type="text"
                                className={inputClass}
                                value={form.lastname}
                                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Categoria y exp */}
                    <div className="lg:flex items-center justify-between gap-3">
                        <div>
                            <label className={labelClass}>Categoria</label>
                            <input
                                type="text"
                                className={inputClassDisabled}
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                disabled
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Años de experiencia</label>
                            <input
                                type="number"
                                placeholder="5"
                                className={inputClass}
                                value={form.exp}
                                onChange={(e) => setForm({ ...form, exp: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Biografía */}
                    <div>
                        <label className={labelClass}>Biografía</label>
                        <textarea
                            placeholder="Háblales a tus clientes sobre tu experiencia..."
                            className={`${inputClass} resize-none h-24`}
                            value={form.biography}
                            onChange={(e) => setForm({ ...form, biography: e.target.value })}
                        />
                    </div>

                    {/* Identificación */}
                    <div className="lg:flex items-center justify-between gap-3">
                        <div>
                            <label className={labelClass}>Tipo de identificación</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="5"
                                    className={inputClassDisabled}
                                    value={form.type_id}
                                    onChange={(e) => setForm({ ...form, type_id: e.target.value })}
                                    disabled
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Número de identificación</label>
                            <div className="relative">
                                <input className={inputClass} value={form.idNumber} onChange={(e) => setForm({ ...form, idNumber: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* IMG O PDF */}
                    <p className="text-xs text-gray-500 mt-4">
                        Selecciona como quieres subir tu identificación. Puedes subir fotos de ambos lados o un PDF. Asegúrate de que la información sea clara y legible para una verificación rápida.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setIdType("images")}
                            className={`p-4 rounded-xl border-2 transition-all ${idType === "images"
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <ImageIcon size={24} />
                                <span className="text-sm font-medium">
                                    Fotos
                                </span>
                                <span className="text-xs text-gray-500">
                                    Frente y reverso
                                </span>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setIdType("pdf")}
                            className={`p-4 rounded-xl border-2 transition-all ${idType === "pdf"
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <FileText size={24} />
                                <span className="text-sm font-medium">
                                    PDF
                                </span>
                                <span className="text-xs text-gray-500">
                                    Documento completo
                                </span>
                            </div>
                        </button>
                    </div>

                    {idType === "images" ? (
                        <>
                            {frontPreview ? (
                                <div className="relative">
                                    <img
                                        src={frontPreview}
                                        alt="Frente"
                                        className="w-full h-48 object-cover rounded-2xl border border-gray-200"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setFrontPreview(null)}
                                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setFrontImage(file);
                                                setFrontPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />

                                    <Camera size={28} className="text-gray-500" />

                                    <span className="font-medium">
                                        Frente de la identificación
                                    </span>

                                    <span className="text-xs text-gray-500">
                                        JPG o PNG
                                    </span>
                                </label>
                            )}

                            {backPreview ? (
                                <div className="relative">
                                    <img
                                        src={backPreview}
                                        alt="Reverso"
                                        className="w-full h-48 object-cover rounded-2xl border border-gray-200"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setBackPreview(null)}
                                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setBackImage(file);
                                                setBackPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />

                                    <Camera size={28} className="text-gray-500" />

                                    <span className="font-medium">
                                        Reverso de la identificación
                                    </span>

                                    <span className="text-xs text-gray-500">
                                        JPG o PNG
                                    </span>
                                </label>
                            )}
                        </>
                    ) : (
                        pdfFile ? (
                            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <FileText size={24} className="text-red-500" />

                                    <div>
                                        <p className="text-sm font-medium">
                                            {pdfFile.name}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            PDF cargado correctamente
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setPdfFile(null)}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setPdfFile(file);
                                        }
                                    }}
                                />

                                <FileText
                                    size={36}
                                    className="text-red-500"
                                />

                                <span className="font-medium">
                                    Subir PDF
                                </span>

                                <span className="text-xs text-gray-500">
                                    Máximo 10 MB
                                </span>
                            </label>
                        )
                    )}

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                            {error}
                        </p>
                    )}

                    {/* Botones */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center gap-2"
                            onClick={handleUpdate}
                        >
                            {loading ? <><Loader2 size={16} className="animate-spin" /> Enviando...</> : "Enviar verificación"}
                        </button>
                    </div>

                </form>
            </div>
        </motion.div>
    );
}