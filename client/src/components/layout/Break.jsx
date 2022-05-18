import WriteHelperTool from "../readmeHelper/WriteHelperTool";
import styles from "./Break.module.css"
import classes from "../../App.module.css"

const Break = () => {
  return(
    <>
      <div className={classes.global_bg}>
        <div className={styles.writeHelperTool}>
          <WriteHelperTool />
        </div>
      </div>
    </>
  )
}

export default Break;
