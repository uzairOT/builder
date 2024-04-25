import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Paper, Box, Typography, Button, Avatar } from "@mui/material";
import "../../App.css";
import YellowBtn from "../UI/button";
import AddImage from "../dialogues/AddImage/AddImage";
import { useParams } from "react-router-dom";
function Permit({ view, type }) {
  const objectFit = { objectFit: "none" };
  const permitsData = [
    { type: "Recent", count: "4" },
    { type: "Last Week", count: "16" },
  ];
  const img = `https://source.unsplash.com/random/100x100`;
  const placeholderImg = `https://source.unsplash.com/random/100x100`;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [RecentfileUrls, setRecentFilesUrls] = useState([]);
  const [OlderfileUrls, setOlderFilesUrls] = useState([]);
  const {id} = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://3.135.107.71/project/files/${type}/${id}` 
        );
        //replace 123 with the project id
        // Assuming the response data is an array of file URLs
        setRecentFilesUrls(response.data.recentFiles);
        setOlderFilesUrls(response.data.olderFiles);
      } catch (error) {
        console.error("Error fetching file URLs:", error);
        // Handle errors, such as displaying an error message
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Box sx={themeStyle.titleBox}>
        <Typography sx={themeStyle.titleTypo}>{view}</Typography>
        <Button sx={{ ...themeStyle.buttonStyle }} onClick={handleOpen}>
          Add {view}
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={themeStyle.permitBox}>
          <Box sx={{ width: "15%" }}>
            <Typography
              sx={{ ...themeStyle.titleTypo, ...themeStyle.permitType }}
            >
              Recent
            </Typography>
            <Typography
              sx={{ ...themeStyle.titleTypo, ...themeStyle.permitNumber }}
            >
              4 Permits
            </Typography>
          </Box>
          {/* Render avatars dynamically with image URLs */}
          {RecentfileUrls.map((url, index) => (
            <img
              key={index}
              alt={`Avatar ${index + 1}`}
              src={url.fileUrl || placeholderImg} // Use the image URL or fallback to placeholder image
              style={themeStyle.AvatarBox} // Adjust size as needed
            />
          ))}
        </Box>
        <Box sx={themeStyle.permitBox}>
          <Box sx={{ width: "15%" }}>
            <Typography
              sx={{ ...themeStyle.titleTypo, ...themeStyle.permitType }}
            >
              Last Week
            </Typography>
            <Typography
              sx={{ ...themeStyle.titleTypo, ...themeStyle.permitNumber }}
            >
              16 Permits
            </Typography>
          </Box>
          {/* Render avatars dynamically with image URLs */}
          {OlderfileUrls.map((url, index) => (
            <Avatar
              key={index}
              alt={`Avatar ${index + 1}`}
              src={url.fileUrl || placeholderImg} // Use the image URL or fallback to placeholder image
              sx={themeStyle.AvatarBox} // Adjust size as needed
            />
          ))}
        </Box>
      </Box>
      {open && (
        <AddImage
          handleOpen={handleOpen}
          handleClose={handleClose}
          heading={view}
        ></AddImage>
      )}
    </div>
  );
}
const themeStyle = {
  titleBox: {
    display: "flex",
    width: "52vw",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#4C8AB1",
    borderRadius: "6px 6px 0 0",
  },
  titleTypo: {
    color: "#FFFFFF",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    fontSize: "1.3rem",
    margin: "1rem 2rem",
  },
  buttonStyle: {
    padding: "0.7rem 0.1rem",
    fontSize: "0.9rem",
    marginRight: "1rem",
    backgroundColor: "#FFFFFF",
    color: "#4C8AB1",
    border: "none",
    borderRadius: { lg: "2.5rem", md: "2.5rem", sm: "2.5rem", xs: "0.5rem" },
    cursor: "pointer",
    width: { lg: "auto", md: "auto", sm: "auto", xs: "100%" },
    minWidth: "9.5rem",
    // maxWidth: "19.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "none",
    gap: "0.625rem",
    "&:hover": {
      backgroundColor: "lightgray",
    },
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    lineHeight: "normal",
  },
  permitBox: {
    borderRadius: "0.5rem",
    background: "#EFF5FF",
    width: "93%",
    display: "flex",
    flexDirection: "row",
    marginTop: "2rem",
  },
  permitType: {
    color: "#4C8AB1",
    whiteSpace: "nowrap",
  },
  permitNumber: {
    fontSize: "1rem",
    marginTop: "-1rem",
    fontWeight: 275,
    color: "#202227",
  },
  AvatarBox: {
    border: "1px solid #9B9696",
    borderRadius: "0.4rem",
    background: "none",
    width: "100px",
    margin: "2rem 0.5rem",
    ObjectFit: "cover",
  },
};
export default Permit;