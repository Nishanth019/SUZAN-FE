import React from "react";

const Genders = ({ selectedGender, obj }) => {
  const genders = ["male", "female", "others"];

  return (
    <select
      className="w-full md:flex-1"
      value={selectedGender}
      onChange={(e) => onChange(e.target.value)}
    >
      {genders.map((gender) => (
        <option key={gender} value={gender}>
          {gender}
        </option>
      ))}
    </select>
  );
}

export default Genders;