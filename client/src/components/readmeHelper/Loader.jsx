import styles from './Loader.module.css';
const Loader = () => {
  return (
    <div className='loader-container'>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
