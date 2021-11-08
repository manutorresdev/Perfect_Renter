import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

export default function BasicDateRangePicker({ setFecha, register }) {
  const [Value, setValue] = useState([null, null]);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        label='Advanced keyboard'
        value={Value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <input ref={startProps.inputRef} {...startProps.inputProps} />
            <Box sx={{ mx: 1 }}> to </Box>
            <input ref={endProps.inputRef} {...endProps.inputProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateRangePicker from '@mui/lab/DateRangePicker';

// export default function CustomDateRangeInputs() {
//   const [value, setValue] = React.useState([null, null]);

// return (
//   <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <DateRangePicker
//       startText='Entrada'
//       endText='Salida'
//       minDate={new Date()}
//       value={Value}
//       format='dd-MMM-yyyy'
//       toolbarTitle='Selecciona una fecha'
//       onChange={(newValue) => {
//         //   console.log(
//         //     '\x1b[45m%%%%%%%',
//         //     new Date(newValue).toLocaleDateString()
//         //   );
//         if (
//           new Date(newValue[0]).getTime() > new Date(newValue[1]).getTime()
//         ) {
//           console.error('Fecha de entrada mayor a fecha de salida');
//         } else if (
//           new Date(newValue[0]).getTime() === new Date(newValue[1]).getTime()
//         ) {
//           console.error('Selecciona fechas diferentes');
//         } else {
//           console.warn('FECHAS CORRECTAS');
//           setValue(newValue);
//           setFecha([
//             new Date(newValue[0]).toLocaleDateString(),
//             new Date(newValue[1]).toLocaleDateString(),
//           ]);
//         }

//         //   setValue();
//       }}
//       renderInput={(startProps, endProps) => (
//         <>
//           <TextField {...startProps} />
//           <Box className='px-2'> a </Box>
//           <TextField {...endProps} />
//         </>
//       )}
//     />
//   </LocalizationProvider>
// );

// if (
//   new Date(newValue[0]).getTime() > new Date(newValue[1]).getTime()
// ) {
//   console.error('Fecha de entrada mayor a fecha de salida');
// } else if (
//   new Date(newValue[0]).getTime() === new Date(newValue[1]).getTime()
// ) {
//   console.error('Selecciona fechas diferentes');
// } else {
//   console.warn('FECHAS CORRECTAS');
//   setValue(newValue);
//   setFecha([
//     new Date(newValue[0]).toLocaleDateString(),
//     new Date(newValue[1]).toLocaleDateString(),
//   ]);
// }
