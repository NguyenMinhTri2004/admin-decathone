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
import { ModalAccount } from "src/components/ModalAccount";
import { useCallback, useMemo, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AccountsTable = (props) => {
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

  // useEffect(() => {
   
  // }, [currentPage , openModalAccount]);
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
                <TableCell>Tên tài khoản</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Họ</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Quyền</TableCell>
                {/* <TableCell>Số lượng</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer?.id);
                const createdAt = "";

                return (
                  <TableRow onClick={() => handleClickOpen(customer)} hover key={customer?.id} selected={isSelected}>
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
                        {/* <Avatar src={customer?.img[0]}>{getInitials(customer?.name)}</Avatar> */}
                        <Typography variant="subtitle2">{customer?.user?.username ? customer?.user?.username : customer?.username}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer?.user?.email ? customer?.user?.email : customer?.email}</TableCell>

                    <TableCell>{customer?.user?.gender ? customer?.user?.gender : customer?.gender}</TableCell>

                    <TableCell>
                      {customer?.user?.firstName ? customer?.user?.firstName : customer?.firstName }
                    </TableCell>

                    <TableCell>
                      {customer?.user?.lastName ? customer?.user?.lastName : customer?.lastName}
                    </TableCell>

                    <TableCell>
                      {customer?.user?.phoneNumber ? customer?.user?.phoneNumber : customer?.phoneNumber}
                    </TableCell>

                    <TableCell>
                      {customer?.user?.roles ? customer?.user?.roles : customer?.roles}
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
      <ModalAccount open={open} setOpen={setOpen} dataModal = {dataModal} handleReload={handleReload}/>
    </Card>
  );
};

AccountsTable.propTypes = {
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
  open : PropTypes.bool,
  setOpen : PropTypes.func,
  handleReload : PropTypes.func,
};
