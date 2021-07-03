import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";

export function StaticDatePicker(){
  
  const [date, changeDate] = useState(new Date());

  return (
      <DatePicker
        autoOk
        variant="static"
        openTo="year"
        value={date}
        onChange={changeDate}
        
      />
  );
}
