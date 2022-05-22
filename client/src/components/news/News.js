import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsEntryList from "./NewsEntryList";
import classes from "./NewsEntryList.module.css";
import options from "./Newshelper"



function News() {
  const [news, setNews] = useState();
  
  useEffect(() => {

    axios.request(options).then((response) => {
      console.log(response.data.articles);
      setNews(response.data.articles)
    })
  }, []);

  const newsEntryList = news?.map((article, index) => (
    <NewsEntryList key={index} {...article} />
  ));

  return (
    <div className={classes.newscontainer}>
      <div className={classes.sticky}>
      <label className={classes.topStories}>Tech Buzz</label>
      </div>
      <div className={classes.newsEntries}>
      {newsEntryList}
      </div>
    </div>
  );
}

export default News;
