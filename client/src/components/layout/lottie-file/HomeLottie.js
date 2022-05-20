import homeLottie from "./home-lottie.json"
import Lottie from 'react-lottie';




const HomeLottie = () => {



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: homeLottie,
    rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
        <div>
        <Lottie
          options={defaultOptions}
          height={450}
          width={450}
        />
      </div>
  )
};

export default HomeLottie;

