import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsEntryList from "./NewsEntryList";
import classes from "./NewsEntryList.module.css";

const API_KEY = "fbc678a164f34df6a9fe965447bb8e00";

function News() {
  const [news, setNews] = useState();
  console.log("news :", news);

  useEffect(() => {
    const fetchNewsData = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${API_KEY}`
      );
      console.log('response :', response);
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
      <label className={classes.topstories}>Top Stories</label>
      </div>
      {newsEntryList}
    </div>
  );
}

export default News;
