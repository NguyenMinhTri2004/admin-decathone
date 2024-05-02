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
import { createSupplier, updateSupplier, deleteSupplier } from "../api/supplier";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const ModalSupplier = ({ open, setOpen, dataModal, handleReload }) => {
  const initData = {
    name: "",
    addres: "",
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Tên nhà cung cấp không được để trống"),
      address: Yup.string().max(255).required("Địa chỉ nhà cung cấp không được để trống"),
    }),
    // onSubmit: async (values, helpers) => {
    //   try {
    //     await auth.signIn(values.username, values.password);
    //     router.push('/');
    //   } catch (err) {
    //     helpers.setStatus({ success: false });
    //     helpers.setErrors({ submit: err.message });
    //     helpers.setSubmitting(false);
    //   }
    // }
  });

  const [data, setData] = useState(initData);

  const handleClose = () => {
    setOpen(false);
  };
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // getCategories()
    //   .then((res) => {
    //     console.log("Categories", res?.data);
    //     setCategories(res?.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    if (dataModal) {
      setData(dataModal);
      console.log(dataModal);
    }
  }, [dataModal]);

  const handleDeleteProduct = (id) => {
    deleteSupplier(id)
      .then((res) => {
        // console.log("Delete", res?.data);
        handleReload();
        alert("Xóa nhà cung cấp thành công!");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        err.response.data.message.map((item) => {
          alert(item);
        });
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

    createSupplier(data)
      .then((res) => {
        console.log("Create", res?.data);
        handleReload();
        alert("Thêm nhà cung cấp thành công!");
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
    // console.log("ssss", data);
    // var bodyFormData = new FormData();
    // // data.categoryId = dataModal?.id
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

    updateSupplier(dataModal?.id, data)
      .then((res) => {
        console.log("UpdateProduct", res?.data);
        handleReload();
        alert("Update nhà cung cấp thành công!");
        handleClose();
      })
      .catch((err) => {
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
          {dataModal ? "Chỉnh sửa nhà cung cấp" : "Thêm nhà cung cấp"}
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
                label="Tên nhà cung cấp"
                style={{ width: "100%" }}
                name="name"
                onChange={(e) => handleInput(e)}
                onBlur={formik.handleBlur}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <TextField
                value={data?.address}
                id="filled-basic"
                label="Địa chỉ nhà cung cấp"
                style={{ width: "100%" }}
                name="address"
                onChange={(e) => handleInput(e)}
              />
            </div>
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
