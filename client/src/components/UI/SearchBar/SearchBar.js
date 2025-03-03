import * as React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useGetUserPinnedProjectQuery, useGetUserProjectsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addPinnedProject,
  addProjects,
  setError,
  setIsLoading,
  setLimit,
  setTotalCount,
  setTotalPages,
} from "../../../redux/slices/Project/userProjectsSlice";
import QueryDebouncer from "../../../utils/QueryDebouncer/QueryDebouncer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


const Search = styled("div")(({ theme }) => ({
  display: "flex",
  width: "306px",
  height: "25px",
  padding: "8px 16px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
  borderRadius: "60px",
  border: "1px solid rgba(83, 83, 83, 0.15)",
  background: "#F8FAFF",
  position: "relative",
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    margin: "auto",
    width: "80%",
  },
  [theme.breakpoints.up("xs")]: {
    margin: "auto",
    width: "70%",
  },
  justifyContent: "center",
  margin: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  height: "76%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#535353C9",
  width: "100%",
  "& .MuiInputBase-input::placeholder": {
    fontFamily: "var(--main-font-family)",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBar = ({ selectedFilters, page = 1, setPage, selectedTab, projectsPage }) => {
  const { t } = useTranslation();
  const {id}  = useParams()
  const fetchPinnedProjectToggle = useSelector(state => state.userProjects.fetchPinnedProjectToggle)
  const filter = selectedFilters ? selectedFilters.join(",") : "";
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedValue = QueryDebouncer(searchQuery, 500);
  const local = localStorage.getItem("userInfo");
  const currentUser = JSON.parse(local);
  const UserId = currentUser.user.id;
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  // console.log(path);
  // console.log(selectedTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: pinnedProject, refetch: refetchPinnedProject, isLoading1 } =
    useGetUserPinnedProjectQuery({
      userId: UserId,
    });
  const { data, refetch, isLoading2, error, isSuccess } =
    useGetUserProjectsQuery({
      userId: UserId,
      q: debouncedValue,
      filter: filter,
      page: id ? "" : page,
    });
  const isLoading = isLoading1 || isLoading2;

  React.useEffect(() => {
    if (selectedTab === 0 || selectedTab === 1 || selectedTab === 2) {
      // console.log("run");
      // console.log(data);
      dispatch(setIsLoading(isLoading));
      if (data) {
        if (data?.projects?.length < 1 && !projectsPage && debouncedValue === "") {
          navigate("/assignproject")
          toast.info("Welcome! Add a project to get started.");
          return;
        }
        dispatch(addPinnedProject(pinnedProject?.pinnedProject));
        dispatch(addProjects(data?.projects));
        dispatch(setTotalCount(data?.totalCount));
        dispatch(setTotalPages(data?.totalPages));
        dispatch(setLimit(data?.limit));
      } else {
        dispatch(setError(error));
      }
    }
  }, [data, dispatch, error, isLoading, selectedTab, id]);

  const refetchProjects = async () => {
    const res = await refetch({
      userId: UserId,
      q: debouncedValue,
      filter: filter,
      page: page,
    });
  };
  React.useEffect(() => {
    if (setPage) {
      setPage(1);
    }
  }, [debouncedValue]);
  React.useEffect(() => {
    if (selectedTab === 0 || selectedTab === 1) refetchProjects();
  }, [selectedTab]);

  React.useEffect(() => {
    if (path === "settings") {
      refetchProjects();
    }
  }, [path]);
  React.useEffect(() => {
    refetchPinnedProject();
    refetchProjects()
  }, [fetchPinnedProjectToggle]);
  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon style={{ color: "#535353C9" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={t("ProjectList.Search")}
          inputProps={{ "aria-label": "search" }}
          sx={{ width: { xl: "300px", lg: "200px" } }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Search>
    </>
  );
};

export default SearchBar;
