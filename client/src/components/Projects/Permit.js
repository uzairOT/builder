import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
  Stack,
  Modal,
  IconButton,

} from "@mui/material";
import "../../App.css";
import AddImage from "../dialogues/AddImage/AddImage";
import { useParams } from "react-router-dom";
import { fileTypeIcons } from "../dialogues/AddImage/assets/fileTypes";
import { handleDownload } from "../../utils/S3";
import filePlaceHolder from '../../assets/FileSvg/file.svg'
function Permit({ view, type }) {
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('')
  const handleModalOpen = (url) => {
    setModalUrl(url);
    setOpenModal(true);
  };
  const handleModalClose = (url) => {
    setModalUrl('');
    setOpenModal(false);
  };
  const { id } = useParams();
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
 
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div style={{ width: "100%" }}>
      <Box sx={themeStyle.titleBox}>
        <Typography sx={themeStyle.titleTypo}>{view} ({RecentfileUrls?.length} items) </Typography>
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
          {/* <Box sx={{ width: "15%" }}>
            <Typography
              sx={{ ...themeStyle.titleTypo, ...themeStyle.permitType }}
            >
              Recent
            </Typography>
            <Typography
              sx={{ ...themeStyle.titleTypo, ...themeStyle.permitNumber }}
            >
              Permits
            </Typography>
            <Box sx={{ margin: "1rem 2rem" }}>
              {isDownloading && <CircularProgress size={"18px"} />}
            </Box>
          </Box> */}
          {/* Render avatars dynamically with image URLs */}
          <Stack direction={"row"} flexWrap={'wrap'} maxWidth={"900px"} maxHeight={'500px'} sx={scrollable} >
            {RecentfileUrls.map((url, index) => {
              const fileType = url.fileUrl.split(".").pop().toLowerCase();
              const fileName = url.fileUrl.split("/").pop().toLowerCase();
              const isImage = [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "bmp",
                "svg",
                "webp",
              ].includes(fileType);
              return isImage ? ( // Check if url.fileUrl exists before splitting
                <>
                  <Box
                    onClick={() => {
                      handleModalOpen(url);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      key={index}
                      alt={`Avatar ${index + 1}`}
                      src={url.fileUrl || placeholderImg}
                      style={themeStyle.AvatarBox}
                      download="image"
                    />
                    <Typography ml={'0.5rem'} fontFamily={'inherit'} fontSize={'12px'} width={'100px'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>{url?.notes}</Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    onClick={() => {
                      handleDownload(url.fileUrl, fileName, setIsDownloading);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={filePlaceHolder}
                      alt={`${fileType.toUpperCase()} File`}
                      download="document"
                      style={{
                        ...themeStyle.AvatarBox,
                        border: "none",
                      }}
                    />
                    <Typography ml={'0.5rem'}  fontFamily={'inherit'} fontSize={'12px'} width={'100px'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'} >{url?.notes}</Typography>
                  </Box>
                </>
              ) 
            })}
          </Stack>
        </Box>
        {/* <Box sx={themeStyle.permitBox}>
          <Box sx={{ width: "15%" }}>
            <Typography
              sx={{ ...themeStyle.titleTypo, ...themeStyle.permitType }}
            >
              Last Week
            </Typography>
            <Typography
              sx={{ ...themeStyle.titleTypo, ...themeStyle.permitNumber }}
            >
              Permits
            </Typography>
          </Box>
          Render avatars dynamically with image URLs
          {OlderfileUrls.map((url, index) => (
            <Avatar
              key={index}
              alt={`Avatar ${index + 1}`}
              src={url.fileUrl || placeholderImg} // Use the image URL or fallback to placeholder image
              sx={themeStyle.AvatarBox} // Adjust size as needed
            />
          ))}
        </Box> */}
      </Box>
      {openModal && <Modal
        open={true}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      
      >
        <Box style={{...style, outline: 'none'}} >
          <IconButton
            onClick={handleClose}
            aria-label="close"
            
          >
            {/* <CloseIcon /> */}
          </IconButton>
          <img
            src={modalUrl.fileUrl}
            alt={`file`}
            style={
              {
                width: '100%', // Adjust width as needed
                // maxWidth: '700px', // Set a maximum width for responsiveness
                // maxHeight: '500px', // Set a maximum height for responsiveness

              }
            }
          />
        <Typography fontFamily={'inherit'} fontSize={'12px'}  textOverflow={'ellipsis'}>{modalUrl?.notes}</Typography>
        </Box>
      </Modal>}
      {open && (
        <AddImage
          handleOpen={handleOpen}
          handleClose={handleClose}
          heading={type}
          fetchData={fetchData}
        ></AddImage>
      )}
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'14px',
  boxShadow: 24,
  p: 4,
};
const scrollable = {
  scrollbarWidth: "thin", // For Firefox
  "-ms-overflow-style": "none", // For IE and Edge
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "transparent",
    transition: "background-color 0.3s",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: "#ddd",
  },
  overflowY: "scroll",
};
const themeStyle = {
  titleBox: {
    display: "flex",
    width: { xl: "52vw" },
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
    height: "100px",
    margin: "2rem 0.5rem 0rem 0.5rem",
    ObjectFit: "contain",
  },
};
export default Permit;
