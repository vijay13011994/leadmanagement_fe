import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getDashboardDataService } from '../../services/user.service';
export default function Dashboard() {
  const [data, setData] = React.useState([]);

  React.useEffect(()=>{
    getDashboardDataService().then((data)=>{
      console.log(data)
      setData(data.data);
    }).catch(e=>{
      alert(e);
    })
  }, []);

  return (
    <>
    <center><h1>Dashboard</h1></center>
      <Grid container spacing={2}>
        
        {data.map((value)=> (<Grid item xl={3}>   
        <br /><br />  
          <Card variant="solid" color="success" invertedColors>
            <CardContent orientation="horizontal">
              <CardContent>
                <center>
                  <Typography level="h3">{value.label}</Typography>
                  <Typography level="h3">{value.count}</Typography>
                </center>
              </CardContent>
            </CardContent>
          </Card>
        </Grid>))}
        {/* <Grid item xl={6}>   
        <br /><br />  
          <Card variant="solid" color="success" invertedColors>
            <CardContent orientation="horizontal">
              <CardContent>
                <center>
                  <Typography level="h3">Oppourtinities </Typography>
                    <Table>
                        <TableHead>
                          <TableCell style={{color: 'white'}} align='center'>In-Progress</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Negotiation</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Closed Won</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Closed Lost</TableCell>
                        </TableHead>
                        <TableBody>
                          <TableCell style={{color: 'white'}} align='center'>4</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                        </TableBody>
                    </Table>
                </center>
              </CardContent>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={12}>   
        <br /><br />  
          <Card variant="solid" color="success" invertedColors>
            <CardContent orientation="horizontal">
              <CardContent>
                <center>
                  <Typography level="h3">Current Month Sales</Typography>
                  <Typography level="h2">2,000</Typography>
                  <Table>
                        <TableHead>
                          <TableCell style={{color: 'white'}} align='center'>Jan</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Feb</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Mar</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Apr</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>May</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Jun</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Jul</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Aug</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Sep</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Oct</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Nov</TableCell>
                          <TableCell style={{color: 'white'}} align='center'>Dec</TableCell>
                        </TableHead>
                          <TableBody>
                            <TableRow>
                            <TableCell style={{color: 'white'}} align='center'>2000</TableCell>
                            <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                            <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                            <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                            <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                            <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                            <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                            <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                            <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                            <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                            <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                            <TableCell style={{color: 'white'}} align='center'>0</TableCell>
                          </TableRow>
                        </TableBody>
                    </Table>
                </center>
              </CardContent>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
      <br />
      {/* <Grid container spacing={2}>
          <Grid item xl={4}>
            <PieChartWithCenterLabel 
              data={[
                { value: 5, label: 'HOT' },
                { value: 10, label: 'COLD' },
                { value: 15, label: 'ASSIGNED' },
                { value: 20, label: 'OPEN' },
                { value: 20, label: 'CONVERTED' }
              ]}
              label={"Lead (100)"}
            />
          </Grid>
          <Grid item xl={4}>
            <PieChartWithCenterLabel
              data={[
                { value: 5, label: 'INPROGRESS' },
                { value: 10, label: 'NEGOTIATION' },
                { value: 15, label: 'CLOSE WON' },
                { value: 20, label: 'CLOSE LOST' },
              ]}
              label={`Oppourtinities(50)`}
            />
          </Grid>
          <Grid item xl={4}>
            <PieChartWithCenterLabel
              data={[
                { value: 5, label: 'OPEN' },
                { value: 10, label: 'INPROGRESS' },
                { value: 15, label: 'COMPLETED' },
              ]}
              label={"Tasks (15)"}
            />
          </Grid>
      </Grid> */}
    </>
  )
}
