import React from "react";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import PhaseCard from "../AddPhaseCard/AddPhaseCard"; // adjust the import as needed
import { useTranslation } from "react-i18next";
// A common style for the phase card container
const commonStackStyle = {
  cursor: "pointer",
  borderRadius: "8px",
  transition: "background-color 0.3s, box-shadow 0.3s",
  margin: "1rem",
};

function RenderPhases({
  isLoading,
  InitialProposalView,
  changeOrderSelectedView,
  initialPhases,
  changeOrderSelected,
  phases,
  selectedPhaseId,
  slectedCardStyle, // if you have additional styling
  themeStyle,
  adminProjectView,
  id,
  projectId,
  handleGridToggle,
  handleSelectCard,
  setRowCheckboxes,
  handleAddRow,
  authUserRole,
  hanldeEditChangeLineItem,
  handleAddChangeLineItem,
  handleDeleteChangeLineItem,
  view,
  changeOrderView,
  InitialProposalAndChange,
  pathCheck,
  rowCheckboxes,
}) {
  const { t } = useTranslation();
  // Helper function to show the loading spinner
  const renderLoading = () => (
    <Stack height="44vh" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  );

  // Renders the Initial Proposal view
  const renderInitialProposalView = () => (
    <Box
      sx={{
        height: "calc(78vh - 140px)",
        ...themeStyle.scrollable,
        width: { xl: "100%", lg: "100%", md: "100%", sm: "100%", xs: "100%" },
      }}
    >
      {initialPhases &&
      initialPhases[0] &&
      initialPhases[0].length !== 0 &&
      !isLoading ? (
        initialPhases[0].map((phase, index) => (
          <Stack
            key={phase.id}
            style={{
              ...slectedCardStyle,
              ...commonStackStyle,
              margin: "0rem",
              boxShadow:
                selectedPhaseId === phase.id
                  ? `0 0 0 2px #1B1B1B, 0 5px 20px ${phase.color}`
                  : "none",
            }}
          >
            <PhaseCard
              projectId={adminProjectView ? id : projectId}
              phaseData={phase}
              length={phase.length}
              onGridToggle={() => handleGridToggle(index, phase.previousIndex)}
              handleSelectCard={handleSelectCard}
              adminProjectView={adminProjectView}
              setRowCheckboxes={setRowCheckboxes}
              handleAddRow={handleAddRow}
              InitialProposalView={InitialProposalView}
              authUserRole={authUserRole}
              rowCheckboxes={rowCheckboxes}
            />
          </Stack>
        ))
      ) : (
        <div
          style={{
            height: "44vh",
            display: "grid",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography sx={{fontSize:{ lg: "1.5rem", xs: "1rem" }}}>
          {t("ProjectInitialProposal.noPhases")}
           </Typography>
        </div>
      )}
    </Box>
  );

  // Renders the Change Order Selected view
  const renderChangeOrderSelectedView = () => (
    <Box
      sx={{
        height: "calc(95vh - 100px)",
        ...themeStyle.scrollable,
        width: { xl: "100%", lg: "100%", md: "100%", sm: "100%", xs: "95vw" },
      }}
    >
      {changeOrderSelected &&
      changeOrderSelected.length !== 0 &&
      !isLoading ? (
        changeOrderSelected.map((phase, index) => (
          <Stack
            key={phase.id}
            sx={{
              ...slectedCardStyle,
              ...commonStackStyle,
              width: "95%", //check on mobile
              boxShadow:
                selectedPhaseId === phase.id
                  ? `0 0 0 2px #1B1B1B, 0 5px 20px ${phase.color}`
                  : "none",
            }}
          >
            <PhaseCard
              hanldeEditChangeLineItem={hanldeEditChangeLineItem}
              projectId={adminProjectView ? id : projectId}
              phaseData={phase}
              length={phase.length}
              onGridToggle={() => {}}
              handleSelectCard={() => {}}
              adminProjectView={adminProjectView}
              setRowCheckboxes={setRowCheckboxes}
              handleAddRow={handleAddRow}
              changeOrderSelectedView={changeOrderSelectedView}
              authUserRole={authUserRole}
              rowCheckboxes={rowCheckboxes}
              handleAddChangeLineItem={handleAddChangeLineItem}
              handleDeleteChangeLineItem={handleDeleteChangeLineItem}
            />
          </Stack>
        ))
      ) : (
        <div
          style={{
            height: "44vh",
            display: "grid",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography sx={{fontSize:{ lg: "1.5rem", xs: "1rem" }}}>
          {t("ProjectInitialProposal.noPhases")}
           </Typography>
        </div>
      )}
    </Box>
  );

  // Renders the default phases view
  const renderDefaultPhases = () => (
    <Box
      sx={{
        height: adminProjectView
          ? view === t("ProjectInvoices.title1")
            ? "calc(93vh - 140px)"
            : (changeOrderView || InitialProposalAndChange) &&
              !(changeOrderView && InitialProposalAndChange)
            ? "calc(93vh)"
            : "calc(98vh - 300px)"
          : "",
        ...themeStyle.scrollable,
        width: { xl: "100%", lg: "100%", md: "100%", sm: "100%", xs: "100%" },
      }}
    >
      {phases &&
      phases[0] &&
      phases[0].length !== 0 &&
      !isLoading ? (
        phases[0].map((phase, index) => (
          <Stack
            key={phase.id}
            sx={{
              ...slectedCardStyle,
              ...commonStackStyle,
              margin: {lg: "1rem", md: "1rem", sm: "1rem", xs: "0.2rem"},
              boxShadow:
                selectedPhaseId === phase.id
                  ? `0 0 0 2px #1B1B1B, 0 5px 20px ${phase.color}`
                  : "none",
            }}
          >
            <PhaseCard
              projectId={adminProjectView ? id : projectId}
              phaseData={phase}
              length={phase.length}
              onGridToggle={() => handleGridToggle(index, phase.previousIndex)}
              view={view}
              handleSelectCard={handleSelectCard}
              adminProjectView={adminProjectView}
              setRowCheckboxes={setRowCheckboxes}
              handleAddRow={handleAddRow}
              rowCheckboxes={rowCheckboxes}
              changeOrderView={changeOrderView}
            />
          </Stack>
        ))
      ) : (
        <div
          style={{
            height: "44vh",
            display: "grid",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography sx={{fontSize:{ lg: "1.5rem", xs: "1rem" }}}>
              {changeOrderView
                ? t("ProjectWorkOrder.title6")
                : pathCheck.includes("assignproject")
                ? t("ProjectInitialProposal.noPhases")
                : t("ProjectWorkOrder.title7")}
          </Typography>
        </div>
      )}
    </Box>
  );

  // Main render logic
  if (isLoading) {
    return renderLoading();
  } else if (InitialProposalView) {
    return renderInitialProposalView();
  } else if (changeOrderSelectedView) {
    return renderChangeOrderSelectedView();
  } else {
    return renderDefaultPhases();
  }
}

export default RenderPhases;
