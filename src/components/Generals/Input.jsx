const Input = ({ handleChange, label, name, value, type = "text", placeholder = "", disabled = false,error, touched={} }) => {
    return (
      <div className="w-full md:flex-1">
        <h1 className="text-neutral-500">{label}</h1>
        <input
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className={`border w-full px-6 py-3 rounded-full ${touched[name] && error[name] ? "border-red-500": ""} mt-2 text-lg focus:outline-blue-50`}
        />
        {error && <p className="text-xs m-1 text-red-500">{touched[name] && error[name]}</p>}
      </div>
    )
  }
  
  export default Input