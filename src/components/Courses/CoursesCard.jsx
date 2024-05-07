import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CoursesCard = ({ course }) => {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsSaved(!isSaved);
  };

  const handleCardClick = () => {
    // console.log(25,course);
    router.push(`/courses/${course._id}`);
  };

  return (
    <div className="rounded-lg bg-white  shadow-lg hover:scale-[102%] transition-all" >
      <div className="p-4 grid gap-2">
        <div className="max-sm:flex-col flex justify-between sm:flex">
          <div className="flex-col mb-4 cursor-pointer" onClick={handleCardClick} >
            <h3 className="flex max:sm:text-sm text-lg font-semibold">
              {course.course_name}
            </h3>
            <div className="flex items-right text-sm text-gray-500">
              {course.course_code}
            </div>
          </div>
          <div className="flex mb-4">
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
            </div>
            <div className="px-1 sm:px-2">Save</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between whitespace-nowrap gap-4 text-sm w-full sm:w-1/2 text-gray-600">
          <div className="flex px-3 py-1 items-center rounded-lg bg-gray-200">
            <div className="w-auto h-auto flex-grow" />
            <span className="text-center">{course.credits} Credits</span>
            <div className="w-auto h-auto flex-grow" />
          </div>
          <div className="flex px-3 py-1 items-center rounded-lg bg-gray-200">
            <div className="w-auto h-auto flex-grow" />
            <span className="text-center">{course.course_type}</span>
            <div className="w-auto h-auto flex-grow" />
          </div>
          <div className="flex px-3 py-1 items-center rounded-lg bg-gray-200">
            <div className="w-auto h-auto flex-grow" />
            <span className="text-center w-auto">{course.instructor_name}</span>
            <div className="w-auto h-auto flex-grow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;
