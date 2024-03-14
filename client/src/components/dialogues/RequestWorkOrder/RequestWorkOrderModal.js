import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddIcon from "@mui/icons-material/Add";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Avatarimg from "../Assets/pngs/woman.png";
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import moment from 'moment';
import {useSelector} from 'react-redux'
import { selectAddPhase } from "../../../redux/slices/addPhaseSlice";

const RequestWorkOrderModal = () => {
  const [open, setOpen] = useState(false);
  const {rowCheckboxes} = useSelector(selectAddPhase);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Stack alignItems={"flex-end"} justifyContent={"flex-end"} pr={2}>
        <BuilderProButton
          backgroundColor={"#4C8AB1"}
          variant={"contained"}
          fontFamily={"Inter, sans serif"}
          fontSize={"16px"}
          fontWeight={"600"}
          padding={"6px 32px 6px 32px"}
          handleOnClick={handleOpen}
          disabled={!rowCheckboxes.some((checkbox) => checkbox)}
        >
          Next
        </BuilderProButton>
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Stack sx={style} height={'90%'} overflow={'scroll'}>
          <Typography
            p={2}
            color={"#4C8AB1"}
            fontFamily={"inherit"}
            fontSize={"22px"}
            fontWeight={"600"}
          >
            Request Work Order
          </Typography>
          <Divider />
          <Stack direction={{xl:"row", lg:'row', md:'column', sm:'column', xs:'column'}}>
            <Stack p={3} spacing={1}>
              <Typography fontFamily={"inherit"}>
                <strong>Subject: </strong> Tile
              </Typography>
              <Typography pb={1} fontFamily={"inherit"} fontWeight={"200"}>
                <strong>Description: </strong> Lorem Ipsum is simply dummy text
                of the printing.
              </Typography>
              <Divider />

              <Typography pt={1} sx={themeStyle.headingText}>
                Total
              </Typography>
              <Stack pb={1} direction={"row"} justifyContent={"space-between"}>
                <Typography
                  sx={{ ...themeStyle.typoTitle, ...themeStyle.costText }}
                >
                  $545.66 US
                </Typography>
                <BorderColorIcon style={{ color: "#484848" }} />
              </Stack>
              <Divider />
              <Stack
                direction={{xl:"row", lg:'row', md:'column'}}
                justifyContent={"space-around"}
                spacing={8}
                pt={1}
              >
                <Stack>
                  <Typography sx={themeStyle.headingText}>
                    Phases
                    <Typography
                      sx={{
                        ...themeStyle.headingText,
                        color: "#9E9E9E",
                        marginTop: "0rem",
                      }}
                    >
                      1/1
                    </Typography>
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Furniture repairing"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        sx={themeStyle.radioText}
                        value="Furniture repairing"
                        control={<Radio sx={themeStyle.radioChecked} />}
                        label="Repairing"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    sx={themeStyle.linkButton}
                    startIcon={<AddIcon sx={{ color: "#000" }} />}
                  >
                    Add Phase
                  </Button>
                </Stack>
                <Stack>
                  <Typography sx={themeStyle.headingText}>
                    Line Item
                    <Typography
                      sx={{
                        ...themeStyle.headingText,
                        color: "#9E9E9E",
                        marginTop: "0rem",
                      }}
                    >
                      1/3
                    </Typography>
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Furniture repairing"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        sx={themeStyle.radioText}
                        value="Furniture repairing"
                        control={<Radio sx={themeStyle.radioChecked} />}
                        label="Furniture repairing"
                      />
                      <FormControlLabel
                        sx={themeStyle.radioText}
                        value="Room renovation"
                        control={<Radio sx={themeStyle.radioChecked} />}
                        label="Room renovation"
                      />
                      <FormControlLabel
                        sx={themeStyle.radioText}
                        value="Wood work"
                        control={<Radio sx={themeStyle.radioChecked} />}
                        label="Wood work"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    sx={themeStyle.linkButton}
                    startIcon={<AddIcon sx={{ color: "#000" }} />}
                  >
                    Add Line Item
                  </Button>
                </Stack>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Typography pt={1} sx={themeStyle.headingText}>
                  Date Started
                </Typography>
                <Typography
                  sx={{ ...themeStyle.typoTitle, ...themeStyle.costText }}
                >
                  24/ Feb/ 2023
                </Typography>
              </Stack>
              <Stack spacing={1} pt={2}>
                <Typography pt={1} sx={themeStyle.headingText}>
                  Date Ended
                </Typography>
                <Typography
                  sx={{ ...themeStyle.typoTitle, ...themeStyle.costText }}
                >
                  24/ Feb/ 2023
                </Typography>
                <Stack width={"80%"} pt={8}>
                  <BuilderProButton
                    backgroundColor={"#4C8AB1"}
                    variant={"contained"}
                    fontFamily={"Inter, sans serif"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                    padding={"6px 32px 6px 32px"}
                    handleOnClick={handleOpen}
                    marginLeft={"0px"}
                  >
                    Request Work Order
                  </BuilderProButton>
                </Stack>
              </Stack>
            </Stack>
            <Stack backgroundColor={"#EFF5FF"}>
              <Box>
                <Typography
                  sx={{
                    ...themeStyle.headingText,
                    ...themeStyle.rightheadings,
                  }}
                >
                 Created By
                </Typography>
                <Box sx={themeStyle.avatarBox}>
                  <Avatar sx={themeStyle.AvatarStyle} src={Avatarimg} />
                  <Typography fontFamily={'inherit'} alignSelf={'end'}>Micheal Jordon</Typography>
                </Box>
                {/* Divider  */}
                <hr style={themeStyle.hrLine} />

                <Typography
                  sx={{
                    ...themeStyle.headingText,
                    ...themeStyle.rightheadings,
                  }}
                >
                  Assigned
                </Typography>
                <Box sx={themeStyle.avatarBox}>
                  <Avatar sx={themeStyle.AvatarStyle} src={Avatarimg} />
                  <AddCircleOutlineIcon
                    sx={{ ...themeStyle.AvatarStyle, color: "#A8A8A8" }}
                  />
                </Box>
                {/* Divider  */}
                <hr style={themeStyle.hrLine} />

                <Typography
                  sx={{
                    ...themeStyle.headingText,
                    ...themeStyle.rightheadings,
                  }}
                >
                  Due Date
                </Typography>
                <Box sx={themeStyle.dateBox}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DemoContainer components={["DateTimePicker"]} >
                      <DateTimePicker
                        format="MMM D, YYYY,h:mm a"
                        viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                        }}
                        defaultValue={moment('2024-04-17T15:30')}
                        slotProps={{
                            // Targets the `IconButton` component.
                            openPickerButton: {
                              color: '#5B5B5B',
                            },
                            // Targets the `InputAdornment` component.
                            inputAdornment: {
                              position: 'start',
                            },
                          }}
                          sx={{
                            input: {
                                fontFamily: 'GT-Walsheim-Regular-Trial, sans serif'
                            }
                          }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
                {/* Divider  */}
                <hr style={themeStyle.hrLine} />
                <Typography
                  sx={{
                    ...themeStyle.headingText,
                    ...themeStyle.rightheadings,
                  }}
                >
                  Set Priority
                </Typography>
                <Button
                  sx={{ ...themeStyle.linkButton, ...themeStyle.priorityButton }}
                  endIcon={<KeyboardArrowDownIcon sx={{ color: "#636363" }} />}
                  startIcon={<FlagOutlinedIcon sx={{ color: "#EB1717" }} />}
                >
                  Urgent
                </Button>
                <hr style={themeStyle.hrLine} />
                <Typography
                  sx={{
                    ...themeStyle.headingText,
                    ...themeStyle.rightheadings,
                  }}
                >
                  Status
                </Typography>
                <Button
                  sx={{ ...themeStyle.linkButton, ...themeStyle.pendingbutton }}
                  endIcon={<KeyboardArrowDownIcon sx={{ color: "#636363" }} />}
                >
                  Pending
                </Button>
              </Box>
              <Stack spacing={0.5} p={1} px={3}>
                <Typography fontSize={'13px'} style={{fontFamily: 'GT-Walsheim-Regular-Trial, sans serif'}}>Created</Typography>
                <Typography fontSize={'14px'} color={'black'} fontWeight={'600'} style={{fontFamily: 'GT-Walsheim-Regular-Trial, sans serif'}}>Feb 6,2023,10:30 AM</Typography>
                <Typography fontSize={'13px'} style={{fontFamily: 'GT-Walsheim-Regular-Trial, sans serif'}}>Updated</Typography>
                <Typography fontSize={'14px'} color={'black'} fontWeight={'600'} style={{fontFamily: 'GT-Walsheim-Regular-Trial, sans serif'}}>CreatFeb 6,2023,10:30 AM</Typography>
                </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default RequestWorkOrderModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 0,
  borderRadius: "14px",
};
const themeStyle = {
  typoTitle: {
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "#4C8AB1",
    marginLeft: "-1rem",
  },
  buttonBox: {
    display: "flex",
    flexDirection: { lg: "row", sm: "row", xs: "column" },
    justifyContent: "flex-start",
    marginTop: "3rem",
    marginBottom: "2rem",
    gap: "1rem",
  },
  dialogcontentBox: {
    display: "flex",
    flexDirection: { lg: "row", sm: "column", xs: "column" },
    padding: "0rem",
    margin: "-0.5rem -1rem -1rem 0rem",
  },
  leftBox: {
    width: { lg: "55%", md: "100%", xs: "100%" },
    display: "flex",
    flexDirection: "column",
    paddingLeft: "1.5rem",
  },
  rightBox: {
    width: { lg: "45%", md: "100%", xs: "100%" },
    background: "#EFF5FF",
    display: "flex",
    flexDirection: "column",
  },
  paperPropsStyle: {
    borderRadius: "1rem",
    width: { lg: "90%", md: "60%", sm: "60%", xs: "70%" },
    maxWidth: { lg: "50%", md: "60%", sm: "60%", xs: "70%" },
    padding: "1rem 1rem", // Change background color here
  },

  typoText: {
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    fontSize: "1rem",
    color: "#202227",
  },
  sendButton: {
    width: { lg: "35%", md: "35%", sm: "40%", xs: "60%" },
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  },
  declineButton: {
    background: "#FFF",
    color: "#4C8AB1",
    border: "1px solid #4C8AB1",
    ":hover": {
      background: "#FAF9F6",
    },
  },
  time: {
    fontFamily: "inherit",
    fontSize: "1rem",
    fontStyle: "italic",
    color: "#484848",
    marginTop: "1.5rem",
    whiteSpace: "nowrap",
  },
  hrLine: {
    border: "1px solid #CCCCCC",
    width: "98%",
    marginTop: "-0.7rem",
  },
  radioText: {
    color: "#3D3D3D",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  },
  radioChecked: {
    "&, &.Mui-checked": {
      color: "#000",
    },
  },
  headingText: {
    fontFamily: "inherit",
    color: "#000000",
    fontWeight: 600,
    marginTop: "0.5rem",
    fontSize: "1.1rem",
    display: "flex",
    gap: "1rem",
  },
  rightheadings: {
    fontSize: "0.9rem",
    color: "#636363",
    margin: "1rem 0rem 0rem 2rem",
  },
  linkButton: {
    fontFamily: "Inter",
    fontWeight: 500,
    textTransform: "none",
    color: "#858585",
    fontSize: { lg: "0.9rem", md: "0.9rem", sm: "0.8rem", xs: "0.6rem" },
    justifyContent: "flex-start",
    marginLeft: "-0.3rem",
    marginBottom: "1rem",
  },
  costText: {
    marginLeft: "0rem",
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  pendingbutton: {
    margin: "0rem 0rem 1rem 1.5rem",
    color: "#D92525",
  },
   priorityButton : {
    margin: "0rem 0rem 1rem 1.5rem",
    color: "#636363",
  },
  avatarBox: {
    display: "flex",
    margin: "0.2rem 0rem 1rem 1rem",
    gap: "2rem",
  },
  AvatarStyle: {
    width: 30,
    height: 30,
    ml: 2,
    mt: 1,
  },
  dateBox: {
    display: "flex",
    paddingLeft: "1.5rem",
    marginTop: "-1rem",
  },
};
