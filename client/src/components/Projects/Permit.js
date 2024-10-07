import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Stack,
  Modal,
  IconButton,
  Tooltip,
} from "@mui/material";
import "../../App.css";
import AddImage from "../dialogues/AddImage/AddImage";
import { useParams } from "react-router-dom";
import { handleDownload } from "../../utils/S3";
import filePlaceHolder from "../../assets/FileSvg/file.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTokenFromLocalStorage } from "../../redux/apis/apiSlice";
import { useDeleteProjectFileMutation } from "../../redux/apis/Project/projectApiSlice";
import { toast } from "react-toastify";
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
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteProjectFile] = useDeleteProjectFileMutation();
  const handleModalOpen = (url) => {
    setModalUrl(url);
    setOpenModal(true);
  };
  const handleModalClose = (url) => {
    setModalUrl("");
    setOpenModal(false);
  };
  const { id } = useParams();
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://builderbuilder.net/project/files/${type}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      );
      //replace 123 with the project id
      // Assuming the response data is an array of file URLs
      setIsLoading(false)
      setRecentFilesUrls(response.data.recentFiles);
      setOlderFilesUrls(response.data.olderFiles);
    } catch (error) {
      console.error("Error fetching file URLs:", error);
      // Handle errors, such as displaying an error message
    }
  };
  const handleSetShowDelete = () => {
    setShowDelete(!showDelete);
  };
  const deleteProjectFileFunc = async (file) => {
    setShowDelete(false)
    try {
      const res = await deleteProjectFile({
        fileId: file.id,
        projectId: file.projectId,
      });
      toast.success("File successfully deleted");
      await fetchData();
    } catch (error) {
      console.log("Something went wrong!");
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div style={{ width: "100%", borderRadius: "14px", marginBottom: '14px' }}>
      <Box sx={themeStyle.titleBox}>
        <Typography sx={themeStyle.titleTypo}>
          {view} ({RecentfileUrls?.length} items){" "}
        </Typography>
        <Stack
          direction={{ sm: "row", xs: "column" }}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button sx={{ ...themeStyle.buttonStyle }} onClick={handleOpen}>
            Add
          </Button>

          <Button
            variant="outlined"
            sx={{ ...themeStyle.buttonStyle, }}
            fontSize={"12px"}
            style={{
              color: "white",
              backgroundColor: '#FFAC00',
              // fontWeight:'500'
              // textDecoration: "underline",
              // opacity: showDelete ? "" : "0.7",
            }}
            onClick={handleSetShowDelete}
          >
            Delete
          </Button>

        </Stack>
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
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            maxWidth={"900px"}
            maxHeight={"500px"}
            sx={scrollable}
          >
            {(RecentfileUrls?.length < 1 || isLoading) ? (
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  // height="100%" 
                  textAlign="center"
                  padding="2rem"
                  gap={2}
                >
                  <Typography variant="body1" color="textSecondary">
                    No images or files found.
                  </Typography>
                  {isLoading && <CircularProgress size={'16px'} />}
                </Box>
              </>
            ) : (
              RecentfileUrls.map((url, index) => {
                if (!url.fileUrl) {
                  return <></>;
                }
                const fileType = url.fileUrl.split(".").pop().toLowerCase();
                // const fileName = url.fileUrl.split("/").pop().toLowerCase();
                const isImage = [
                  "jpg",
                  "jpeg",
                  "png",
                  "gif",
                  "bmp",
                  "svg",
                  "webp",
                  "jfif",
                ].includes(fileType);
                return isImage ? ( // Check if url.fileUrl exists before splitting
                  <>
                    <Box
                      onClick={() => {
                        if (showDelete) return false;
                        handleModalOpen(url);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <Box
                        sx={{
                          display: showDelete ? "block" : "none",
                          position: "relative",
                          left: "76px",
                          top: "0px",
                          width: "40px",
                          backgroundColor: "white",
                          borderRadius: "999px",
                          zIndex: "999",
                        }}
                      >
                        <IconButton onClick={() => deleteProjectFileFunc(url)}>
                          <DeleteIcon sx={{ color: "#EC3710" }} />
                        </IconButton>
                      </Box>
                      <Tooltip title={url?.fileName || ''} placement="top">
                      <img
                        key={index}
                        alt={`Avatar ${index + 1}`}
                        src={url.fileUrl || placeholderImg}
                        style={{
                          ...themeStyle.AvatarBox,
                          objectFit: "scale-down",
                          margin: showDelete
                            ? "-2.5rem 0.5rem 0rem 0.5rem"
                            : "0rem 0.5rem 0rem 0.5rem",
                        }}
                        download="image"
                      />
                      </Tooltip>
                      <Typography
                        ml={"0.5rem"}
                        fontFamily={'var(--main-font-family)'}
                        fontSize={"12px"}
                        width={"100px"}
                        whiteSpace={"nowrap"}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                      >
                        {url?.notes}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      onClick={() => {
                        if (showDelete) return false;
                        handleDownload(url.fileUrl, url.fileName, setIsDownloading);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <Box
                        sx={{
                          display: showDelete ? "block" : "none",
                          position: "relative",
                          left: "76px",
                          top: "0px",
                          width: "40px",
                          backgroundColor: "white",
                          borderRadius: "999px",
                        }}
                      >
                        <IconButton onClick={() => deleteProjectFileFunc(url)}>
                          <DeleteIcon sx={{ color: "#EC3710" }} />
                        </IconButton>
                      </Box>
                      <Tooltip title={url?.fileName || ''} placement="top">
                      <img
                        src={filePlaceHolder}
                        alt={`${fileType.toUpperCase()} File`}
                        download="document"
                        style={{
                          ...themeStyle.AvatarBox,
                          border: "none",
                          margin: showDelete
                            ? "-2.5rem 0.5rem 0rem 0.5rem"
                            : "0rem 0.5rem 0rem 0.5rem",
                        }}
                      />
                      </Tooltip>
                      <Typography
                        ml={"0.5rem"}
                        fontFamily={'var(--main-font-family)'}
                        fontSize={"12px"}
                        width={"100px"}
                        whiteSpace={"nowrap"}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                      >
                        {url?.notes}
                      </Typography>
                    </Box>
                  </>
                );
              })
            )}
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
      {openModal && (
        <Modal
          open={true}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box style={{ ...style, outline: "none" }}>
            <IconButton onClick={handleClose} aria-label="close">
              {/* <CloseIcon /> */}
            </IconButton>
            <Stack justifyContent={"center"} alignItems={"center"}>
              <img
                src={modalUrl.fileUrl}
                alt={`file`}
                style={{
                  // Adjust width as needed
                  // maxWidth: '700px', // Set a maximum width for responsiveness
                  // maxHeight: '500px', // Set a maximum height for responsiveness
                  maxWidth: "90vw",
                  maxHeight: "82vh",
                }}
              />
              <Typography
                fontFamily={'var(--main-font-family)'}
                fontSize={"12px"}
                p={1}
                textOverflow={"ellipsis"}
              >
                {modalUrl?.notes}
              </Typography>
            </Stack>
          </Box>
        </Modal>
      )}
      {open && (
        <AddImage
          showDelete={showDelete}
          setShowDelete={setShowDelete}
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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  borderRadius: "14px",
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
  overflowY: "auto",
};
const themeStyle = {
  button: {
    fontFamily: 'var(--main-font-family)',
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    border: "none",
    backgroundColor: "#4C8AB1",
    cursor: "pointer",
    padding: "4px",
    marginTop: "0px",
  },
  titleBox: {
    display: "flex",
    // width: { xl: "52vw" },
    justifyContent: "space-between",
    alignItems: "center",
    background: "#4C8AB1",
    borderRadius: "14px 14px 0 0",
  },
  titleTypo: {
    color: "#FFFFFF",
    fontFamily: 'var(--main-font-family)',
    fontSize: { xl: "1.3rem", lg: 15, md: "1.3rem", xs: "1.3rem", },
    margin: { sm: "1rem 2rem", xs: "2rem" },
  },
  buttonStyle: {
    padding: "0.7rem 0.1rem",
    fontSize: { xl: "0.9rem", lg: "0.8rem", md: "0.9rem", sm: "0.9rem", xs: "0.9rem", },
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
    fontFamily: 'var(--main-font-family)',
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
    ObjectFit: "scale-down",
  },
  NoImgbox: {
    // border: "1px solid #9B9696",
    borderRadius: "0.4rem",
    background: "none",
    width: "100px",
    height: "100px",
    ObjectFit: "scale-down",
  },
};
export default Permit;
