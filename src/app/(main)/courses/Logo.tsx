import { CourseKeyTypes } from "@/typings";
import { FC } from "react";
import { ICON_MAP } from "@/images";

interface CoursesIconProps {
  courseKey: CourseKeyTypes;
  courseHovered: boolean;
}

export const Logo: FC<CoursesIconProps> = ({ courseKey, courseHovered }) => {
  const fill = courseHovered ? "#5D5D5D" : "#DADADA";

  const IconComponent = ICON_MAP[courseKey];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent fill={fill} />;
};
