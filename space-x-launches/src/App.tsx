import { AppBar, Avatar, Container, IconButton, Toolbar, Typography } from '@mui/material';
import './App.scss';
import MissionLaunchDetails from './components/MissionLaunchDetails';

function App() {
    return (
        <div className="App">
            <AppBar position="static">
                <Container className="App-header" maxWidth="xl">
                    <IconButton sx={{ p: 0 }}>
                        <Avatar
                            alt="SpaceX"
                            src="https://www.primarymarkets.com/wp-content/uploads/2024/04/Spacex-Circle-Logo.png"
                        />
                    </IconButton>
                    <Toolbar disableGutters>
                        <Typography
                            noWrap
                            sx={{
                                mr: 2,
                                display: { md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                paddingLeft: 1,
                            }}
                        >
                            SpaceX GraphQL Application
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <MissionLaunchDetails />
        </div>
    );
}

export default App;
