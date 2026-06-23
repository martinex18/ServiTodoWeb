// components/ActionButton.jsx

const ActionButton = ({
    icon: Icon,
    title,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-200 transition-colors text-left group cursor-pointer"
        >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors">
                <Icon
                    size={20}
                    className="text-gray-500 group-hover:text-primary transition-colors"
                />
            </div>

            <span className="text-sm font-medium text-gray-700 tracking-wide">
                {title}
            </span>
        </button>
    );
};

export default ActionButton;