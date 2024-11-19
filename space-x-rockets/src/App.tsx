import { useQuery } from '@apollo/client';
import { AttachMoney, FlagCircle, Height, Scale, Straighten } from '@mui/icons-material';
import { Avatar, Stack, Switch, SwitchProps, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { blueGrey, green, orange, red, yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import './App.scss';
import { GET_ROCKET_DETAILS } from './queries/queries';
import { Query } from './schema/graphql';

function App() {
    const { loading, error, data } = useQuery<Query>(GET_ROCKET_DETAILS, {
        variables: { rocketId: '5e9d0d95eda69955f709d1eb' }, // passing the id parameter
    });

    const StyledCard = styled(Card)({
        borderRadius: '1rem',
        boxShadow: 'none',
        position: 'relative',
        minWidth: 200,
        maxWidth: 390,
        height: 695,
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '80%',
            bottom: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
    });

    const StyledCardMedia = styled(CardMedia)({
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 0,
        backgroundPosition: 'top',
    });

    const Content = styled('div')(({ theme }) => ({
        padding: theme.spacing(3, 2),
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        color: 'white',
    }));

    const IOSSwitch = styled((props: SwitchProps) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: '#65C466',
                    opacity: 1,
                    border: 0,
                    ...theme.applyStyles('dark', {
                        backgroundColor: '#2ECA45',
                    }),
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color: theme.palette.grey[100],
                ...theme.applyStyles('dark', {
                    color: theme.palette.grey[600],
                }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.7,
                ...theme.applyStyles('dark', {
                    opacity: 0.3,
                }),
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: '#ff3030',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
            ...theme.applyStyles('dark', {
                backgroundColor: '#ff3030',
            }),
        },
    }));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="App">
            <StyledCard>
                <StyledCardMedia
                    image={
                        'https://thumbs.dreamstime.com/b/vertical-capture-rockets-ascent-detailed-view-engines-powerful-flames-328460207.jpg'
                    }
                />
                <Content>
                    <Typography gutterBottom variant="h5" component="div">
                        {data?.rocket?.name} (Owned By {data?.rocket?.company})
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                        {data?.rocket?.description}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: 'center', alignItems: 'center', marginY: '10px' }}
                    >
                        <Typography variant="h6">Cost Per Launch: {data?.rocket?.cost_per_launch}</Typography>
                        <Avatar sx={{ bgcolor: green[500] }}>
                            <AttachMoney />
                        </Avatar>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: 'center', alignItems: 'center', marginY: '10px' }}
                    >
                        <Avatar sx={{ bgcolor: blueGrey[500] }} variant="rounded">
                            <FlagCircle />
                        </Avatar>
                        <Typography variant="subtitle1">Country: {data?.rocket?.country}</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: 'center', alignItems: 'center', marginY: '10px' }}
                    >
                        <Avatar sx={{ bgcolor: yellow[500], color: 'black' }} variant="square">
                            <Straighten />
                        </Avatar>
                        <Typography variant="subtitle2">
                            Diameter: {data?.rocket?.diameter?.meters} Meters ({data?.rocket?.diameter?.feet} Feet)
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: 'center', alignItems: 'center', marginY: '10px' }}
                    >
                        <Avatar sx={{ bgcolor: orange[400], color: 'black' }} variant="square">
                            <Height />
                        </Avatar>
                        <Typography variant="subtitle2">
                            Height: {data?.rocket?.height?.meters} Meters ({data?.rocket?.height?.feet} Feet)
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: 'center', alignItems: 'center', marginY: '10px' }}
                    >
                        <Avatar sx={{ bgcolor: red[600] }} variant="square">
                            <Scale />
                        </Avatar>
                        <Typography variant="subtitle2">
                            Mass: {data?.rocket?.mass?.kg} KGs ({data?.rocket?.mass?.lb} LBs)
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: 'center', alignItems: 'center', marginY: '10px' }}
                    >
                        <Typography variant="subtitle2">Is Active?</Typography>
                        <IOSSwitch disabled defaultChecked={data?.rocket?.active ? true : false} />
                    </Stack>
                </Content>
            </StyledCard>
        </div>
    );
}

export default App;
