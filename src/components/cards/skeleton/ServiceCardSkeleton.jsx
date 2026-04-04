import { Skeleton } from "@mui/material"

const ServiceCardSkeleton = () => {
    return (
        <div className="w-[320px] h-[400px] bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            {/*IMG*/}
            <Skeleton variant="rectangular" height={178} animation="wave" className="rounded-t-2xl" />

            <div className="p-4 flex-1">
                {/*reviews*/}
                <div className="w-full">
                    <Skeleton variant="text" animation="wave" height={22} width={100} />
                </div>

                {/*title and description*/}
                <div className="h-24">
                    <Skeleton variant="text" animation="wave" height={25} width={32} />
                    <Skeleton variant="text" animation="wave" height={25} />
                    <Skeleton variant="text" animation="wave" height={50} />
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <Skeleton variant="circular" animation="wave" width={32} height={32} />

                    {/*Worker info*/}
                    <div className="flex flex-col items-start">
                        <Skeleton variant="text" animation="wave" width={50} height={20} className="text-xs font-medium" />
                        <Skeleton variant="text" animation="wave" width={80} height={20} className="text-xs flex items-center gap-0.5" />
                    </div>
                </div>
                <Skeleton variant="rectangular" animation="wave" height={40} className="rounded-xl mt-4" />
            </div>
        </div>
    )
}

export default ServiceCardSkeleton;