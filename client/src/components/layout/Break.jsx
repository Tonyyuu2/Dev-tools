import WriteHelperTool from "../readmeHelper/WriteHelperTool";
import styles from "./Break.module.css";
import classes from "../../App.module.css";
import News from "../news/News";


const Break = () => {
  return (
    <>
      <div className={classes.global_bg}>
        <div className={styles.main_container}>
          <div className={styles.writeHelperTool}>
            <WriteHelperTool />
          </div>
            <News className={classes.news} />
        </div>
        {/* <img
          src='https://github-readme-stats.vercel.app/api?username=gaearon&show_icons=true&theme=buefy'
          alt='git-stats'
        ></img> */}
      </div>
    </>
  );
};

export default Break;
