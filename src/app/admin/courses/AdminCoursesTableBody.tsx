import { ICourse } from "@/typings";
import { ReactElement } from "react";
import AdminCoursesTableRow from "./AdminCoursesTableRow";
import { useAdmin } from "@/hooks";

export default function AdminCoursesTableBody() {
  const { courses } = useAdmin();

  return (
    <tbody>
      {courses.map(
        (course: ICourse, index: number): ReactElement => (
          <AdminCoursesTableRow key={course.id} index={index} />
        ),
      )}
    </tbody>
  );
}
