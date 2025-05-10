import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Typography, Container, Stack, TextField, InputLabel, MenuItem, FormControl, Select, inputClasses} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {LineChart} from "@mui/x-charts/LineChart";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function App() {
  const [count, setCount] = useState(0)
  const [month, setMonth] = useState(1);
  const [income, setIncome] = useState(0) 
  const [incomedata, setincomedata] = useState([])
  

  
//Create 3 lists, first one called IncomeData then create a function to set keyvalue pairs so it will be formatted in the list as {"month":"income"}

  const handleGraphDataClick = () => {
    const newData = {
      month: month, 
      income: Number(income)
    };
    setincomedata(prev => [...prev,newData]); //Adds newData by using ... to create a copy of the data and uses the , to transition the newData into that and then calls setincomedata in order to change the data because we are using state above and state is static meaning you need to take a different course of action to change the value without breaking the code
    
  };



  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleIncomeChange = (event) => {
    setIncome(event.target.value);
  };


   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
   const sortedData = [...incomedata].sort((a, b) => a.month - b.month);

   const xAxis = sortedData.map(d => monthNames[d.month-1]);
   const series = sortedData.map(d => d.income);


  const allkeySet = new Set();
  incomedata.forEach(Obj =>{
    Object.keys(Obj).forEach(key=>{allkeySet.add(key)})
  })
  //const xAxis = Array.from(allkeySet)

  const allkeySetY = new Set();
  incomedata.forEach(Obj =>{
    Object.values(Obj).forEach(value=>{allkeySetY.add(value)})
  })
  //const series = Array.from(allkeySetY)

  console.log(month)

  return (
    <>
      <Container maxWidth="sm">
        <Stack 
          display="flex"
          justifyContent="center"
          alignItems="center"
          spacing={3}>
          <Typography variant='h2'> Budget Tracker</Typography>
          <FormControl><InputLabel id="Month-select">Month</InputLabel>
            <Select
            labelId="Month-select"
            id="Month-select"
            value={month}
            label="Month"
            onChange={handleMonthChange}
            >
              <MenuItem value={1}>Jan</MenuItem>
              <MenuItem value={2}>Feb</MenuItem>
              <MenuItem value={3}>Mar</MenuItem>
              <MenuItem value={4}>Apr</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>Jun</MenuItem>
              <MenuItem value={7}>Jul</MenuItem>
              <MenuItem value={8}>Aug</MenuItem>
              <MenuItem value={9}>Sep</MenuItem>
              <MenuItem value={10}>Oct</MenuItem>
              <MenuItem value={11}>Nov</MenuItem>
              <MenuItem value={12}>Dec</MenuItem>
            </Select></FormControl>
          <TextField label="Income" variant='outlined' value={income} onChange={(event)=>{setIncome(event.target.value)}} defaultValue={0}></TextField>
          <Button variant="contained" key={"one"} onClick={handleGraphDataClick}>Graph Data</Button>
        </Stack>
        <Stack
        direction={"row"}>
            <Stack
              justifyContent={'center'}
              spacing={3}> 
            <Button variant='contained' key={"one"} onClick={()=>{setincomedata([])} }>Income</Button>
            </Stack>
          <LineChart
            xAxis={[{ scaleType:'band', data: xAxis }]}
            series={[
              {
                data: series,
              },
            ]}
            width={500}
            height={300}
            />  
        </Stack>
      </Container>
      
    </>
  )
}

export default App
