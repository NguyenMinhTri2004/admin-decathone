import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { getCategories } from "../api/category";
import { CreateAccountAdmin, deleteAccount } from "../api/auth";
import { deleteProduct, updateProduct, addProduct } from "../api/product";
import { updateOrder } from "src/api/order";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const ModalOrder = ({ open, setOpen, dataModal, handleReload }) => {
  const initData = {
    status: "",
  };

  const [data, setData] = useState(initData);

  const handleClose = () => {
    setOpen(false);
  };
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        console.log("Categories", res?.data);
        setCategories(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (dataModal) {
      setData(dataModal);
      console.log(dataModal);
    }
  }, [dataModal]);

  const handleDeleteProduct = (id) => {
    deleteAccount(id)
      .then((res) => {
        // console.log("Delete", res?.data);
        alert("Xóa sản phẩm thành công!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddProduct = () => {
    console.log("ssss", data);
    // var bodyFormData = new FormData();
    // // data.categoryId = dataModal?.id
    // bodyFormData.append("categoryId", data?.categoryId);
    // bodyFormData.append("name", data?.name);
    // bodyFormData.append("money", data?.money);
    // bodyFormData.append("description", data?.description);
    // bodyFormData.append("file", data?.file);
    // bodyFormData.append("benefit", "tot cho suc khoe");
    // bodyFormData.append("quantity", 20000);
    // bodyFormData.append("slug", "testtttttt");
    // bodyFormData.append("color[]", "['red', 'blue', 'yellow']");

    // console.log(bodyFormData);

    CreateAccountAdmin(data)
      .then((res) => {
        console.log("Create", res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateProduct = () => {
    // console.log("ssss", data);
    // var bodyFormData = new FormData();
    // data.categoryId = dataModal?.id
    // bodyFormData.append("categoryId", data?.categoryId);
    // bodyFormData.append("name", data?.name);
    // bodyFormData.append("money", data?.money);
    // bodyFormData.append("description", data?.description);
    // bodyFormData.append("file", data?.file);
    // bodyFormData.append("benefit", data?.benefit);
    // bodyFormData.append("quantity", 20000);
    // bodyFormData.append("slug", "testtttttt");
    // bodyFormData.append("color[]", "['red', 'blue', 'yellow']");

    // console.log(bodyFormData);

    updateOrder(data.status, dataModal?.id)
      .then((res) => {
        console.log("UpdateProduct", res?.data);
        handleReload();
        alert("Update hóa đơn thành công!");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        err.response.data.message.map((item) => {
          alert(item);
        });
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleInputFile = (e) => {
    const { name, files } = e.target;
    setData({ ...data, [name]: files[0] });
  };

  return (
    <React.Fragment style={{ width: "400px" }}>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <ToastContainer />
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Chi tiết đơn hàng
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent style={{ width: "400px" }} dividers>
          {/* <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography> */}
          <div>
            <div style={{ marginBottom: "15px" }}>
              <TextField
                value={dataModal?.id}
                id="filled-basic"
                label="Mã hóa đơn"
                style={{ width: "100%" }}
                name="username"
                onChange={(e) => handleInput(e)}
                disabled
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <TextField
                value={dataModal?.address}
                id="filled-basic"
                label="Địa chỉ"
                style={{ width: "100%" }}
                name="password"
                onChange={(e) => handleInput(e)}
                disabled
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <TextField
                value={dataModal?.totalMoney}
                id="filled-basic"
                label="Tổng tiền"
                style={{ width: "100%" }}
                name="email"
                onChange={(e) => handleInput(e)}
                disabled
              />
            </div>

            <FormControl variant="filled" style={{ width: "100%", marginBottom: "15px" }}>
              {/* <InputLabel id="demo-simple-select-filled-label">{dataModal?.category?.name ? dataModal?.category?.name : "Loại"}</InputLabel> */}
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={data?.status}
                name="status"
                onChange={(e) => handleInput(e)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                // renderValue={() => {
                //   return data?.category?.name;
                // }}
              >
                <MenuItem value="Wating for Accept">WAITING_FOR_ACCEPT</MenuItem>
                <MenuItem value="Accepted">ACCEPTED</MenuItem>
                <MenuItem value="Delivering">DELIVERING</MenuItem>
                <MenuItem value="Delivered">DELIVERED</MenuItem>
                <MenuItem value="Canceled">CANCELED</MenuItem>
                {/* {categories.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item?.id}>
                        {item?.name}
                      </MenuItem>
                    );
                  })} */}
              </Select>
            </FormControl>

            {/* <div style={{ width: "200px", height: "100px" , marginBottom : "10px" }}>
              {data?.img?.length > 0 && <img style = {{width: "100%", height: "100%"}} src={data?.img[0]} />}
            </div> */}
            {/* <div style={{ marginBottom: "10px" }}>
              <TextField
                onChange={(e) => handleInputFile(e)}
                id="outlined-multiline-static"
                style={{ width: "100%" }}
                type="file"
                name="file"
              />
            </div> */}

            {/* <div style={{ marginBottom: "10px" }}>
              <TextField id="filled-basic" label="Số lượng" style={{ width: "100%" }} type="number" />
            </div> */}

            <div style={{ marginBottom: "10px" }}>
              <TextField
                id="filled-basic"
                label="Ngày tạo"
                style={{ width: "100%" }}
                value={moment(dataModal?.dateCreate).format("DD/MM/YYYY")}
                name="phoneNumber"
                onChange={(e) => handleInput(e)}
                disabled
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          {!dataModal && <Button onClick={() => handleAddProduct()}>Thêm</Button>}
          {dataModal && <Button onClick={() => handleUpdateProduct()}>Sửa</Button>}

          {/* {dataModal && <Button onClick={() => handleDeleteProduct(dataModal?.id)}>Xóa</Button>} */}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
