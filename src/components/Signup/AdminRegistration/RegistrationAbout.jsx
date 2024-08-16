
import Link from "next/link";
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const RegistrationAbout = ({ details, setDetails, onCheckboxChange }) => {
    const router = useRouter();
    
  const { isAuth } = useGlobalContext();

  if (isAuth) {
    router.push("/");
  }


  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    onCheckboxChange(e.target.checked); // Notify parent component about checkbox change
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex  flex-col items-center gap-4 w-full mt-4">
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">College Name</h1>
          <input
            type="text"
            placeholder="Enter your college Name"
            name="college_name"
            value={details.college_name}
            onChange={handleChange}
            className="border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg "
          />
        </div>
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">College Email domain </h1>
            <input
              type="text"
              placeholder="Ex: iiitdmj.ac.in "
              name="email_domain"
              value={details.email_domain}
              onChange={handleChange}
              className="border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg "
            />
          </div>

          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Street Name</h1>
            <input
              type="text"
              placeholder="Enter your College Street Name"
              name="street_name"
              value={details.street_name}
              onChange={handleChange}
              className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">City</h1>
            <input
              type="text"
              placeholder="Enter your College City"
              name="city"
              value={details.city}
              onChange={handleChange}
              className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">State</h1>
            <input
              type="text"
              placeholder="Enter your College State"
              name="state"
              value={details.state}
              onChange={handleChange}
              className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Country</h1>
            <input
              type="text"
              placeholder="Enter your College Country"
              name="country"
              value={details.country}
              onChange={handleChange}
              className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Pincode</h1>
            <input
              type="text"
              placeholder="Enter your College Pincode"
              name="pincode"
              value={details.pincode}
              onChange={handleChange}
              className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Program</h1>
          <input
            type="text"
            placeholder="Enter your Program"
            name="program"
            value={details.program}
            onChange={handleChange}
            className="border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
          />
        </div>
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Branch/Discipline</h1>
          <input
            type="text"
            placeholder="Enter your Branch"
            name="branch"
            value={details.branch}
            onChange={handleChange}
            className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Roll No</h1>
          <input
            type="text"
            name="roll_no"
            placeholder="Enter Your college Roll Number"
            value={details.roll_no}
            onChange={handleChange}
            className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
          />
        </div>
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Batch</h1>
          <input
            type="text"
            name="batch"
            placeholder="Enter Your Batch"
            value={details.batch}
            onChange={handleChange}
            className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
          />
        </div>
      </div>

      <div className="flex  justify-start items-center text-center gap-4">
        <input
          type="checkbox"
          id="terms-condition"
          name="termsAndConditions"
          onChange={handleCheckboxChange}
          className="w-[18px] h-[18px] mt-6 mb-6"
        />
        <p className=" text-[14px]">
          I agree to{" "}
          <Link
            href="/terms"
            className="text-bold text-green-600 cursor-pointer"
          >
            Terms & Conditions
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default RegistrationAbout;
