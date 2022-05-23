import axios from "axios";
import { useState } from "react";
import styles from "./Random.module.css"

export default function Random() {

const [randomFacts, setRandomFacts] = useState("")
const [randomCocktails, setrandomCocktails] = useState("")
const [randomActivities, setRandomActivities] = useState("")
const [randomMamaJoke, setRandomMamaJoke] = useState("")


  const fetchRandomFact = async () => {
    const res = await axios.get(`https://uselessfacts.jsph.pl/random.json?language=en`
    );
    setRandomFacts(await res.data.text)
    console.log(await res.data.text);
  } 

  const fetchRandomActivity = async () => {
    const res = await axios.get(`https://www.boredapi.com/api/activity`
    );
    setRandomActivities(await res.data.activity)
    console.log(await res.data.activity);
  } 

  const fetchRandomCocktail = async () => {
    const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`
    );
    setrandomCocktails(await res.data.drinks[0])
    console.log(await res.data.drinks[0]);
  } 

  const fetchRandomMamaJoke = async () => {
    const res = await axios.get(`https://api.chucknorris.io/jokes/random`
    )
    setRandomMamaJoke(await res.data.value)
    console.log(await res.data.value);
  } 


  

  




  return (

    <div className={styles.container}>
     <h1 className={styles.title}>Random Buttons</h1>
     <div className={styles.response}>{randomFacts}</div>
     <div className={styles.response}>{randomActivities}</div>
     <div className={styles.response}>{randomCocktails.strDrink}</div>
     <img className={styles.img} src={randomCocktails.strDrinkThumb}></img>
     <div className={styles.response}>{randomMamaJoke}</div>

     <button className={styles.btn} onClick={fetchRandomFact}>Click me</button>
     <button className={styles.btn} onClick={fetchRandomActivity}>Click me</button>
     <button className={styles.btn} onClick={fetchRandomMamaJoke}>Click me</button>
     <button type="submit" className={styles.btn} onClick={fetchRandomCocktail}>Click me</button>
    </div>
  )
}

