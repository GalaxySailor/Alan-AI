import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import NewsCards from "./components/NewsCards/NewsCards";
import wordsToNumbers from "words-to-numbers";

import useStyles from "./styles";

const alanKey =
  "846e9e3525e6b5ddd1102e3ce737558a2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;

          if (parsedNumber > 20) {
            alanBtn().playText(
              `You should pick article number between 0 and ${articles.length}`
            );
          } else {
            window.open(articles[parsedNumber - 1].url, "_blank");
            alanBtn().playText("Opening Now..");
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          className={classes.alanLogo}
          alt="alan logo"
        ></img>
      </div>
      <NewsCards
        articles={newsArticles}
        activeArticle={activeArticle}
      ></NewsCards>
    </div>
  );
};

export default App;
