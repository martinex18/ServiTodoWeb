const CustomCard = ({ header, body, footer, className = '' }) => {
    return (
        <div className={`w-[320px] h-[400px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col ${className}`}>
            {header && (
                <div className="overflow-hidden rounded-t-2xl">
                    {header}
                </div>
            )}
            {body && (
                <div className="p-4 flex-1">
                    {body}
                </div>
            )}
            {footer && (
                <div className="px-4 pb-4">
                    {footer}
                </div>
            )}
        </div>
    )
}

export default CustomCard;