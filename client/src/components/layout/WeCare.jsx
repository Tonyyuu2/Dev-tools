import Backcare from '../backcare/Backcare';
import styles from '../layout/Wecare.module.css';
import classes from '../../App.module.css';
const Wecare = () => {
  return (
    <>
      <div className={classes.global_bg}>
        <div className={styles.main_container}>
          <Backcare />
        </div>
      </div>
    </>
  );
};

export default Wecare;
