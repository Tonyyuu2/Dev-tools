import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsEntryList from "./NewsEntryList";
import classes from "./NewsEntryList.module.css";



function News() {
  const [news, setNews] = useState();

  useEffect(() => {
    const fetchNewsData = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${process.env.REACT_APP_NEWS}`
      );
      setNews(response.data.articles)
    };
    fetchNewsData();
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










