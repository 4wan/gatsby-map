import React, { useState } from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Button from '@material-ui/core/Button'

function ToggleViewButton({
  view,
  setView,
  setRegion,
  setCountry,
  setInitiative
}) {
  const handleView = (event, newView) => {
    if (newView !== null) {
      setRegion(null)
      setCountry(null)
      setInitiative(null)
      setView(newView)
    }
  }

  return (
    <>
      <ToggleButtonGroup value={view} exclusive onChange={handleView}>
        <ToggleButton className="toggleViewButtonSweden" value="sweden">
          Sverige
        </ToggleButton>
        <ToggleButton className="toggleViewButtonWorld" value="world">
          Världen
        </ToggleButton>
        <ToggleButton className="toggleViewButtonWorld" value="initiatives">
          Initiativ
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}

export default ToggleViewButton
