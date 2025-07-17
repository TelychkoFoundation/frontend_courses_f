import { CourseKeyTypes } from "../../typings/course";
import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { FaPlus } from "react-icons/fa";
import { GiMuscleUp } from "react-icons/gi";
import { FC } from "react";

interface CoursesIconProps {
  courseKey: CourseKeyTypes;
}

export const CoursesIcon: FC<CoursesIconProps> = ({ courseKey }) => {
  if (courseKey === CourseKeyTypes.HTML5Basics) {
    return <SiHtml5 />;
  }

  if (courseKey === CourseKeyTypes.HTML5Advanced) {
    return (
      <>
        <SiHtml5 />
        <FaPlus size={20} />
      </>
    );
  }

  if (courseKey === CourseKeyTypes.CSS3Basics) {
    return <SiCss3 />;
  }

  if (courseKey === CourseKeyTypes.CSS3Advanced) {
    return (
      <>
        <SiCss3 />
        <FaPlus size={20} />
      </>
    );
  }

  if (courseKey === CourseKeyTypes.JSBasics) {
    return <SiJavascript />;
  }

  if (courseKey === CourseKeyTypes.JSAdvanced) {
    return (
      <>
        <SiJavascript />
        <FaPlus size={20} />
      </>
    );
  }

  if (courseKey === CourseKeyTypes.JSProfessional) {
    return (
      <>
        <SiJavascript />
        <GiMuscleUp size={20} />
      </>
    );
  }

  if (courseKey === CourseKeyTypes.Typescript) {
    return <SiTypescript />;
  }

  if (courseKey === CourseKeyTypes.React) {
    return <SiReact />;
  }

  if (courseKey === CourseKeyTypes.ReactInDepth) {
    return (
      <>
        <SiReact />
        <GiMuscleUp size={20} />
      </>
    );
  }

  return null;
};
