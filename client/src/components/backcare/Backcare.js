import React, { useRef, useEffect, useReducer, useState } from 'react';
import Webcam from 'react-webcam';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import * as tf from '@tensorflow/tfjs';
import classes from './Backcare.module.css';
import {ImHappy, ImSad} from 'react-icons/im'
import {IoIosCloseCircleOutline} from 'react-icons/io'


ChartJS.register(ArcElement, Tooltip, Legend);

const classifier = knnClassifier.create();

const data = { bad: 0, good: 0 };

const intialState = {
  goodPostureCount: 0,
  badPostureCount: 0,
  displayGraph: false,
  isTrained: false,
  currentTestResult: false,
  intervalId: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_GOOD_POSTURE_COUNT':
      return { ...state, goodPostureCount: state.goodPostureCount + 1 };
    case 'INCREMENT_BAD_POSTURE_COUNT':
      return { ...state, badPostureCount: state.badPostureCount + 1 };
    case 'DISPLAY_GRAPH':
      return { ...state, displayGraph: action.value};
    case 'IS_TRAINED':
      return { ...state, isTrained: true };
    case 'TEST_RESULT':
      return { ...state, currentTestResult: action.result };
    case 'SET_INTERVAL':
      return { ...state, intervalId: action.intervalId };
    default:
      return state;
  }
};

const Backcare = () => {

  const videoElement = useRef(null);

  const [state, dispatchBackcare] = useReducer(reducer, intialState);

  useEffect(() => {

    //get the modal from backend if uesr has already trained it
    //set the classifier dataset from the backend data
    //set is_trained to true

  }, []);


  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };

  const stopCam = () => {
    let stream = videoElement.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
  };

  const train = async (classId) => {
    const img = tf.browser.fromPixels(videoElement.current.video);
    const model = await mobilenet.load();
    const activation = model.infer(img, true);
    classifier.addExample(activation, classId);

    if (classId === "good") {
      dispatchBackcare({ type: 'INCREMENT_GOOD_POSTURE_COUNT' });
    }

    if (classId === "bad") {
      dispatchBackcare({ type: 'INCREMENT_BAD_POSTURE_COUNT' });
    }

    // code for sendind data to backend as string and extracting the model once received as string

    /* let str = JSON.stringify(Object.entries(classifier.getClassifierDataset())
      .map(([label, data]) => [label, Array.from(data.dataSync()), data.shape]));

    console.log(str);
    const classifier2 = knnClassifier.create();
    classifier2.setClassifierDataset(Object.fromEntries(
      JSON.parse(str).map(([label, data, shape]) => [label, tf.tensor(data, shape)])
    ));

    console.log(classifier2); */

  };

  const classifyPosture = async () => {

    dispatchBackcare({ type: 'TEST_RESULT', result: false });

    const intervalId = setInterval(async () => {
      let model = await mobilenet.load();
      const img = tf.browser.fromPixels(videoElement.current.video);
      const activation = model.infer(img, true);
      const result = await classifier.predictClass(activation);
      data[result.label] = data[result.label] + 1;
      console.table(data);
    }, 5000);

    dispatchBackcare({ type: 'SET_INTERVAL', intervalId });

    //send the current data of postures to backend

  };

  const stopPostureTracking = () => {
    clearInterval(state.intervalId);
    dispatchBackcare({ type: 'DISPLAY_GRAPH', value: true });
    stopCam();
  };


  const classifySample = async () => {
    let model = await mobilenet.load();
    const img = tf.browser.fromPixels(videoElement.current.video);
    const activation = model.infer(img, true);
    const result = await classifier.predictClass(activation);

    data[result.label] = data[result.label] + 1;
    // dispatchBackcare({ type: 'TEST_RESULT', result: result.label });
    if(result.label === 'good') {
      dispatchBackcare({ type: 'TEST_RESULT', result: <ImHappy style={{color: "#9fd1bb"}}/> });
    }else {
      dispatchBackcare({ type: 'TEST_RESULT', result: <ImSad style={{color: "#e290ade1"}} />   });
    }
  };


  const graphdata = {
    labels: ['Bad posture', 'Good posture'],
    datasets: [
      {
        label: '# count',
        data: [data.bad, data.good],
        backgroundColor: [
          'rgba(220, 38, 38, 0.7)',
          'rgba(0, 153, 246, 0.7)',
        ],
        borderColor: [
          'rgba(220, 38, 38, 1)',
          'rgba(0, 153, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
    <div className={state.displayGraph ? classes.backDrop : classes.bigContainer} >
      <h2 className={ classes.heading }>Backcare watches your back</h2>
      <h3 className={ classes.subHeading }>Track your posture in real-time</h3>

      <div className={ classes.container }>
        <div className={ classes.screen }>
        <div className={ classes.instruction }>
          <h3>Instruction:</h3>
          <ul className={ classes.list }>
            <li>1. Take multiple photos of good postures and bad postures
            </li>
            <li>
            2. You can test it by clicking 'Test'
            </li>
            <li>
            3. Once you are satisfied with your result, click 'Done'
            </li>
          </ul>
          </div>
          <Webcam
            className={ classes.camera }
            screenshotFormat="image/jpeg"
            screenshotQuality={ 1 }
            audio={ false }
            ref={ videoElement }
            videoConstraints={ videoConstraints }
          />
        </div>
        <div className={ classes.seperator}>
        { !state.isTrained && <div className={ classes.btncontainer }>
          <div className={ classes.btnCol } >
          <button
            className={ classes.btn + ' ' + classes.green }
            onClick={ () => train('good') }>
            <ImHappy style={{fontSize: "1.5em"}}/>
          </button>
          <button
            className={ classes.btn + ' ' + classes.red }
            onClick={ () => train('bad') }>
            <ImSad style={{fontSize: "1.5em"}}/>
      
          </button>
          </div>
          <div className={ classes.btnCol }>
          <button
            className={ classes.btn + ' ' + classes.blue }
            onClick={ classifySample }>
            Test </button>

          <button
            className={ classes.btn + ' ' + classes.blue }
            onClick={ () => dispatchBackcare({ type: 'IS_TRAINED' }) }>
            Done</button>
          </div>
        </div> }
        <div className={ classes.msgContainer }>
          <div className={classes.postureCountContainer}>
            <div className={ classes.postureCount }>Good Posture: { state.goodPostureCount }</div>
            <div className={ classes.postureCount }>Bad Posture: { state.badPostureCount }</div>
          </div>
            <div className={ classes.resultMsg }>
              { state.currentTestResult && (state.currentTestResult) }
            </div>
          </div>
        </div>

        { state.isTrained && <div className={ classes.btnContainer2 }>
          <button
            className={ classes.btn + ' ' + classes.blue }
            onClick={ classifyPosture }>
            Track your posture</button>
          <button
            className={ classes.btn + ' ' + classes.blue }
            onClick={ stopPostureTracking }>
            Stop tracking</button>
        </div> }
      </div>
      </div>
        { state.displayGraph && <div className={ classes.graph }>
        <div className={ classes.graphHeader }>
          <h3 className={ classes.graphHeading }>Your posture history</h3>
          <button onClick={()=>{
             dispatchBackcare({ type: 'DISPLAY_GRAPH', value: false })}
        } class={classes.closeBtn}><IoIosCloseCircleOutline/></button>
        </div>
          <Pie data={ graphdata } />
        </div> }
    </>
  );
};

export default Backcare;