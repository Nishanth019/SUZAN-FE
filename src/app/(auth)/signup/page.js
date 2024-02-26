import React from 'react'
import logo from '../../../assets/Navbar/logo.png'
import Image from 'next/image';
import Link from 'next/link'


const SignUp = () => {
  return (
    <div className="bg-white">

          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
              
            <Link href="/signup/admin" className="block px-4 py-2 ">
                  <div className="relative w-full" style={{ paddingTop: 'calc(100% / (7/8))' }}>
                    <div className="absolute inset-0 overflow-hidden rounded-lg bg-gray-200">
                      <Image
                        src={logo}
                        alt=''
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                  </div>
                  <h3 className="mt-4 text-center text-sm text-red-300 hover:text-black hover:text-semibold ">Admin</h3>
                </Link>

                <Link href="/signup/student" className="block px-4 py-2 ">
                  <div className="relative w-full" style={{ paddingTop: 'calc(100% / (7/8))' }}>
                    <div className="absolute inset-0 overflow-hidden rounded-lg bg-gray-200">
                      <Image
                        src={logo}
                        alt=''
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                  </div>
                  <h3 className="mt-4 text-center text-sm text-red-300 hover:text-black hover:text-semibold ">Student</h3>
                </Link>
             
            </div>
          </div>
        
    </div >
  );
};

export default SignUp