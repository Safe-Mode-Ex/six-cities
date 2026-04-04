import styles from './loading-screen.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.loading}>
      <p className={styles.loadingText}>
        <b>Loading ...</b>
      </p>
      <p className={styles.loadingDesc}>Take a deep breath</p>
    </div>
  );
}

export default LoadingScreen;
