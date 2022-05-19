import WriteHelperTool from "../readmeHelper/WriteHelperTool";
import styles from "./Break.module.css";
import classes from "../../App.module.css";
import News from "../news/News";

const Break = () => {
  return (
    <>
      <div className={classes.global_bg}>
        <div className={styles.writeHelperTool}>
          <WriteHelperTool />
          <News />
        </div>
        <div className={classes.news}>
        </div>
      </div>
    </>
  );
};

export default Break;
