import styles from './loading-screen.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.loading}>
      <p className={styles.loading__text}>
        <b>Loading ...</b>
      </p>
      <p className={styles.loading__desc}>Take a deep breath</p>
    </div>
  );
}

export default LoadingScreen;
