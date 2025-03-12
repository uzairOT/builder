import React from 'react'
import ColorPickerElement from '../ColorPickerElement/ColorPickerElement'
import { useTranslation } from 'react-i18next'

function UpdatePhaseDialogue({ handleUpdateOpen, handleUpdateClose, phaseData, setPhaseData, onSubmit, InitialProposalView }) {
    const { t } = useTranslation()
    return (
        <div>
            <ColorPickerElement InitialProposalView={InitialProposalView} PhaseHeading={t("PhaseModal.updatePhase")} handleUpdateOpen={handleUpdateOpen} handleUpdateClose={handleUpdateClose} phaseData={phaseData} setPhaseData={setPhaseData} onSubmit={onSubmit} />
        </div>
    )
}

export default UpdatePhaseDialogue
