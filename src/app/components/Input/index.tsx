import { InfoIcon } from "@/images";
import styles from "./index.module.css";

interface IInputProps {
  id?: string;
  type?: string;
  value?: string;
  name: string;
  placeholder?: string;
  labelText?: string;
}

export default function Input({
  id,
  type,
  value,
  placeholder,
  name,
  labelText,
}: IInputProps) {
  return (
    <label htmlFor={name} className={styles.label}>
      {labelText}
      <input
        id={id}
        type={type}
        className={styles.input}
        placeholder={placeholder}
        name={name}
        autoComplete="off"
      />
      <section className={styles.infoContainer}>
        <InfoIcon className={styles.infoIcon} />
        <p className={styles.infoMessage}>text</p>
      </section>
    </label>
  );
}
