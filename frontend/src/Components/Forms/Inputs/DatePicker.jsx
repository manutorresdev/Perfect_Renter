import React, { useState } from 'react'
import DateRangePicker from '@mui/lab/DateRangePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Box from '@mui/material/Box'

export default function BasicDateRangePicker ({ setFecha, register }) {
  const [Value, setValue] = useState([null, null])
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        label='Advanced keyboard'
        value={Value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <>
            <input ref={startProps.inputRef} {...startProps.inputProps} />
            <Box sx={{ mx: 1 }}> to </Box>
            <input ref={endProps.inputRef} {...endProps.inputProps} />
          </>
        )}
      />
    </LocalizationProvider>
  )
}
