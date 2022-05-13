import WriteHelperTool from "./writingTool/WriteHelperTool";
import styles from "./Break.module.css"

const Break = () => {
  return(
    <>
      <div className={styles.container}>
        <WriteHelperTool />
      </div>
    </>
  )
}

export default Break;
