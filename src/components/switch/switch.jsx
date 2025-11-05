const SwitchRole = ({onChanged}) => {
    return (
        <div className="flex justify-center">
      {/* Opción 1: Ofrecer servicios */}
      <div
        onClick={() => onChanged(0)}
        className="w-36 h-14 flex items-center justify-center rounded-bl-lg transition-all duration-300 cursor-pointer bg-red-500"
      >
        <span className="font-bold">Ofrecer servicios</span>
      </div>

      {/* Opción 2: Solicitar servicios */}
      <div
        onClick={() => onChanged(1)}
        className="w-36 h-14 flex items-center justify-center rounded-tr-lg transition-all duration-300 cursor-pointer bg-blue-500">
        <span className="font-bold">Solicitar servicios</span>
      </div>
    </div>
    )
}

export default SwitchRole;