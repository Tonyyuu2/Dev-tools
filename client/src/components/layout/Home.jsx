import Login from "../spotify/Login";
import styles from "./Home.module.css"
const Home = () => {
  return (
    <>
      <div className={styles.homePage}>
      <div className={styles.row1}>
        <div className={styles.widget1}>Journal</div>
        <div className={styles.widget2}>weather & timer</div>
      </div>
      <Login></Login>
        <div className={styles.row2}>
          {/* <div className={styles.widget3}> */}
    
          {/* </div> */}
          <div className={styles.widget4}>Todo list</div>
        </div>
      </div>
    </>
  );
};

export default Home;
