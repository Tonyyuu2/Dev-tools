import React, { useRef, useEffect, useReducer, useState, useContext } from 'react';
import Webcam from 'react-webcam';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import * as tf from '@tensorflow/tfjs';
import classes from './Backcare.module.css';
import axios from 'axios';
import BarChart from './BarChart';
import AuthContext from '../store/auth-context';
import { ImHappy, ImSad } from 'react-icons/im';
import { IoIosCloseCircleOutline } from 'react-icons/io';


ChartJS.register(ArcElement, Tooltip, Legend);

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user"
};

// intial state for reducer
const initialState = {
  goodPostureCount: 0,
  badPostureCount: 0,
  displayGraph: false,
  isTrained: false,
  currentTestResult: false,
  intervalId: null
};

// reducer function for updating state based on actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_GOOD_POSTURE_COUNT':
      return { ...state, goodPostureCount: action.value };
    case 'INCREMENT_BAD_POSTURE_COUNT':
      return { ...state, badPostureCount: action.value };
    case 'DISPLAY_GRAPH':
      return { ...state, displayGraph: action.value };
    case 'IS_TRAINED':
      return { ...state, isTrained: action.value };
    case 'TEST_RESULT':
      return { ...state, currentTestResult: action.result };
    case 'SET_INTERVAL':
      return { ...state, intervalId: action.intervalId };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
};

//module level data to track the good and bad posture for current session
let data = { good: 0, bad: 0 };

const Backcare = () => {
  const videoElement = useRef(null);
  const authCtx = useContext(AuthContext);
  const [showBarChart, setShowBarChart] = useState(false);
  const [classifier, setClassifier] = useState(knnClassifier.create());
  const [state, dispatchBackcare] = useReducer(reducer, initialState);

  //getting user traning model if user has already trained the application
  useEffect(() => {

    let modelData = '';

    axios.get('api/datalab/backcare/model', { headers: { authorization: "Bearer " + authCtx.token } })
      .then(result => {
        modelData = result.data.backcare_model;
        if (modelData) {
          dispatchBackcare({ type: 'IS_TRAINED', value: true });
          //converting json string back to knnClassifier data and setting the model
          classifier.setClassifierDataset(Object.fromEntries(
            JSON.parse(modelData).map(([label, dataM, shape]) => [label, tf.tensor(dataM, shape)])
          ));
        }
        else {
          dispatchBackcare({ type: 'IS_TRAINED', value: false });
        }
      })
      .catch(e => console.error(e));
  }, [classifier, authCtx.token]);

  //training the model according to user's input
  //taking a sample from video
  //loading good and bad posture example in the knnClassifier
  const train = async (classId) => {
    const img = tf.browser.fromPixels(videoElement.current.video);
    const model = await mobilenet.load();
    const activation = model.infer(img, true);
    classifier.addExample(activation, classId);
    if (classId === "good") {
      dispatchBackcare({ type: 'INCREMENT_GOOD_POSTURE_COUNT', value: state.goodPostureCount + 1 });
    }
    if (classId === "bad") {
      dispatchBackcare({ type: 'INCREMENT_BAD_POSTURE_COUNT', value: state.badPostureCount + 1 });
    }
  };

  //removing the graphs on closing of a modal
  const handleGraphs = () => {
    dispatchBackcare({ type: 'DISPLAY_GRAPH', value: false });
    setShowBarChart(false);
  };

  //converting traning model to json string
  //storing it on the backend
  const handleEndTraining = () => {

    dispatchBackcare({ type: 'IS_TRAINED', value: true });
    data = { good: 0, bad: 0 };

    const modelData = JSON.stringify(Object.entries(classifier.getClassifierDataset())
      .map(([label, dataM]) => [label, Array.from(dataM.dataSync()), dataM.shape]));

    axios.put('/api/datalab/backcare/model', { model: modelData }, { headers: { authorization: "Bearer " + authCtx.token } })
      .then(result => result.data)
      .catch(e => console.error(e));

  };

  //if user wants to retrain the model
  //delets the model data from backend
  const handleResetTraining = () => {
    axios.patch('/api/datalab/backcare/model', {}, { headers: { authorization: "Bearer " + authCtx.token } })
      .then(result => {
        dispatchBackcare({ type: 'RESET', value: false });
        setClassifier(knnClassifier.create());
      })
      .catch(e => console.error(e));
  };

  //continious tracking of subject
  //takes samples after each x seconds 
  const classifyPosture = async () => {

    const intervalId = setInterval(async () => {
      let model = await mobilenet.load();
      const img = tf.browser.fromPixels(videoElement.current.video);
      const activation = model.infer(img, true);
      const result = await classifier.predictClass(activation);
      //update the number of good or bad data depending on the result from classifier
      data[result.label] = data[result.label] + 1;
    }, 5000);

    //storing intervalid in reducer to clear later on stop tracking
    dispatchBackcare({ type: 'SET_INTERVAL', intervalId });

  };

  //stops the posture tracking
  //sends the data to server for current session of posture tracking
  //displays pie chart with data
  const stopPostureTracking = () => {

    clearInterval(state.intervalId);
    dispatchBackcare({ type: 'DISPLAY_GRAPH', value: true });
    dispatchBackcare({ type: 'SET_INTERVAL', intervalId: null });

    //only send the data to server if it's not empty
    if (data.good > 0 || data.bad > 0) {
      axios.post('/api/datalab/backcare/data', { good: data.good, bad: data.bad }, { headers: { authorization: "Bearer " + authCtx.token } })
        .then(result => data = { good: 0, bad: 0 })
        .catch(e => console.error(e));
    }

  };

  //temporary check from user before saving the model
  //displays emoji based on posture result 
  const classifySample = async () => {

    dispatchBackcare({ type: 'TEST_RESULT', result: false });
    let model = await mobilenet.load();
    const img = tf.browser.fromPixels(videoElement.current.video);
    const activation = model.infer(img, true);
    const result = await classifier.predictClass(activation);
    data[result.label] = data[result.label] + 1;

    if (result.label === 'good') {
      dispatchBackcare({ type: 'TEST_RESULT', result: <ImHappy style={ { color: "#9fd1bb" } } /> });
    } else {
      dispatchBackcare({ type: 'TEST_RESULT', result: <ImSad style={ { color: "#e290ade1" } } /> });
    }

  };

  //display/hide barchart 
  const handleBarChart = () => {
    setShowBarChart(true);
  };

  //creates structure for pie chart
  const graphdata = {
    labels: ['Bad posture', 'Good posture'],
    datasets: [
      {
        label: '# count',
        data: [data.bad, data.good],
        backgroundColor: [
          '#e290ade1',
          '#a2d5bf',
        ],
        borderColor: [
          '#e290ade1',
          '#a2d5bf',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className={ state.displayGraph || showBarChart ? classes.backDrop : classes.bigContainer } >
        <h2 className={ classes.heading }>Backcare watches your back</h2>
        <h3 className={ classes.subHeading }>Track your posture in real-time</h3>

        <div className={ classes.container }>
          <div className={ classes.screen }>
            <div className={ classes.instruction }>
              <h3>Instruction:</h3>
              { !state.isTrained &&
                <ul className={ classes.list }>
                  <li>⇢ Take multiple photos of good postures and bad postures
                  </li>
                  <li>
                    ⇢ You can test it by clicking 'Test'
                  </li>
                  <li>
                    ⇢ Once you are satisfied with your result, click 'Done'
                  </li>
                </ul> }
              { state.isTrained && (
                <ul className={ classes.list2 }>
                  <li>
                    ⇢  Click Track your posture to start tracking
                  </li>
                  <li>
                    ⇢  When are done simply click stop tracking
                  </li>
                  <li>
                    ⇢  You will get a record of your posture
                  </li>
                </ul>
              )
              }
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
          <div className={ classes.seperator }>
            { !state.isTrained && <div className={ classes.btncontainer }>
              <div className={ classes.btnCol } >
                <button
                  className={ `${classes.btn} ${classes.green}` }
                  onClick={ () => train('good') }>
                  <ImHappy style={ { fontSize: "1.5em" } } />
                </button>
                <button
                  className={ `${classes.btn} ${classes.red}` }
                  onClick={ () => train('bad') }>
                  <ImSad style={ { fontSize: "1.5em" } } />

                </button>
              </div>
              <div className={ classes.btnCol }>
                <button
                  className={ `${classes.btn} ${classes.blue}` }
                  onClick={ classifySample }>
                  Test </button>

                <button

                  className={ `${classes.btn} ${classes.blue}` }
                  onClick={ handleEndTraining }>
                  Done</button>
              </div>
            </div> }
            { !state.isTrained &&
              <div className={ classes.msgContainer }>
                <div className={ classes.postureCountContainer }>
                  <div className={ classes.postureCount }>Good Posture: { state.goodPostureCount }</div>
                  <div className={ classes.postureCount }>Bad Posture: { state.badPostureCount }</div>
                </div>
                <div className={ classes.resultMsg }>
                  { state.currentTestResult && (state.currentTestResult) }
                </div>
              </div>
            }
          </div>
          {
            state.intervalId && <div className={ classes.startTracking }>Tracking posture in progress...</div>
          }
          { state.isTrained && <div className={ classes.btnContainer2 }>
            <div className={ classes.blue_btnContainer2 }>
              <button
                className={ `${classes.btn} ${classes.blue}` }
                onClick={ classifyPosture }>
                Start Tracking</button>
              <button
                className={ `${classes.btn} ${classes.blue}` }
                onClick={ stopPostureTracking }>
                Stop Tracking</button>
            </div>
            <div className={ classes.green_btnContainer2 }>
              <button
                className={ `${classes.btn} ${classes.blue} ${classes.trainbtn}` }
                onClick={ handleResetTraining }>
                Re-train</button>
              <button
                className={ `${classes.btn} ${classes.blue} ${classes.trainbtn} ${classes.phbtn}` }
                onClick={ handleBarChart }>
                Posture History</button>
            </div>
          </div>

          }
        </div>
      </div>
      { showBarChart && <div className={ classes.graph2 }>
        <div className={ classes.graphHeader }>
          <h3 className={ classes.graphHeading }>Posture History</h3>
          <button onClick={ handleGraphs } className={ classes.closeBtn }><IoIosCloseCircleOutline /></button>
        </div>
        <><h4 className={ classes.barChartHeading }>Here is your monthly posture record</h4><div className={ classes.barChart }><BarChart /></div></>
      </div> }

      { !showBarChart && state.displayGraph && <div className={ classes.graph }>
        <div className={ classes.graphHeader }>
          { !showBarChart ?
            <h3 className={ classes.graphHeading }>Posture Record</h3> :
            <h3 className={ classes.graphHeading }>Posture History</h3>
          }
          <button onClick={ handleGraphs } className={ classes.closeBtn }><IoIosCloseCircleOutline /></button>
        </div>

        <div className={ classes.graphContainer }>
          { !showBarChart ? <Pie data={ graphdata } /> : "" }
          { showBarChart ? <><h4 className={ classes.barChartHeading }>Here is your monthly posture record</h4>
            <div className={ classes.barChart }><BarChart /></div></> : "" }
        </div>
      </div> }
    </>
  );
};

export default Backcare;