import styles from "./WriteHelperTool.module.css"
import { useState } from "react";
import Loader from "./Loader"
const { Configuration, OpenAIApi } = require("openai");

export default function WriteHelperTool() {

  const initStatement = <div className={styles.initStatement}>Description will be printed HERE</div>

  const [response, setResponse] = useState(initStatement)
  const [isLoading, setIsLoading] = useState(false)

  const onFormSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries())

    console.log(process.env.REACT_APP_API_KEY)
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });

  const openai = new OpenAIApi(configuration);


      setIsLoading(true);
      openai.createCompletion("text-davinci-002", {
        prompt: `Write me a detailed and professional description of my project that has a name of ${formDataObj.projectTitle}, uses ${formDataObj.techStack} as tech stacks and has functionalities of ${formDataObj.functionalities}.\n`,
        temperature: 0.7,
        max_tokens: 230,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((result) => {
        setIsLoading(false);
        setResponse(`${result.data.choices[0].text}`)
      })
  }



  return (
    <>
    <div className={styles.main_container}>
      <h1 className={styles.heading}>Project Description Generator</h1>
      <p className={styles.subheading}>Generate your project description for <b>README</b></p>

      <form onSubmit={onFormSubmit}> 
        <div className={styles.formGroup} controlId="formBasicEmail">
          <input
          type="text" 
          placeholder="Project Title"
          name="projectTitle" className={styles.formInput}  />
          <input
          type="text" 
          placeholder="Tech Stack"
          name="techStack" className={styles.formInput} />
          <input
          type="text" 
          placeholder="Functionalities"
          name="functionalities" className={styles.formInput} />
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btnGenerate} variant="primary" type="submit" disabled={isLoading} >
            Generate
          </button>
          <button className={styles.btnReset} type="reset">
            Clear
          </button>
        </div>
      </form> 

      <br />
      <br />
      <div className={styles.divContainer}>
        <div>
          <div className={styles.description}>
              {isLoading ? <Loader /> : response}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}




