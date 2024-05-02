import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { AccountsTable } from "src/sections/account/accounts-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { ModalAccount } from "src/components/ModalAccount";
import { applyPagination } from "src/utils/apply-pagination";
import { getProducts, getProductByPage } from "../api/product";
import { getOrderByPage } from "../api/order";
import { getUserByPage } from "../api/auth";
import { getCategories } from "../api/category";
import { getAllRole } from "../api/auth";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { OrdersTable } from "src/sections/order/orders-table";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportExcel from "src/utils/exportExcel";
const now = new Date();

const data = [
  {
    id: "5e887ac47eed253091be10cb",
    address: {
      city: "Cleveland",
      country: "USA",
      state: "Ohio",
      street: "2849 Fulton Street",
    },
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "carson.darrin@devias.io",
    name: "Carson Darrin",
    phone: "304-428-3097",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    address: {
      city: "Atlanta",
      country: "USA",
      state: "Georgia",
      street: "1865  Pleasant Hill Road",
    },
    avatar: "/assets/avatars/avatar-fran-perez.png",
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: "fran.perez@devias.io",
    name: "Fran Perez",
    phone: "712-351-5711",
  },
  {
    id: "5e887b7602bdbc4dbb234b27",
    address: {
      city: "North Canton",
      country: "USA",
      state: "Ohio",
      street: "4894  Lakeland Park Drive",
    },
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: "jie.yan.song@devias.io",
    name: "Jie Yan Song",
    phone: "770-635-2682",
  },
  {
    id: "5e86809283e28b96d2d38537",
    address: {
      city: "Madrid",
      country: "Spain",
      name: "Anika Visser",
      street: "4158  Hedge Street",
    },
    avatar: "/assets/avatars/avatar-anika-visser.png",
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: "anika.visser@devias.io",
    name: "Anika Visser",
    phone: "908-691-3242",
  },
  {
    id: "5e86805e2bafd54f66cc95c3",
    address: {
      city: "San Diego",
      country: "USA",
      state: "California",
      street: "75247",
    },
    avatar: "/assets/avatars/avatar-miron-vitold.png",
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: "miron.vitold@devias.io",
    name: "Miron Vitold",
    phone: "972-333-4106",
  },
  {
    id: "5e887a1fbefd7938eea9c981",
    address: {
      city: "Berkeley",
      country: "USA",
      state: "California",
      street: "317 Angus Road",
    },
    avatar: "/assets/avatars/avatar-penjani-inyene.png",
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: "penjani.inyene@devias.io",
    name: "Penjani Inyene",
    phone: "858-602-3409",
  },
  {
    id: "5e887d0b3d090c1b8f162003",
    address: {
      city: "Carson City",
      country: "USA",
      state: "Nevada",
      street: "2188  Armbrester Drive",
    },
    avatar: "/assets/avatars/avatar-omar-darboe.png",
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: "omar.darobe@devias.io",
    name: "Omar Darobe",
    phone: "415-907-2647",
  },
  {
    id: "5e88792be2d4cfb4bf0971d9",
    address: {
      city: "Los Angeles",
      country: "USA",
      state: "California",
      street: "1798  Hickory Ridge Drive",
    },
    avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: "siegbert.gottfried@devias.io",
    name: "Siegbert Gottfried",
    phone: "702-661-1654",
  },
  {
    id: "5e8877da9a65442b11551975",
    address: {
      city: "Murray",
      country: "USA",
      state: "Utah",
      street: "3934  Wildrose Lane",
    },
    avatar: "/assets/avatars/avatar-iulia-albu.png",
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: "iulia.albu@devias.io",
    name: "Iulia Albu",
    phone: "313-812-8947",
  },
  {
    id: "5e8680e60cba5019c5ca6fda",
    address: {
      city: "Salt Lake City",
      country: "USA",
      state: "Utah",
      street: "368 Lamberts Branch Road",
    },
    avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: "nasimiyu.danai@devias.io",
    name: "Nasimiyu Danai",
    phone: "801-301-7894",
  },
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const [products, setProducts] = useState([]);
  const customersSelection = useSelection(customersIds);
  const [startDate, setStartDate] = useState(new Date());

  const handlePageChange = useCallback((event, value) => {
    console.log(value);
    setPage(value);
  }, []);

  const handleExportFile = async () => {
    await getOrderByPage(currentPage)
      .then((res) => {
        // console.log(res);
        // setProducts(res?.data?.order);
        // setProductSearch(res?.data?.order);
        // setTotalPage(res?.data?.totalPage);
        // setCurrentPage(res?.data?.currentPage);
        ExportExcel.exportExcel(res?.data?.order, "Danh sách hóa đơn", "Danh sách hóa đơn");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const [openModalAccount, setOpenModalAccount] = useState(false);

  const [categories, setCategories] = useState([]);

  const [searchName, setSearchName] = useState(null);

  const [productSearch, setProductSearch] = useState([]);

  const [totalPage, setTotalPage] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const handleClickOpen = () => {
    setOpenModalAccount(true);
  };

  const handleSearchByName = (e) => {
    console.log(e?.target?.value);
    console.log(products);
    const tmp = products?.filter((product) => product?.id == e.target.value);
    console.log(tmp);
    setProductSearch(tmp);
  };

  const handleSearchByCategory = (category) => {
    console.log(category);
    const tmp = products?.filter((product) => product?.status?.includes(category));
    console.log(tmp);
    setProductSearch(tmp);
  };

  useEffect(() => {
    getOrderByPage(currentPage)
      .then((res) => {
        console.log(res);
        setProducts(res?.data?.order);
        setProductSearch(res?.data?.order);
        setTotalPage(res?.data?.totalPage);
        setCurrentPage(res?.data?.currentPage);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllRole()
      .then((res) => {
        console.log("Categories", res?.data);
        setCategories(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const handleReload = () => {
    getOrderByPage(currentPage)
    .then((res) => {
      console.log(res);
      setProducts(res?.data?.order);
      setProductSearch(res?.data?.order);
      // setTotalPage(res?.data?.totalPage);
      // setCurrentPage(res?.data?.currentPage);
    })
    .catch((err) => {
      console.log(err);
    });
  } 

  const handleChangePage = (page) => {
    console.log("Page", page);
    setCurrentPage(page);
  };

  const renderTotalPapge = () => {
    var indents = [];
    for (var i = 1; i <= totalPage; i++) {
      indents.push(
        // <span onClick={() => handleChangePage(num)} style = {{cursor : 'pointer'}} className="indent" key={i}>
        //   {i}
        // </span>
        {
          page: i,
        }
      );
    }
    return indents;
  };

  // const handleSearchDate = () => {

  // }

  useEffect(() => {
    const tmp = products?.filter(
      (product) =>
        moment(product?.dateCreate).format("DD/MM/YYYY") === moment(startDate).format("DD/MM/YYYY")
    );
    console.log(tmp);
    setProductSearch(tmp);
    console.log(moment(startDate).format("DD/MM/YYYY"));
  }, [startDate]);

  console.log(renderTotalPapge());

  return (
    <>
      <Head>
        <title>Quản lý hóa đơn</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Hóa đơn</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  {/* <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button> */}
                  <Button
                    onClick={() => handleExportFile()}
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              {/* <div onClick={() => handleClickOpen()}>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div> */}
            </Stack>

            <div style={{ display: "flex", alignItems: "center", gap: "15px", width: "100%" }}>
              <CustomersSearch
                searchName={searchName}
                setSearchName={setSearchName}
                handleSearchByName={handleSearchByName}
                style={{ width: "80%" }}
                placeholder="Nhập vào mã hóa đơn"
              />

              <FormControl variant="filled" style={{ width: "20%" }}>
                <InputLabel id="demo-simple-select-filled-label">Trạng thái</InputLabel>
                {/* <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  // value={age}
                  // onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select> */}
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  // value="demo"
                  onChange={(e) => handleSearchByCategory(e.target.value)}
                  displayEmpty
                >
                  {/* {categories.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item?.name}>
                        {item?.name}
                      </MenuItem>
                    );
                  })} */}
                  <MenuItem value="Wating for Accept">WAITING_FOR_ACCEPT</MenuItem>
                  <MenuItem value="Accepted">ACCEPTED</MenuItem>
                  <MenuItem value="Delivering">DELIVERING</MenuItem>
                  <MenuItem value="Delivered">DELIVERED</MenuItem>
                  <MenuItem value="Canceled">CANCELED</MenuItem>
                </Select>
              </FormControl>

              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>

            <OrdersTable
              count={productSearch?.length}
              items={productSearch}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
              handleReload = {handleReload}
            />
            {productSearch?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {renderTotalPapge().map((item, index) => {
                  return (
                    <div
                      style={{
                        height: "30px",
                        width: "30px",
                        color: "white",
                        backgroundColor: "#6366F1",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => handleChangePage(item.page)}
                    >
                      {item.page}
                    </div>
                  );
                })}
              </div>
            )}

            {productSearch?.length == 0 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h3>Không tìm thấy kết quả nào</h3>
              </div>
            )}
          </Stack>
        </Container>
      </Box>
      <ModalAccount open={openModalAccount} setOpen={setOpenModalAccount} />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
