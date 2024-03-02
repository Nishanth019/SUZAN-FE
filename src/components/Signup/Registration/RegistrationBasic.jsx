const genders = ["male", "female", "others"];
const companyCategory = [
  "Proprietor",
  "Partnership",
  "Limited Liability Partnership",
  "Private Company",
  "Public Company",
];

const RegistrationBaisc = ({ details, setDetails, user,formikForm }) => {
  console.log(user)
  const handleChange = (e) => {
    formikForm.setValues({ ...formikForm.values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
        <div className="w-full md:w-full md:flex-1">
          <h1 className="text-neutral-500">Full name</h1>
          <input
            type="text"
            name="name"
            value={formikForm?.values?.name}
            onChange={formikForm?.handleChange}
            className={`w-full border px-6 py-3 ${formikForm?.touched?.name && formikForm?.errors?.name ? "border-red-500":""} rounded-full mt-2 text-lg`}
          />
          <p className="text-xs text-red-500 m-1">{formikForm?.touched?.name && formikForm?.errors?.name}</p>
        </div>
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Email ID</h1>
          <input
            type="email"
            pattern="/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/"
            name="email"
            value={formikForm?.values?.email}
            onChange={formikForm?.handleChange}
            className={`border w-full px-6 py-3 ${formikForm?.touched?.email && formikForm?.errors?.email ? "border-red-500":""} rounded-full mt-2 text-lg`}
          />
        <p className="text-xs text-red-500 m-1">{formikForm?.touched?.email && formikForm?.errors?.email}</p>
        </div>

      </div>
      <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Mobile Number</h1>
          <input
            type="text"
            placeholder="Enter your Mobile Number"
            name="phone"
            value={formikForm?.values?.phone}
            onChange={(e) => {
              const val = e.target.value;
              if (val.length <= 10 && /^[0-9]*$/.test(val)) {
                handleChange(e);
              }
            }}
            className="border w-full px-6 py-3 rounded-full mt-2 text-lg"
          />
                    <p className="text-xs text-red-500 m-1">{formikForm?.touched?.phone && formikForm?.errors?.phone}</p>

        </div>
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Current location</h1>
          <input
            type="text"
            name="location"
            placeholder="Select location"
            value={formikForm?.values?.location}
            onChange={formikForm?.handleChange}
            className={`w-full border px-6 py-3 ${formikForm?.touched?.location && formikForm?.errors?.location ? "border-red-500":""} rounded-full mt-2 text-lg`}
          />
          <p className="text-xs text-red-500 m-1">{formikForm?.touched?.location && formikForm?.errors?.location}</p>
        </div>
      </div>
      <div className="w-full mt-4">
        <h1 className="text-neutral-500">Gender</h1>
        <div className="flex flex-wrap gap-4">
          {genders?.map((gender, index) => (
            <div
              key={index}
              className={`px-4 hover:cursor-pointer font-medium py-2 border-[#36518F] border-2 rounded-full mt-4 ${formikForm?.values.gender.toLowerCase() === gender.toLowerCase()
                ? "text-white bg-[#36518F]"
                : "text-[#36518F] bg-white"
                } capitalize`}
              onClick={() =>
                formikForm.setValues({ ...formikForm?.values, gender: gender.toLowerCase() })
              }
            >
              {gender}
            </div>
          ))}

        </div>
        <p className="text-xs text-red-500 m-1">{formikForm?.touched?.gender && formikForm?.errors?.gender}</p>

      </div>
      <div className="w-full mt-4">
        <h1 className="text-neutral-500">Choose your Category</h1>
        <div className="flex flex-wrap gap-4 mt-4">
          {companyCategory?.map((company, index) => (
            <div
              key={index}
              className={`px-4 hover:cursor-pointer font-medium py-2 border-[#36518F] border-2 rounded-full ${formikForm?.values.category.toLowerCase() === company.toLowerCase()
                ? "text-white bg-[#36518F]"
                : "text-[#36518F] bg-white"
                } capitalize`}
              onClick={() =>
                formikForm.setValues({ ...formikForm.values, category: company.toLowerCase() })
              }
            >
              {company}
            </div>
          ))}
        </div>
        <p className="text-xs text-red-500 m-1">{formikForm?.touched?.category && formikForm?.errors?.category}</p>

      </div>
    </div>
  );
};

export default RegistrationBaisc;