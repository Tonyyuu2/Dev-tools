import styles from "./Loader.module.css";

// Create loader component for writeHelperTool

const Loader = () => {
  return (
    <div className="loader-container">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
