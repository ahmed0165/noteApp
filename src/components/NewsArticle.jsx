import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import { styled } from "@mui/material/styles";
import StyledCard from "./StyledCard";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";

const Link = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));
function NewsArticle(props) {
  const { image, title, description, author, puplishedAt, url } = props;
  return (
    <StyledCard>
      <Link target="_blank" href={url}>
        <CardActionArea>
          {image && (
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt="Sample article"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <Box p={2}>
        <Typography variant="caption" color="textSecondary" display="block">
          {author}
        </Typography>
        {puplishedAt && (
          <Typography variant="caption" color="textSecondary">
            {new Date(puplishedAt).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </StyledCard>
  );
}
export default NewsArticle;
