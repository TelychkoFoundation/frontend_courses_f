import { DownloadIcon, LockIcon, LockIconSize } from "@/images";
import { useLessons } from "@/hooks";
import styles from "./index.module.css";

interface IDocumentProps {
  isActive: boolean;
}

export default function Document({ isActive }: IDocumentProps) {
  const { isCurrentLessonPaid } = useLessons();

  return (
    <>
      <section className={styles.collapsedSection}>
        <p className={styles.collapsedTitle}>Конспект уроку</p>
        {isCurrentLessonPaid ? (
          <DownloadIcon className={styles.downloadIcon} />
        ) : (
          <LockIcon size={LockIconSize.Large} className={styles.lockIcon} />
        )}
      </section>
      {isActive ? (
        <p className={styles.documentContent}>
          Lorem ipsum dolor sit amet consectetur. Hac quam augue nibh etiam
          felis vestibulum elementum malesuada etiam. Proin eget auctor sapien
          faucibus tortor tempus feugiat purus. Sed augue aliquam cursus semper
          viverra non scelerisque elit nulla. Egestas maecenas cursus id neque
          maecenas justo enim lacus nunc. Pharetra ut ultricies sem sit cras
          pharetra rhoncus. Congue a elementum id aliquet velit pellentesque
          cursus quisque. Cursus non arcu arcu morbi ut pellentesque. Sit
          pulvinar sapien sed natoque in nisl auctor enim. Varius integer
          tincidunt purus in non tincidunt ut molestie. Morbi pulvinar
          consectetur ornare faucibus purus senectus nibh ac tincidunt. Gravida
          sollicitudin consectetur est tempus vel fames. Purus commodo egestas
          nisi sed aliquam quis tristique at praesent. Rutrum quis ac eget ut id
          mauris odio odio. Eros viverra nisi neque id sagittis lobortis
          rhoncus. Nec risus sit nisl vivamus egestas sagittis in sed enim. Eget
          neque auctor tristique molestie mi. Tincidunt ut quisque sed vitae.
          Feugiat vel euismod in condimentum enim. Sagittis vitae porttitor
          vitae arcu faucibus tellus adipiscing consequat adipiscing.
          Scelerisque commodo pretium commodo neque sollicitudin lectus at
          euismod orci. Pulvinar magnis consectetur urna tempus ipsum praesent
          nec. Placerat lectus fermentum non duis. Sit et urna id venenatis quam
          erat ipsum in feugiat leo.
        </p>
      ) : null}
    </>
  );
}
