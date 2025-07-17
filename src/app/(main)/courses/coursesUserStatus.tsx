import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FC } from "react";
// import { RiProgress3Fill } from "react-icons/ri";

interface ICoursesInfoProps {
  is_published: boolean;
}

export const CoursesUserStatus: FC<ICoursesInfoProps> = ({ is_published }) => {
  if (is_published) {
    return <IoCheckmarkDoneCircleSharp color="green" size={24} />;
  }

  return null;
  // <RiProgress3Fill color="#ff5300" size={24} />
};
