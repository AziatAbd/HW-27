/* eslint-disable no-underscore-dangle */
import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material'
import { getAllOrders } from '../../store/orders/order.thunk'

export default function StickyHeadTable() {
    const dispatch = useDispatch()
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    React.useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    const allItems = useSelector((state) => state.order.allItems)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <StyledPaper>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <StyledTableCell>Meals</StyledTableCell>
                            <TableCell>Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allItems
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow key={row._id} hover>
                                        <TableCell>
                                            <h1>{row.user.name}</h1>
                                        </TableCell>

                                        <TableCell align="right" scope="row">
                                            <StyledUl>
                                                {row.items.map((item) => (
                                                    <StyledLi>
                                                        <h3>{item.title}</h3>

                                                        <h3>{item.price}</h3>
                                                        <h4>x{item.amount}</h4>
                                                    </StyledLi>
                                                ))}
                                            </StyledUl>
                                        </TableCell>

                                        <TableCell>
                                            <h1>${row.totalPrice}</h1>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={allItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </StyledPaper>
    )
}

const StyledPaper = styled(Paper)(() => ({
    width: 900,
    margin: '50px auto',
}))

const StyledTableCell = styled(TableCell)(() => ({
    borderRight: '1px solid',
    borderLeft: '1px solid',
}))

const StyledUl = styled('ul')(() => ({
    listStyle: 'none',
    display: 'grids',
    gap: '20px',
}))
const StyledLi = styled('li')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
}))
