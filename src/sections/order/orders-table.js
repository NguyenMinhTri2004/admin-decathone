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
import { ModalOrder } from "src/components/ModalOrder";
import { useCallback, useMemo, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export const OrdersTable = (props) => {
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

  const [dataModal, setDataModal] = useState(null);

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
                <TableCell>Mã hóa đơn</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày tạo</TableCell>
                {/* <TableCell>Số điện thoại</TableCell>
                <TableCell>Quyền</TableCell> */}
                {/* <TableCell>Số lượng</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer?.id);
                const createdAt = "";

                return (
                  <TableRow
                    onClick={() => handleClickOpen(customer)}
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
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
                        <Typography variant="subtitle2">{customer?.id}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer?.address}</TableCell>

                    <TableCell>{customer?.totalMoney}</TableCell>
                    <TableCell>{customer?.status}</TableCell>

                    <TableCell> {moment(customer?.dateCreate).format("DD/MM/YYYY")}</TableCell>

                    {/* <TableCell>
                      {customer?.phoneNumber}
                    </TableCell>

                    <TableCell>
                      {customer?.roles}
                    </TableCell> */}
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
      <ModalOrder open={open} setOpen={setOpen} dataModal={dataModal} handleReload = {handleReload} />
    </Card>
  );
};

OrdersTable.propTypes = {
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
  handleReload : PropTypes.func,
};
