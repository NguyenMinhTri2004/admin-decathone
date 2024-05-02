import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales} from 'src/sections/overview/overview-sales';
import {OverviewSalesWeek} from 'src/sections/overview/overview-sales-week'
import { OverviewTopProduct} from 'src/sections/overview/overview-top-product'
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { getTop10Product , getTop5Customer ,getTop5Employee , getRevenueByWeek , getRevenueByMonth } from 'src/api/statistics';
import { useCallback, useMemo, useState, useEffect } from "react";
import moment from "moment";
import { CustomersTable } from "src/sections/customer/customers-table";
import { AccountsTable } from "src/sections/account/accounts-table";

const Page = () => {
  const now = new Date();

  const [revenueMonth , setRevenueMonth] = useState([])
  const [revenueWeek , setRevenueWeek] = useState([])
  const [top10Product , setTop10Product] = useState([])
  const [top5Customer , setTop5Customer] = useState([])

  useEffect(() => {
    // console.log(moment('2023-12-07T08:22:55.770Z').format("DD/MM/YYYY"))
    getRevenueByMonth()
      .then((res) => {
        console.log(res);
        // setProducts(res?.data?.order);
        // setProductSearch(res?.data?.order);
        // setTotalPage(res?.data?.totalPage);
        // setCurrentPage(res?.data?.currentPage);
        const tmp = [];
        res.data.map((item, i) => tmp.push(item?.revenue))

        console.log(tmp)
        setRevenueMonth(tmp)
      })
      .catch((err) => {
        console.log(err);
      });

    getRevenueByWeek()
      .then((res) => {
        console.log(res);
        // setProducts(res?.data?.order);
        // setProductSearch(res?.data?.order);
        // setTotalPage(res?.data?.totalPage);
        // setCurrentPage(res?.data?.currentPage);
        const tmp = [];
        res.data.map((item, i) => tmp.push(item?.revenue))

        console.log(tmp)
        setRevenueWeek(tmp)
      })
      .catch((err) => {
        console.log(err);
      });

    getTop10Product()
      .then((res) => {
        // console.log(res.data);
        // setProducts(res?.data?.order);
        // setProductSearch(res?.data?.order);
        // setTotalPage(res?.data?.totalPage);
        // setCurrentPage(res?.data?.currentPage);
        setTop10Product(res?.data)
      })
      .catch((err) => {
        console.log(err);
      });
    
    getTop5Customer()
      .then((res) => {
        console.log(res.data);
        // setProducts(res?.data?.order);
        // setProductSearch(res?.data?.order);
        // setTotalPage(res?.data?.totalPage);
        // setCurrentPage(res?.data?.currentPage);
        setTop5Customer(res?.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
  <>
    <Head>
      <title>
         Trang chủ
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
         
          <Grid
            xs={12}
            lg={12}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: revenueMonth
                },
             
              ]}
              sx={{ height: '100%' }}
            />

          </Grid>

          <Grid
            xs={12}
            lg={12}
          >
            <OverviewSalesWeek
              chartSeries={[
                {
                  name: 'This year',
                  data: revenueWeek
                },
             
              ]}
              sx={{ height: '100%' }}
            />

          </Grid>

          
          <Grid
            xs={12}
            lg={12}
          >
            <h3>Top 10 sản phẩm được mua nhiều nhất</h3>
             <CustomersTable
              count={top10Product?.length}
              items={top10Product}
             
            />

          </Grid>

          <Grid
            xs={12}
            lg={12}
          >
            <h3>Top 5 khách hàng mua hàng nhiều nhất</h3>
             <AccountsTable
              count={top5Customer?.length}
              items={top5Customer}
             
            />

          </Grid>
           
         
        </Grid>
      </Container>
    </Box>
  </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
