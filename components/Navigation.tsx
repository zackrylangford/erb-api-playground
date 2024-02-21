import Link from "next/link";
import styles from "@/components/Navigation.module.css";

const Navigation = () => {

    return (
        <div>
          <nav className={styles.navContainer}>
            <Link href="/">
              <h1 className={styles.navLink}>Home</h1>
            </Link>
            <Link href="/gamespage">
              <h1 className={styles.navLink}>GET All Games</h1>
            </Link>
          </nav>
        </div>
      );
    };

export default Navigation;