import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { ModalCustomer } from "src/components/ModalCustomer";
import { useCallback, useMemo, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    handleReload 
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const [open, setOpen] = useState(false);

  const [dataModal , setDataModal] = useState(null);

  const handleClickOpen = (data) => {
    setOpen(true);
    setDataModal(data);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Mô tả</TableCell>
                {/* <TableCell>Số lượng</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer?.id);
                const createdAt = "";

                return (
                  <TableRow onClick={() => handleClickOpen(customer)} hover key={customer.id} selected={isSelected}>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer?.id);
                          } else {
                            onDeselectOne?.(customer?.id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={customer?.img[0]}>{getInitials(customer?.name)}</Avatar>
                        <Typography variant="subtitle2">{customer?.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer?.category?.name}</TableCell>

                    <TableCell>{customer?.money}</TableCell>

                    <TableCell>
                      {customer?.description?.length > 40
                        ? customer?.description.slice(0, 30) + "..."
                        : customer?.description}
                  
                    </TableCell>
                    {/* <TableCell>{customer?.quantity}</TableCell>
                    <TableCell>{createdAt}</TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
      /> */}
      <ModalCustomer open={open} setOpen={setOpen} dataModal = {dataModal} handleReload = {handleReload}  />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  handleReload : PropTypes.func
};
