import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SwitchCard from "../components/SwitchCard";
import Devicestatus from "../components/Devicestatus";
import Sensorstatus from "../components/Sensorstatus";
import Timer from "../components/Timer";
import Mode from "../components/Mode";

function Dashboard() {
    return (
        <Box component="main" sx={{ flexGrow: 1 }}>
            <h2>
                Dashboard
            </h2>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Stack spacing={3}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Device Status
                                </Typography>
                               <Devicestatus/>
                            </CardContent>
                        </Card>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Pump Switch
                                </Typography>
                                <SwitchCard/>
                            </CardContent>
                        </Card>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Plant Mode
                                </Typography>
                                <Mode/>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                              Plant Status
                            </Typography>
                            <Sensorstatus/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Timer
                            </Typography>
                            <Timer/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
