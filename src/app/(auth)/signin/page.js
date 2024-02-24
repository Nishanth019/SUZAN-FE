import React from "react";

const SignIn = () => {
  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg py-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12 ">
          <div className="flex items-center lg:m-0">
            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl border border-gray-300 p-4 md:p-12 ">
              <h3 className="mb-3  text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px] font-extrabold text-dark-grey-900">
                Sign In
              </h3>
              <p className="mb-4 text-grey-700">
                Enter your email and password
              </p>

              <label
                htmlFor="email"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="mail@gmail.com"
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                required
              />
              <label
                htmlFor="password"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Password*
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter a password"
                className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                required
              />
              <div className="flex flex-row justify-between mb-8">
                <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked
                    value=""
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
                    <img
                      className=""
                      src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                      alt="tick"
                    />
                  </div>
                </label>
                <a
                  href="javascript:void(0)"
                  className="mr-4 text-sm font-medium text-purple-blue-500 text-blue-600 hover:text-blue-900"
                >
                  Forget password?
                </a>
              </div>
              <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-black transition duration-300 md:w-96 rounded-2xl hover:bg-blue-300 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500 border border-gray-300 p-10">
                Sign In
              </button>
              <p className="text-sm leading-relaxed text-grey-900">
                Not registered yet?{" "}
                <a
                  href="javascript:void(0)"
                  className="font-bold  text-blue-600 hover:text-blue-900"
                >
                  Create an Account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
