import { ReactElement } from "react";
import styles from "./page.module.css";
import { getAllAdminCourses } from "../../lib/getActions";
import Course from "./course";
import { ICourse } from "../../models/Course";

export default async function CoursesList() {
  // const [data, setData] = useState<ICourse[]>([]);

  const response = await getAllAdminCourses("asc");
  //
  // console.log(response, "response");
  // useEffect(() => {
  //   const b = async () => {
  //     const r = await getAllAdminCourses("asc");
  //     console.log(r, "r");
  //     setData(r.data);
  //   };
  //
  //   b();
  // }, []);

  return (
    <div className={styles.coursesContainer}>
      {response?.data?.map(
        (course: ICourse): ReactElement => (
          <Course key={course.id} data={course} />
        ),
      )}
    </div>
  );
}
