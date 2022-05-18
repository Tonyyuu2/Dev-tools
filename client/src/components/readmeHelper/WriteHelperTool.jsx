import styles from "./WriteHelperTool.module.css"
import { useState } from "react";
import { Form, Card, Button } from "react-bootstrap"
import Loader from "./Loader"
const { Configuration, OpenAIApi } = require("openai");

export default function WriteHelperTool() {

  const [response, setResponse] = useState('Description will be printed HERE')
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
      <h1 className={styles.heading}>Project Description Generator</h1>
      <p className={styles.subheading}>Generate your project description for <b>README</b></p>

      <Form onSubmit={onFormSubmit}> 
        <Form.Group className={styles.formGroup} controlId="formBasicEmail">
          <Form.Control 
          type="text" 
          placeholder="Project Title"
          name="projectTitle" className={styles.formInput}  />
          <Form.Control 
          type="text" 
          placeholder="Tech Stack"
          name="techStack" className={styles.formInput} />
          <Form.Control 
          type="text" 
          placeholder="Functionalities"
          name="functionalities" className={styles.formInput} />
        </Form.Group>
        <div className={styles.btnGroup}>
          <Button className={styles.btnGenerate} variant="primary" type="submit" disabled={isLoading} >
            Generate
          </Button>
          <Button className={styles.btnReset} type="reset">
            Clear
          </Button>
        </div>
      </Form> 

      <br />
      <br />
      <Card className={styles.cardContainer}>
        <Card.Body>
          <Card.Text className={styles.description}>
              {isLoading ? <Loader /> : response}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}




