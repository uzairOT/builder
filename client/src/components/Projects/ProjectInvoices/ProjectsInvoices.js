import {
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import {
  useGetProjectInvoicesQuery,
} from "../../../redux/apis/Project/projectApiSlice";
import { useParams } from "react-router-dom";
import InvoicesTable from "./InvoicesTable";
import CloseIcon from "@mui/icons-material/Close";

const ProjectsInvoices = ({ userRole, isModal, handleClose }) => {
  const params = useParams();
  const { id: currentProjectId } = params;
  const currentUser = localStorage.getItem("userInfo");
  const user = JSON.parse(currentUser);
  const { data, refetch } = useGetProjectInvoicesQuery({
    projectId: currentProjectId,
    userId: user.user.id,
  });
  // console.log(data);
  const [checkedRow, setCheckedRow] = useState(null);
  // const [getWorkOrder, {isLoading}] = useGetWorkOrderDetailsMutation()
  const [phaseItems, setPhaseItems] = useState();
  
  //   const handleChangeView = () => {
  //     setChangeView(true);
  //   }
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
      <Stack width="80x%">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            p={3}
            pb={2}
            color={"#4C8AB1"}
            fontFamily={"var(--main-font-family)"}
            fontSize={"22px"}
            fontWeight={"600"}
          >
            Invoices
          </Typography>
          {isModal && (
            <Stack alignItems={"flex-end"}>
              <IconButton onClick={handleClose}>
                <CloseIcon></CloseIcon>
              </IconButton>
            </Stack>
          )}
        </Stack>
        <Tabs
          defaultValue={0}
          sx={{ backgroundColor: "transparent", overflowX: "auto" }}
        >
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
                  fontFamily: "var(--main-font-family)",
                  fontSize: "15px",
                }}
              >
                Paid
              </Tab>
              <Tab
                sx={{
                  fontFamily: "var(--main-font-family)",
                  fontSize: "15px",
                }}
              >
                Unpaid
              </Tab>

              <Tab
                sx={{
                  fontFamily: "var(--main-font-family)",
                  fontSize: "15px",
                }}
              >
                Overdue
              </Tab>
            </TabList>
            <Stack direction={"row"} style={{ paddingRight: "16px" }}>
              {/* {workOrder ? (
                <>
                <BuilderProButton
                  backgroundColor={"#4C8AB1"}
                  variant={"contained"}
                  fontFamily={'var(--main-font-family)'}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  padding={{md:"6px 32px 6px 32px"}}
                  handleOnClick={handleChangeView}
                  
                  >
                  Request New Work Order
                </BuilderProButton>
                  </>
              ) : (
                <RequestWorkOrderModal
                  rowCheckboxes={rowCheckboxes}
                  checkedRow={checkedRow}
                  setCheckedRow={setCheckedRow}
                  changeOrder={true}
                  refetch={refetch}
                  setPhaseItems={setPhaseItems}
                  phaseItems={phaseItems}
                />
              )} */}
            </Stack>
          </Stack>
          <TabPanel
            sx={{ padding: 0 }}
            value={0}
            style={{ padding: "16px 8px 0 8px" }}
          >
            <InvoicesTable
              paidInvoices={true}
              setCheckedRow={setCheckedRow}
              checkedRow={checkedRow}
              data={data?.paidInvoices}
              //   workOrder={workOrder}
              setPhaseItems={setPhaseItems}
            />
          </TabPanel>
          <TabPanel
            sx={{ padding: 0 }}
            value={1}
            style={{ padding: "16px 8px 0 8px" }}
          >
            <InvoicesTable
              setCheckedRow={setCheckedRow}
              checkedRow={checkedRow}
              data={data?.unpaidInvoices}
              //   workOrder={workOrder}
              refetch={refetch}
              setPhaseItems={setPhaseItems}
            />
          </TabPanel>
          <TabPanel
            sx={{ padding: 0 }}
            value={2}
            style={{ padding: "16px 8px 0 8px" }}
          >
            <InvoicesTable
              status="declined"
              setCheckedRow={setCheckedRow}
              checkedRow={checkedRow}
              data={data?.overdueInvoices}
              refetch={refetch}
              setPhaseItems={setPhaseItems}
            />
          </TabPanel>
        </Tabs>
      </Stack>
      <Stack alignItems={"flex-end"} justifyContent={"flex-end"} pr={2}>
        {/* <BuilderProButton
                  backgroundColor={"#4C8AB1"}
                  variant={"contained"}
                  fontFamily={'var(--main-font-family)'}
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

export default ProjectsInvoices;

const themeStyle = {
  borders: {
    borderRadius: "14px",
    padding: "8px",
  },
  border: {
    borderRadius: "14px",
  },
};
