import { useQuery } from '@apollo/client';
import {
    Card,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { lazy, Suspense, useState } from 'react';
import { GET_LAUNCH_DETAILS } from '../queries/queries';
import { Query } from '../schema/graphql';
import './MissionLaunchDetails.scss';

interface Column {
    id: 'launch_date' | 'site_name' | 'launch_year' | 'mission_name' | 'details';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number | Date) => string;
}

interface Data {
    launch_id: string;
    launch_date: Date;
    site_name: string;
    launch_year: string;
    mission_name: string;
    details: string;
}

const columns: readonly Column[] = [
    {
        id: 'launch_date',
        label: 'Launch Date',
        minWidth: 100,
        format(value) {
            return typeof value === 'number' ? value.toLocaleString('en-US') : formatDate(value);
        },
    },
    { id: 'site_name', label: 'Launch Site', minWidth: 100 },
    {
        id: 'launch_year',
        label: 'Launch Year',
        minWidth: 100,
        align: 'right',
    },
    { id: 'mission_name', label: 'Mission Name', minWidth: 170 },
    { id: 'details', label: 'Details', minWidth: 340 },
];

const formatDate = (date: Date): string => {
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

// Lazy load the component from the remote app
const RocketDetails = lazy(() => import('remoteApp/App'));

const MissionLaunchDetails = () => {
    const { loading, error, data } = useQuery<Query>(GET_LAUNCH_DETAILS);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createData = (
        launch_id: string,
        launch_date: Date,
        site_name: string,
        launch_year: string,
        mission_name: string,
        details: string,
    ): Data => {
        return { launch_id, launch_date, site_name, launch_year, mission_name, details };
    };

    const rows: Data[] = [];

    data?.launches?.forEach((value) => {
        rows.push(
            createData(
                value?.id || '',
                new Date(value?.launch_date_local),
                value?.launch_site?.site_name || '',
                value?.launch_year || '2002',
                value?.mission_name || '',
                value?.details || '',
            ),
        );
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="launch-details-container">
            <Card sx={{ marginX: '20px' }}>
                <h2>Mission Launch Details List</h2>
            </Card>
            <Paper sx={{ overflow: 'hidden', margin: '20px' }}>
                <TableContainer sx={{ maxHeight: 440, scrollbarWidth: 'thin' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.launch_id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            console.log('VALUE: ', value, typeof value);

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {typeof value === 'string'
                                                        ? value
                                                        : column.format && column.format(value)}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Suspense fallback={<div>Loading Remote Component...</div>}>
                <RocketDetails />
            </Suspense>
        </div>
    );
};

export default MissionLaunchDetails;
