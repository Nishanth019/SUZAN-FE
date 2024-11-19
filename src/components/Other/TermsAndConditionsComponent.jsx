import React from 'react'
// import terms from '../assets/terms.png'
import terms from '../../assets/terms.png'
import Image from 'next/image'
const TermsAndConditionsComponent=() => {
    return (
        <div>
            <div className="flex flex-col">
                <div className="relative">
                    <Image src={terms} alt="Terms" className="w-full" />
                    <h2 className="absolute bottom-0 sm:text-[36px] text-[28px] font-[700] text-[#fff] p-3 sm:p-6 md:p-12">
                        Terms & Conditions
                    </h2>
                </div>
            </div>
            <div className='px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12 lg:w-[1045px] flex flex-col gap-y-12'>
                <div className='flex flex-col gap-y-5'>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]' >
                        The website owner (suzan), including subsidiaries and affiliates ("suzan.co.in" or "we" or "us" or "our") provides the information contained on this website or any of the pages comprising the website ("website") to visitors ("visitors") (collectively referred to as "you" or "your" hereinafter) subject to the terms and conditions set out in these website terms and conditions, the privacy policy, and any other relevant terms and conditions, policies, and notices which may be applicable to a specific section or module of the website.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        By continuing to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern suzan.co.in's relationship with you in relation to this website.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        The term “Suzan” or "suzan.co.in" or "us" or "we" refers to the owner of the website. The term "you" refers to the user or viewer of our website. The use of this website is subject to the following terms of use:
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        The content of the pages of this website is for your general information and use only. It is subject to change without notice.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        You may not create a link to this website from another website or document without prior written consent.
                        Your use of this website and any dispute arising out of such use of the website is subject to the laws of India.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>1. User Registrations</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        By registering on suzan.co.in, users agree to provide accurate, current, and complete information about themselves as prompted by the registration process. Users are responsible for maintaining the confidentiality of their account, username, and password, and are fully responsible for all activities that occur under their account. In the event of any unauthorized use of their account or any other breach of security, users agree to immediately notify suzan.co.in. suzan.co.in cannot and will not be liable for any loss or damage arising from the user's failure to comply with this section.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Users agree not to create an account for anyone else without such person's permission. Users will not use their account in a manner that may cause damage to suzan.co.in or to any third party. In the event that suzan.co.in disables a user's account, the user agrees not to create another one without our permission.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        suzan.co.in is committed to protecting user data and privacy in accordance with our Privacy Policy. By using suzan.co.in, users consent to the collection and use of their personal information as outlined in our Privacy Policy.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>2. Content Ownership</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        All educational courses on suzan.co.in are the intellectual property of suzan and are protected by copyright, trademark, and other laws. Users agree not to copy, modify, distribute, sell, or lease any part of our services or included software, nor may they reverse engineer or attempt to extract the source code of that software, unless laws prohibit these restrictions or users have our written permission.

                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Blog posts and comments are owned by their respective authors. Users who post content on suzan.co.in grant suzan.co.in a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to use, store, display, reproduce, modify, create derivative works, perform, and distribute their user content on suzan.co.in solely for the purposes of operating, developing, providing, and using suzan.co.in.

                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Data shared on suzan Edge is sourced from various credible sources on the internet and companies' websites. suzan.co.in makes no claim of ownership to this data, and all rights, title, and interest in and to such data remains with the respective data owners.

                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Most intellectual property rights are owned by suzan unless otherwise stated. Users agree not to infringe upon the intellectual property rights of suzan or any third party in relation to their use of suzan.co.in.

                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Any unauthorized use of the content appearing on suzan.co.in may violate copyright, trademark, and other applicable laws and could result in criminal or civil penalties.

                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>3. Services</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        suzan.co.in provides a range of services, each with its own set of terms and conditions.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        <span className='text-[20px] font-[600] text-[#282828]'> Courses:</span> Users have access to courses and courses details provided by your college student commitee. By using these courses, users agree to use the course content for personal and non-commercial use only. Users are not permitted to distribute, modify, or reproduce the course content without the express written permission of suzan.co.in. Users are also expected to abide by any additional rules or guidelines specific to each course.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>4. User Contributions</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Users are responsible for any content they contribute to suzan.co.in. This includes, but is not limited to, blog posts, comments, and any other form of user-generated content. By contributing content to
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        suzan.co.in, users grant suzan.co.in a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to use, store, display, reproduce, modify, create derivative works, perform, and distribute their user content on suzan.co.in solely for the purposes of operating, developing, providing, and using suzan.co.in.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Users agree not to post content that violates any laws, infringes on the rights of others, or violates our guidelines or terms. suzan.co.in reserves the right to remove any content that we believe violates these terms or our guidelines, or for any other reason. Users understand and agree that they may be exposed to user contributions that are inaccurate, objectionable, inappropriate for children, or otherwise unsuited to their purpose, and they agree that suzan.co.in is not liable for any damages they allege to incur as a result of user contributions.
                    </p>
                </div>
                
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>7. Responsibilities and Liabilities</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        When using suzan.co.in, users are expected to behave responsibly and adhere to the platform's guidelines and terms. This includes, but is not limited to, maintaining respectful interactions with other users, refraining from posting inappropriate or offensive content, and not engaging in any form of academic dishonesty such as plagiarism or cheating. Users are also responsible for the security of their own account, including keeping their login information confidential and reporting any suspected unauthorized use of their account.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        In the event of any unacceptable behavior, suzan.co.in reserves the right to take appropriate action, which may include suspending or terminating the user's account. Users should be aware that they may be held liable for any damages caused by their violation of these terms, including legal liability where applicable. It's important to note that suzan.co.in is not responsible for the actions of its users and cannot be held liable for any damages or losses suffered by users as a result of interactions with other users on the platform 1.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>8. Data Usage and Privacy</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        suzan.co.in is committed to protecting the privacy of its users. The platform collects and stores user data for the purpose of improving the user experience and providing users with access to analytics of their preparation. This data may include personal information such as name, email address, and learning progress, as well as usage data such as login times and activity on the platform.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        suzan.co.in uses this data to personalize the learning experience, provide insights into learning progress, and improve the platform's services. The platform may also use this data for research purposes, to develop new features and services, and to understand and improve user engagement. All data usage is in accordance with suzan.co.in's Privacy Policy, which users agree to by using the platform's services 2.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>9. Dispute Resolution</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        In the event of a dispute between a user and suzan.co.in, the first step is to contact the suzan support team. The support team will work with the user to resolve the dispute in a fair and timely manner. If a satisfactory resolution cannot be reached through this process, the dispute will be escalated to legal proceedings.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Any legal disputes will be handled in the court of Delhi, India, and will be resolved in accordance with Indian laws. By using suzan.co.in's services, users agree to this jurisdiction and governing law for any disputes that may arise. This clause is intended to provide a clear and predictable legal framework for resolving disputes, and to ensure that disputes are resolved in a fair and efficient manner 3.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>10. Modifications</h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        suzan.co.in reserves the right to update these Terms and Conditions at any time. This may be necessary to reflect changes in the platform's services, changes in law, or for other reasons. When changes are made, they will be posted on this page and will take effect immediately.
                    </p>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Users are encouraged to regularly check this page for any updates to the Terms and Conditions. Continued use of suzan.co.in's services after any changes to the Terms and Conditions constitutes acceptance of those changes. If a user does not agree to the updated Terms and Conditions, they should discontinue use of the platform's services
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>11. Termination </h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        suzan.co.in reserves the right to terminate a user's access to the platform at any time and for any reason. This includes, but is not limited to, instances where a user has breached the terms and conditions of the platform. Users also have the right to terminate their account at any time by accessing their account settings. Upon termination, all rights and licenses granted to the user will immediately cease, and the user is required to stop all use of the platform. This includes any ongoing activities or processes that the user may have initiated using the platform.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>12. Governing Law </h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        These terms and conditions, and any disputes or claims arising from them or from the use of the suzan.co.in platform, are governed by the laws of India. This includes any disputes or claims that are related to the validity, interpretation, or enforcement of these terms and conditions. The parties agree to submit to the exclusive jurisdiction of the courts of India for the resolution of any such disputes or claims.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>13. Indemnification </h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        Users agree to indemnify and hold harmless suzan.co.in, its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, and expenses, including, but not limited to, reasonable legal fees and costs, arising out of or in any way connected with their access to or use of the platform, their violation of these terms and conditions, or their infringement, or infringement by any other user of their account, of any intellectual property or other right of any person or entity.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>14. Limitation of Liability
                    </h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        To the maximum extent permitted by applicable law, in no event shall suzan.co.in be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the platform; (b) any conduct or content of any third party on the platform, including without limitation, any defamatory, offensive or illegal conduct of other users or third parties; or (c) unauthorized access, use or alteration of your transmissions or content.
                    </p>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <h2 className='text-[24px] font-[700] text-[#282828] '>15. Third-Party Services

                    </h2>
                    <p className='text-[16px] leading-[22px] font-[500] text-[#000]'>
                        suzan.co.in may use third-party services or platforms to provide certain aspects of its services. Users agree to comply with the terms and conditions of these third-party services and understand that suzan.co.in is not responsible for the content or practices of these services. These third-party services may have their own terms and conditions and privacy policies, and users are encouraged to read those thoroughly before engaging with these services.                    </p>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditionsComponent ;