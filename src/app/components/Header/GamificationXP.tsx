import styles from "./index.module.css";

interface IGamificationXPProps {
  xp: number | undefined;
}

export const GamificationXP = ({ xp = 0 }: IGamificationXPProps) => {
  return (
    <div className={styles.xpContainer}>
      <p className={styles.xpResult}>{xp} XP</p>
    </div>
  );
};
