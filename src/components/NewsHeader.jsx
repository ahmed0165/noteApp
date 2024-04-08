import react from "react";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { Select, MenuItem } from "@mui/material";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginLeft: "auto",
  width: 200,
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 5),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.action,
  backgroundColor: theme.palette.common.white,
  "&:before": {
    borderColor: theme.palette.action,
  },
  "&:after": {
    borderColor: theme.palette.action,
  },
  "& .MuiSelect-icon": {
    color: theme.palette.action,
  },
  margin: theme.spacing(2),
  width: 200,
  height: 40,
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

function NewsHeader(props) {
  const { onSearchChange, category, onCategoryChange } = props;
  const handleInputChange = (event) => {
    onSearchChange(event.target.value);
  };
  return (
    <AppBar position="static">
      <ToolBar>
        <Typography variant="h&">NewsFeed App</Typography>
        <StyledSelect value={category} onChange={onCategoryChange}>
          <StyledMenuItem value="general">General</StyledMenuItem>
          <StyledMenuItem value="business">Business</StyledMenuItem>
          <StyledMenuItem value="entertainment">Entertainment</StyledMenuItem>
          <StyledMenuItem value="health">Health</StyledMenuItem>
          <StyledMenuItem value="science">Science</StyledMenuItem>
          <StyledMenuItem value="sports">Sports</StyledMenuItem>
          <StyledMenuItem value="technology">Technology</StyledMenuItem>
        </StyledSelect>
        <Search>
          <SearchIconWrapper>
            <SearchIcon color="action" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleInputChange}
          />
        </Search>
      </ToolBar>
    </AppBar>
  );
}
export default NewsHeader;
