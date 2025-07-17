import EditForm from "./EditForm";
import UploadVideo from "./UploadVideo";
import styles from "../course.module.css";

export default async function AdminCourseViewPage({
  params,
}: {
  params?: any;
}) {
  const { slug } = await params;

  return (
    <div className={styles.edit}>
      <EditForm slug={slug} />
      <UploadVideo />
    </div>
  );
}
