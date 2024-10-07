import { Box, Paper, Stack} from "@mui/material";
import React, { useEffect } from "react";
import AddPhaseView from "../../AssignProject/AddPhaseView/AddPhaseView";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserRoleFromRedux } from "../../../redux/slices/auth/userRoleSlice";

const InitialProposalView = () => {
  // const loader = useLoaderData();
  const authUserRole = useSelector(getUserRoleFromRedux);
  const { id } = useParams();
  const projectId = id;

  useEffect(()=>{
    console.log(projectId)
  },[projectId])

  return (
    <>
      <Paper
        style={{
          width: "100%",
          marginBottom: "4px",
          marginTop: "8px",
          ...themeStyle.borders,
          ...themeStyle.scrollable,
        }}
      >
        {/* <Box padding={0}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            sx={{
              fontFamily: "var(--main-font-family)",
              color: "black",
              borderBottom: "0.2px solid #FFB300",
              "& .MuiTabs-indicator": {
                backgroundColor: "#FFB300",
              },
            }}
          >
            <Tab
              label="Initial Proposal"
              sx={{
                textTransform: "capitalize",
                fontFamily: "var(--main-font-family)",
                backgroundColor: selectedTab === 0 ? "#FFAC00" : "#F2F2F2",
                color: selectedTab === 0 ? "white !important" : "black !important",
                border:
                  selectedTab === 0 ? "1px solid #FFAC00" : "1px solid #FFAC00",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                padding: 0.5,
                fontWeight: "600",
              }}
            />
            <Tab
              label="Change Order"
              sx={{
                textTransform: "capitalize",
                fontFamily: "var(--main-font-family)",
                ml: 0.5,
                backgroundColor: selectedTab === 1 ? "#FFAC00" : "#F2F2F2",
                color: selectedTab === 1 ? "white !important" : "black !importants",
                border:
                  selectedTab === 1 ? "1px solid #FFAC00" : "1px solid #FFAC00",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                padding: 0.5,
                fontWeight: "600",
              }}
            />
          </Tabs>
        </Box> */}

        <Box sx={{ p: 1 }}>
          {/* {selectedTab === 0 && ( */}
          <Stack
            p={1}
            borderRadius={"14px"}
            width={"99%"}
            borderBottom={"1px solid silver"}
          >
            <AddPhaseView
              projectId={projectId}
              InitialProposalView={true}
              adminProjectView={true}
              view={"Initial Proposal"}
              authUserRole={authUserRole.userRole}
            />
          </Stack>
          {/* )} */}
          {/* <Divider /> */}
          {/* {selectedTab === 1 && ( */}
          <>
            <Stack
              p={1}
              borderRadius={"14px"}
              width={"99%"}
              borderBottom={"1px solid silver"}
            >
              <AddPhaseView
                // refetchChangeOrder={refetch}
                InitialProposalAndChange={true}
                projectId={projectId}
                adminProjectView={true}
                view={"Change Order"}
                authUserRole={authUserRole.userRole}
                changeOrderView={true}
              />
            </Stack>
          </>
          {/* )} */}
        </Box>
      </Paper>
    </>
  );
};

const themeStyle = {
  borders: {
    borderRadius: "14px",
  },
  scrollable: {
    scrollbarWidth: "none", // For Firefox
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
  },
};
export const projectUserRoleAuth = async ({ params, request }) => {
  // const user = localStorage.getItem('userInfo')
  // const currentUser = JSON.parse(user);
  //   const userId = currentUser.user.id;
  //   const projectId = params.id;
  //   try {
  //     const response = await fetch('https://builderbuilder.net/project/getUserProjectRole', {
  //       method: 'POST',
  //       body: JSON.stringify({ projectId, userId }), // Stringify the body data
  //       headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${getTokenFromLocalStorage()}` }, // Set content type header
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error fetching user role: ${response.statusText}`); // Throw error for non-2xx responses
  //     }

  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error fetching user role:', error); // Log the error for debugging
  //     // Handle the error in a more appropriate way (e.g., display an error message to the user)
  //   }
  return null;
};

export default InitialProposalView;
