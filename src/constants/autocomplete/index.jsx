import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({data, label, name}) {
  return (
    <Autocomplete
      size='small'
      name='leadid'
      disablePortal
      id="combo-box-demo"
      options={data}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}