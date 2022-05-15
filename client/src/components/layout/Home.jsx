import Login from "../spotify/Login";
import "./Home.scss";
import styles from "./Home.module.css"

const Home = () => {
  return (
    <>
      <div className={styles.homePage}>
        <div className={styles.widget1}></div>
        <div className={styles.widget2}></div>
        <div className={styles.widget3}></div>
        <div className={styles.widget4}></div>
      </div>
    </>
  );
};

export default Home;
