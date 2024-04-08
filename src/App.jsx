import { Container, Button } from "@mui/material";
import NewsHeader from "./components/NewsHeader";
import Typography from "@mui/material/Typography";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { debounce } from "lodash";
function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");
  const pageNumber = useRef(1);
  const queryValue = useRef("");

  async function loadData(currentCategory) {
    console.log(currentCategory);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${currentCategory}&q=${
        queryValue.current
      }&page=${pageNumber.current}&pageSize=5&country=eg&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    );
    const data = await response.json();
    console.log(data);
    if (data.status === "error") {
      throw new Error(data.message);
    }

    return data.articles.map((article) => {
      const { title, description, author, puplishedAt, urlToImage, url } =
        article;
      return {
        url,
        title,
        description,
        author,
        puplishedAt,
        image: urlToImage,
      };
    });
  }
  const fetchAndUpdateArticle = (currentCategory) => {
    setLoading(true);
    setError("");
    loadData(currentCategory ?? category)
      .then((newData) => {
        setArticles(newData);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedLoadData = debounce(fetchAndUpdateArticle, 500);

  useEffect(() => {
    fetchAndUpdateArticle();
  }, []);

  const handleSearchChange = (newQuery) => {
    pageNumber.current = 1;
    queryValue.current = newQuery;
    debouncedLoadData();
  };

  const handleNextClick = () => {
    pageNumber.current = pageNumber.current + 1;
    fetchAndUpdateArticle();
  };
  const handlePreviousClick = () => {
    pageNumber.current = pageNumber.current - 1;
    fetchAndUpdateArticle();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    pageNumber.current = 1;
    fetchAndUpdateArticle(e.target.value);
  };

  const Footer = styled("div")(({ theme }) => ({
    margin: theme.spacing(2, 0),
    display: "flex",
    justifyContent: "space-between",
  }));
  return (
    <Container>
      <NewsHeader
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
      />

      {error.length === 0 ? (
        <NewsFeed articles={articles} loading={loading} />
      ) : (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePreviousClick}
          disabled={loading || pageNumber.current === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextClick}
          disabled={loading || articles.length < 5}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
