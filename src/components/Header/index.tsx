import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.Header}>
      <img src="images/Logo.svg" alt="space Traveling" />
    </header>
  );
}
