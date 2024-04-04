import { ButtonGroup, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import WorkOrder from "./WorkOrder";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddPhaseView from "../../AssignProject/AddPhaseView/AddPhaseView";
import RequestWorkOrderModal from "../../dialogues/RequestWorkOrder/RequestWorkOrderModal";
import { useGetProjectWorkOrderQuery } from "../../../redux/apis/Project/projectApiSlice";
import { useGetRequestWorkOrderQuery } from "../../../redux/apis/Project/workOrderApiSlice";
import { useParams } from "react-router-dom";

const WorkOrderView = () => {
  // const [changeView, setChangeView] = useState(false);
  const [checkedRow, setCheckedRow] = useState(null);
  const {data} = useGetProjectWorkOrderQuery();
  console.log(data)
    console.log(checkedRow)
    const {id} = useParams();
    const getUserIdFromLocalStorage = () => {
      const userData = localStorage.getItem('user');
      if(userData){
        const user = JSON.parse(userData);
        const userId = user.id;
        console.log(userId)
        return{ userId: userId}
      } else{
        return null;
      }
    }
    const {requestWorkOrderData} = useGetRequestWorkOrderQuery(getUserIdFromLocalStorage());
  return (
    <Stack flex={1} pt={1} height={"100%"} >
      <Paper style={{ ...themeStyle.borders, width: "99%", marginBottom:'4px' }}>
        <Stack justifyContent={"space-between"} height={"95%"}>
          {/* {!changeView ? (
            <>
              <Stack>
                <Typography
                  p={3}
                  pb={2}
                  color={"#4C8AB1"}
                  fontFamily={"Poppins, san serif"}
                  fontSize={"22px"}
                  fontWeight={"600"}
                >
                  Work Order
                </Typography>
                <Tabs defaultValue={0} sx={{ backgroundColor: "transparent" }}>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <TabList
                      sx={{
                        [`& .${tabClasses.root}[aria-selected="true"]`]: {
                          boxShadow: "0",
                          bgcolor: "white",
                          "--Tab-indicatorColor": "#4C8AB1",
                          "--Tab-indicatorRadius": "28px",
                          "--Tab-indicatorThickness": "3.5px",
                          "--Tab-indicatorSize": "70%",
                          fontWeight: "500",
                        },
                        boxShadow: "none",
                      }}
                    >
                      <Tab
                        sx={{
                          fontFamily: "Poppins, sans serif",
                          fontSize: "15px",
                        }}
                      >
                        Pending
                      </Tab>
                      <Tab
                        sx={{
                          fontFamily: "Poppins, sans serif",
                          fontSize: "15px",
                        }}
                      >
                        Approved
                      </Tab>
                      <Tab
                        sx={{
                          fontFamily: "Poppins, sans serif",
                          fontSize: "15px",
                        }}
                      >
                        Declined
                      </Tab>
                    </TabList>
                    <Stack direction={"row"} style={{ paddingRight: "16px" }}>
                      <BuilderProButton
                        backgroundColor={"#4C8AB1"}
                        variant="contained"
                        Icon={EditOutlinedIcon}
                      >
                        Edit
                      </BuilderProButton>
                      <BuilderProButton
                        backgroundColor={"#4C8AB1"}
                        variant="contained"
                        Icon={DeleteOutlineOutlinedIcon}
                      >
                        Delete
                      </BuilderProButton>
                      <BuilderProButton
                        backgroundColor={"#FFAC00"}
                        variant="contained"
                      >
                        Add Phase
                      </BuilderProButton>
                    </Stack>
                  </Stack>
                  <TabPanel
                    sx={{ padding: 0 }}
                    value={0}
                    style={{ padding: "16px 8px 0 8px" }}
                  >
                    <WorkOrder setCheckedRow={setCheckedRow} checkedRow={checkedRow} data={data?.LineItems} />
                  </TabPanel>
                  <TabPanel
                    sx={{ padding: 0 }}
                    value={1}
                    style={{ padding: "16px 8px 0 8px" }}
                  >
                    <WorkOrder setCheckedRow={setCheckedRow} checkedRow={checkedRow} data={data?.LineItems} />
                  </TabPanel>
                  <TabPanel
                    sx={{ padding: 0 }}
                    value={2}
                    style={{ padding: "16px 8px 0 8px" }}
                  >
                    <WorkOrder setCheckedRow={setCheckedRow} checkedRow={checkedRow} data={data?.LineItems} />
                  </TabPanel>
                </Tabs>
              </Stack>
              <Stack alignItems={"flex-end"} justifyContent={"flex-end"} pr={2}>
                <BuilderProButton
                  backgroundColor={"#4C8AB1"}
                  variant={"contained"}
                  fontFamily={"Inter, sans serif"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  handleOnClick={handleButton}
                >
                  Request New
                </BuilderProButton>
              </Stack>
            </>
          ) : ( */}
            <>
             
              <Stack p={1} borderRadius={"14px"}>
                <AddPhaseView projectId={id} adminProjectView={true} view={'Work Order'} />
              </Stack>
              
            </>
          {/* )} */}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default WorkOrderView;

const themeStyle = {
  borders: {
    borderRadius: "14px",
    padding: "8px",
  },
};
