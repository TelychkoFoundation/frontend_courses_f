import {
  CircleDoneIcon,
  CircleLockIcon,
  LockDarkIcon,
  DoneIcon,
} from "@/images";
import Image from "next/image";
import { CirclePlay } from "../index";
import styles from "./index.module.css";

const inDevOrNotPaid = true;
const notStartedOrWatching = false;

export default function LessonStatusBar() {
  if (notStartedOrWatching) {
    return <CirclePlay progress={74} />;
  }

  if (inDevOrNotPaid) {
    return (
      <>
        <CircleLockIcon className={styles.lockContainer} />
        <Image
          src={LockDarkIcon}
          alt="Lock dark icon"
          className={styles.lock}
        />
      </>
    );
  }

  return (
    <>
      <CircleDoneIcon className={styles.doneContainer} />
      <Image src={DoneIcon} alt="Done icon" className={styles.lock} />
    </>
  );
}
