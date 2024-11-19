import React from 'react'
import privacy from '../../assets/privacy.png'
import Image from 'next/image'

const PrivacyPolicyComponent=() => {
    return (
        <div>
            <div className="flex flex-col">
                <div className="relative">
                    <Image src={privacy} alt="privacy" className="w-full" />
                    <h2 className="absolute bottom-0 sm:text-[36px] text-[28px] font-[700] text-[#fff] pl-5 pb-5 sm:p-6 md:p-12">
                        Privacy policy
                    </h2>
                </div>
            </div>
            <div className='px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12 lg:w-[1045px] flex flex-col gap-y-12'>
                <div className='flex flex-col gap-y-5'>
                    <p className='text-[20px] leading-[30px] font-[500] text-[#000]' >
                        This Privacy Policy describes how SUZAN ("suzan.co.in" or "we" or "us" or "our") collects, uses, and protects the personal information you provide when using our website. We are committed to ensuring the privacy and security of your personal information. By using our website, you consent to the collection and use of your personal information as described in this Privacy Policy.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>1. Information We Collect</h2>
                    <p className='text-[20px] leading-[22px] font-[500] text-[#000]'>
                        We may collect the following types of personal information when you use our website:
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>1.1 Information You Provide:</span> When you interact with our website, such as when you register for an account, login, submit a feedback form, we may collect personal information such as your name, email address, postal address, phone number, and other information you voluntarily provide.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>1.2 Automatically Collected Information:</span> We may automatically collect certain information about your device and usage of our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>1.3 Cookies and Similar Technologies: </span>We may use cookies, web beacons, and similar technologies to collect information about your browsing activities, enhance your user experience, and analyze how our website is used. You can modify your browser settings to manage cookies or opt-out of certain tracking technologies, but please note that disabling cookies may affect the functionality of our website.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>2. Use of Personal Information</h2>
                    <p className='text-[20px] leading-[22px] font-[500] text-[#000]'>
                        We use the personal information we collect for the following purposes:
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>2.1 Providing and Improving Our Services:</span> We use your personal information to provide the services and products you request, communicate with you, respond to your inquiries, and personalize your experience on our website. We may also use your information to improve our website, products, and services.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>2.3 Analytics and Research: </span>We may use the information we collect to analyze trends, track user activity, gather demographic information, and conduct research to better understand our users' needs and preferences. This helps us improve our website, products, and services.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>2.4 Legal and Security Purposes:</span>We may use your personal information to comply with applicable laws, regulations, and legal processes, as well as to protect our rights, property, and the safety of our users and others.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>3. Sharing of Personal Information</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                    We do not share, sell, or rent your personal information to any third parties. The data you provide remains within Suzan and is used solely for the purposes described in this Privacy Policy.                  
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>6. Data Collection via Third-Party Services</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>1.1 Google Login & Google Drive: </span>   Using Google Drive and Google Login is managed by the university or college student committee admins to add resources in the courses section. Suzan does not access or collect any data from Google login or while using Google Drive. These features are used solely by the student committee admins of each college, and Suzan does not access any personal data through these services.              
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>1.2 Suzan as a Service Provider: </span> Suzan is a service provider for colleges and universities. Colleges can register on the platform, and student committees of each college can act as admins. Admins are responsible for adding course details, resources, previous years' questions (PYQs), reviews, and other information. Students from these colleges can access this information. Suzan does not collect or access personal information from any college or university and only provides a platform for use.
                        </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>1.3 Cookies and Similar Technologies: </span>We may use cookies, web beacons, and similar technologies to collect information about your browsing activities, enhance your user experience, and analyze how our website is used. You can modify your browser settings to manage cookies or opt-out of certain tracking technologies, but please note that disabling cookies may affect the functionality of our website.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>4. Data Retention </h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>5. Data Security</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        We are committed to protecting the security of your personal information and have implemented reasonable measures to safeguard it. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>6. Your Rights and Choices</h2>
                    <p className='text-[20px] leading-[22px] font-[500] text-[#000]'>
                        You have certain rights and choices regarding the personal information we collect and how it is used:
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>6.1 Access and Update: </span>  You have the right to access and update your personal information. You can review and update your account information by logging into your account or by contacting us directly.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>6.2 Marketing Communications: </span> You can opt-out of receiving promotional communications from us by following the unsubscribe instructions provided in the email or contacting us directly.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>6.3 Cookies: </span>You can manage your cookie preferences and opt-out of certain tracking technologies by modifying your browser settings. Please note that disabling cookies may affect the functionality of our website.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'>6.4 Data Subject Rights: </span>Subject to applicable law, you may have the right to request access to and rectification or erasure of your personal information, restrict the processing of your personal information, object to the processing of your personal information, and the right to data portability. To exercise these rights, please contact us using the contact information provided below.
                    </p>

                </div>

                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>8. Children's Privacy</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Our website is not intended for children under the age of 16, and we do not knowingly collect personal information from children under the age of 16. If we become aware that we have collected personal information from a child under the age of 16 without parental consent, we will take steps to delete the information as soon as possible. If you believe that we may have collected information from a child under the age of 16, please contact us using the contact information provided below.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>9. Changes to this Privacy Policy</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated Privacy Policy on our website and indicating the effective date of the update. We encourage you to review this Privacy Policy periodically.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>10. Contact Us</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at suzanorganisation@gmail.com.

                        By using our website, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your personal information as described herein.

                    </p>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicyComponent