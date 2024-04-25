import { ButtonGroup, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import WorkOrder from "../ProjectsWorkOrder/WorkOrder";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddPhaseView from "../../AssignProject/AddPhaseView/AddPhaseView";
import RequestWorkOrderModal from "../../dialogues/RequestWorkOrder/RequestWorkOrderModal";
import {
  useGetProjectChangeOrderQuery,
  useGetProjectWorkOrderQuery,
} from "../../../redux/apis/Project/projectApiSlice";
import { useGetRequestWorkOrderQuery } from "../../../redux/apis/Project/workOrderApiSlice";
import { useParams } from "react-router-dom";

const ProjectsChangeOrder = ({ setChangeView, workOrder, view }) => {
  const [checkedRow, setCheckedRow] = useState(null);
  const params = useParams();
  const { id: currentProjectId } = params;
  const currentUser = localStorage.getItem("userInfo");
  const user = JSON.parse(currentUser);
  const { data } = useGetProjectChangeOrderQuery({
    projectId: currentProjectId,
    userId: user.user.id,
  });
  const handleChangeView = () => {
    setChangeView(true);
  }
  const rowCheckboxes = {
    phase: {
      id: 2,
      rows: [
        {
          id: 10,
          phase_id: 2,
          title: "Line1",
          description: "Lorem ipsum",
          unit: "sqft",
          // Add other properties as needed
        },
        {
          id: 11,
          phase_id: 2,
          title: "Line2",
          description: "Lorem ipsum",
          unit: "sqft",
          // Add other properties as needed
        },
        // Add more rows as needed
      ],
    },
  };

  return (
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
          {workOrder ? view : 'Change Order'}
        </Typography>
        <Tabs defaultValue={0} sx={{ backgroundColor: "transparent",overflowX:"auto" }}>
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
                Approved
              </Tab>
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
                Declined
              </Tab>
            </TabList>
            <Stack direction={"row"} style={{ paddingRight: "16px" }}>
              {workOrder ? (
                <BuilderProButton
                  backgroundColor={"#4C8AB1"}
                  variant={"contained"}
                  fontFamily={"Inter, sans serif"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  padding={{md:"6px 32px 6px 32px"}}
                  handleOnClick={handleChangeView}
                >
                  Request Work Order
                </BuilderProButton>
              ) : (
                <RequestWorkOrderModal
                  rowCheckboxes={rowCheckboxes}
                  checkedRow={checkedRow}
                  changeOrder={true}
                />
              )}
            </Stack>
          </Stack>
          <TabPanel
            sx={{ padding: 0 }}
            value={0}
            style={{ padding: "16px 8px 0 8px" }}
          >
            <WorkOrder
              status='approved'
              setCheckedRow={setCheckedRow}
              checkedRow={checkedRow}
              data={data?.data}
              workOrder={workOrder}
            />
          </TabPanel>
          <TabPanel
            sx={{ padding: 0 }}
            value={1}
            style={{ padding: "16px 8px 0 8px" }}
          >
            <WorkOrder
            status='pending'
              setCheckedRow={setCheckedRow}
              checkedRow={checkedRow}
              data={data?.data}
              workOrder={workOrder}
            />
          </TabPanel>
          <TabPanel
            sx={{ padding: 0 }}
            value={2}
            style={{ padding: "16px 8px 0 8px" }}
          >
            <WorkOrder
            status='declined'
              setCheckedRow={setCheckedRow}
              checkedRow={checkedRow}
              data={data?.data}
              workOrder={workOrder}
            />
          </TabPanel>
        </Tabs>
      </Stack>
      <Stack alignItems={"flex-end"} justifyContent={"flex-end"} pr={2}>
        {/* <BuilderProButton
                  backgroundColor={"#4C8AB1"}
                  variant={"contained"}
                  fontFamily={"Inter, sans serif"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  handleOnClick={handleButton}
                >
                  Request New
                </BuilderProButton> */}
      </Stack>
    </>
  );
};

export default ProjectsChangeOrder;
