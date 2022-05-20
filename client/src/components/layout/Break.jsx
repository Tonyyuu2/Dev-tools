import WriteHelperTool from '../readmeHelper/WriteHelperTool';
import styles from './Break.module.css';
import classes from '../../App.module.css';

const Break = () => {
  return (
    <>
      <div className={classes.global_bg}>
        <div className={styles.writeHelperTool}>
          <WriteHelperTool />
        </div>
        <img
          src='https://github-readme-stats.vercel.app/api?username=gaearon&show_icons=true&theme=buefy'
          alt='git-stats'
        ></img>
      </div>
    </>
  );
};

export default Break;
