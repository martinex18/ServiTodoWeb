import { Skeleton } from "@mui/material";

const ServiceDetailsSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-16">
            {/* Botón volver */}
            <div className="px-4 md:px-8 lg:px-10 py-4">
                <Skeleton variant="text" width={100} height={30} />
            </div>

            <div className="px-4 md:px-8 lg:px-10">
                {/* Header */}
                <div className="mb-6">
                    <Skeleton variant="rectangular" width={130} height={28} className="rounded-full mb-3" />
                    <Skeleton variant="text" width={250} height={40} />
                    <Skeleton variant="text" width={180} height={25} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Imagen */}
                        <Skeleton variant="rectangular" height={288} className="rounded-xl" />

                        {/* Descripción */}
                        <div>
                            <Skeleton variant="text" width={250} height={30} />
                            <Skeleton variant="text" height={20} />
                            <Skeleton variant="text" height={20} />
                            <Skeleton variant="text" width="80%" height={20} />
                        </div>

                        {/* Disponibilidad */}
                        <div>
                            <Skeleton variant="text" width={180} height={25} />
                            <div className="flex gap-2 my-2">
                                <Skeleton variant="rectangular" width={60} height={28} className="rounded-lg" />
                                <Skeleton variant="rectangular" width={60} height={28} className="rounded-lg" />
                                <Skeleton variant="rectangular" width={60} height={28} className="rounded-lg" />
                            </div>
                            <Skeleton variant="text" width={120} height={20} className="mt-2" />
                        </div>

                        {/* Worker */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
                            <Skeleton variant="text" width={200} height={25} className="mb-4" />

                            <div className="flex flex-col justify-between sm:flex-row sm:items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <Skeleton variant="circular" width={56} height={56} />
                                    <div className="flex-1 space-y-1">
                                        <Skeleton variant="text" width={150} height={20} />
                                        <Skeleton variant="text" width={200} height={20} />
                                        <Skeleton variant="text" width={120} height={20} />
                                        <Skeleton variant="text" width={160} height={20} />
                                    </div>
                                </div>

                                <Skeleton variant="rectangular" width={120} height={36} className="w-full sm:w-auto rounded-xl" />
                            </div>
                        </div>

                        {/* Mapa */}
                        <div>
                            <div className="flex justify-between mb-3">
                                <Skeleton variant="text" width={180} height={25} />
                                <Skeleton variant="text" width={120} height={20} />
                            </div>

                            <Skeleton variant="rectangular" height={256} className="rounded-xl" />
                            <Skeleton variant="text" width={250} height={20} className="mt-2" />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <aside className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-24">
                            {/* Precio */}
                            <div className="mb-5">
                                <Skeleton variant="text" width={180} height={20} />
                                <Skeleton variant="text" width={140} height={40} />
                            </div>

                            {/* Breakdown */}
                            <div className="p-3 bg-gray-50 rounded-xl mb-5 space-y-2">
                                <Skeleton variant="text" height={30} />
                                <Skeleton variant="text" height={30} />
                            </div>

                            {/* Botones */}
                            <Skeleton variant="rectangular" height={45} className="rounded-xl mb-3" />
                            <Skeleton variant="rectangular" height={45} className="rounded-xl mb-3" />

                            <Skeleton variant="text" height={20} />
                            <Skeleton variant="text" height={20} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsSkeleton;