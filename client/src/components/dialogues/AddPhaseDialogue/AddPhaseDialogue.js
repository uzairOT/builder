import React from 'react'
import ColorPickerElement from '../ColorPickerElement/ColorPickerElement'
import { useTranslation } from 'react-i18next'
function AddPhaseDialogue({ handleAddOpen, handleAddClose,  setPhaseData, onSubmit,adminProjectView, InitialProposalView, formattedView }) {
    const { t } = useTranslation()
    return (
        <div>
            <ColorPickerElement InitialProposalView={InitialProposalView} adminProjectView={adminProjectView} PhaseHeading={t("PhaseModal.addPhase")} handleAddOpen={handleAddOpen} handleAddClose={handleAddClose}  setPhaseData={setPhaseData} onSubmit={onSubmit} formattedView={formattedView} />
        </div>
    )
}

export default AddPhaseDialogue
