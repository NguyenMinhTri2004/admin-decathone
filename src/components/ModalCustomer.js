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
import { deleteProduct, updateProduct, addProduct } from "../api/product";
import { getSupplierByPage } from "../api/supplier";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const ModalCustomer = ({ open, setOpen, dataModal, handleReload }) => {
  const initData = {
    category: "",
    categoryId: dataModal?.id ? dataModal?.id : "",
    name: "",
    description: "",
    benefit: "",
    money: "",
    quantity: "",
    slug: "",
    file: "",
    supplier: "",
    supplierId: "",
  };

  const [data, setData] = useState(initData);

  const handleClose = () => {
    setOpen(false);
  };

  const [categories, setCategories] = useState([]);

  const [supplies, setSupplies] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        console.log("Categories", res?.data);
        setCategories(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getSupplierByPage(1)
      .then((res) => {
        console.log("Categories", res?.data?.supplier);
        setSupplies(res?.data?.supplier);
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
    deleteProduct(id)
      .then((res) => {
        handleReload();
        console.log("Delete", res?.data);
        alert("Xóa sản phẩm thành công!");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        err.response.data.message.map((item) => {
          alert(item);
        });
      });
  };

  const convertToSlug = (Text) => {
    return Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleAddProduct = () => {
    console.log("ssss", data.name.slice());
    var bodyFormData = new FormData();
    // data.categoryId = dataModal?.id
    bodyFormData.append(
      "categoryId",
      data?.categoryId ? data?.categoryId : dataModal?.category?.id
    );
    bodyFormData.append("name", data?.name);
    bodyFormData.append("money", data?.money);
    bodyFormData.append("description", data?.description);
    bodyFormData.append("file", data?.file);
    bodyFormData.append("benefit", "tot cho suc khoe");
    bodyFormData.append("quantity", 20000);
    bodyFormData.append("slug", convertToSlug(data?.name));
    bodyFormData.append("color[]", "['red', 'blue', 'yellow']");
    bodyFormData.append("supplierId", data?.supplierId);
    console.log(bodyFormData);

    addProduct(bodyFormData)
      .then((res) => {
        handleReload();
        console.log("UpdateProduct", res?.data);
        alert("Thêm sản phẩm thành công!");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        err.response.data.message.map((item) => {
          alert(item);
        });
      });
  };

  const handleUpdateProduct = () => {
    console.log("ssss", data);
    var bodyFormData = new FormData();
    // data.categoryId = dataModal?.id
    bodyFormData.append(
      "categoryId",
      data?.categoryId ? data?.categoryId : dataModal?.category?.id
    );
    bodyFormData.append("name", data?.name);
    bodyFormData.append("money", data?.money);
    bodyFormData.append("description", data?.description);
    bodyFormData.append("file", data?.file);
    bodyFormData.append("benefit", data?.benefit);
    bodyFormData.append("quantity", 20000);
    bodyFormData.append("slug", convertToSlug(data?.name));
    bodyFormData.append("color[]", "['red', 'blue', 'yellow']");
    bodyFormData.append("supplierId", data?.supplierId ? data.supplierId : dataModal?.supplier?.id);
    console.log(bodyFormData);

    updateProduct(dataModal?.id, bodyFormData)
      .then((res) => {
        handleReload();
        console.log("UpdateProduct", res?.data);
        alert("Update sản phẩm thành công!");
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
          {dataModal ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
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
                value={data?.name}
                id="filled-basic"
                label="Tên sản phẩm"
                style={{ width: "100%" }}
                name="name"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>

                <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                <Select labelId="demo-simple-select-filled-label"  id="filled-basic">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}

              <FormControl variant="filled" style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-filled-label">Loại</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={data?.category?.id}
                  name="categoryId"
                  onChange={(e) => handleInput(e)}
                  displayEmpty
                  // inputProps={{ "aria-label": "Without label" }}
                  // renderValue={() => {
                  //   return data?.category?.name;
                  // }}
                >
                  {/* <MenuItem disabled value="">
                    <em>{data?.category?.name}</em>
                  </MenuItem> */}
                  {categories.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item?.id}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div style={{ marginBottom: "15px" }}>
              {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>

                <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                <Select labelId="demo-simple-select-filled-label"  id="filled-basic">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}

              <FormControl variant="filled" style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-filled-label">Nhà cung cấp</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={data?.supplier?.id}
                  name="supplierId"
                  onChange={(e) => handleInput(e)}
                  displayEmpty
                  // displayEmpty
                  // inputProps={{ "aria-label": "Without label" }}
                  // renderValue={() => {
                  //   return data?.category?.name;
                  // }}
                >
                  {/* <MenuItem disabled value="">
                    <em>{data?.category?.name}</em>
                  </MenuItem> */}
                  {supplies.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item?.id}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <TextField
                id="filled-basic"
                label="Giá"
                style={{ width: "100%" }}
                type="number"
                value={data?.money}
                name="money"
                onChange={(e) => handleInput(e)}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <TextField
                id="outlined-multiline-static"
                label="Chi tiết sản phẩm"
                multiline
                rows={4}
                defaultValue="Vui lòng nhập thông tin sản phẩm !"
                style={{ width: "100%" }}
                value={data?.description}
                name="description"
                onChange={(e) => handleInput(e)}
              />
            </div>

            <div style={{ width: "200px", height: "100px", marginBottom: "10px" }}>
              {data?.img?.length > 0 && (
                <img style={{ width: "100%", height: "100%" }} src={data?.img[0]} />
              )}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <TextField
                onChange={(e) => handleInputFile(e)}
                id="outlined-multiline-static"
                style={{ width: "100%" }}
                type="file"
                name="file"
              />
            </div>

            {/* <div style={{ marginBottom: "10px" }}>
              <TextField id="filled-basic" label="Số lượng" style={{ width: "100%" }} type="number" />
            </div> */}
          </div>
        </DialogContent>
        <DialogActions>
          {!dataModal && <Button onClick={() => handleAddProduct()}>Thêm</Button>}
          {dataModal && <Button onClick={() => handleUpdateProduct()}>Sửa</Button>}

          {dataModal && <Button onClick={() => handleDeleteProduct(dataModal?.id)}>Xóa</Button>}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
