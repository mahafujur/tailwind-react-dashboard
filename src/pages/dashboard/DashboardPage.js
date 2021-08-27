import React, {useEffect, useState} from 'react';
import ApiContainer from "../../apis/auth";
import Swal from "sweetalert2";
import Layout from "../../components/Layout/Layout";

export default function DashboardPage({user}) {
    const [dashboardData, setDashboardData] = useState(undefined);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        if(dashboardData===undefined) dashboardApi();
    }, [])

    function dashboardApi() {
        setLoading(true)
        ApiContainer.dashboard()
            .then(response => {
                if (response.ok) {
                    setDashboardData(response.data.dashboard)
                } else {
                    setDashboardData([])
                    Swal.fire({
                        title: "Login Request Failed",
                        text: response.data.msg,
                        confirmButtonColor: '#ff8c00',
                        confirmButtonText: 'Back',
                    })
                }
            })
            .catch(err => {
                console.log(err)
                Swal.fire('Error', "Something is wrong", 'error');
            })
            .finally(() => {
                setLoading(false)
            });
    }
    // console.log(dashboardData,'dash boar data')
    let orders = 0;
    let total = 0;
    //
    // const week = dashboardData && dashboardData.sales_over_time_week;
    // const year = dashboardData && dashboardData.sales_over_time_year;
    // const tops = dashboardData && dashboardData.bestsellers.slice(0, 3);
    // const chartWeek = [];
    // const chartYear = [];

    // Object.keys(week).map((key) => {
    //     orders += week[key].orders;
    //     total += week[key].total;
    //     chartWeek.push({date: key, total: week[key].total})
    // })
    // Object.keys(year).map(function (key) {
    //     console.log(key);
    //     chartYear.push({date: key, total: year[key].total});
    // })
    // console.log(chartYear);
    // const todaysSalesNumber = week[1].orders;
    // const todaysSalesTotal = week[1].total;
    // const weekSalesNumber = orders;
    // const weekSalesTotal = total;
    // const monthSalesNumber = dashboardData && dashboardData.sales_over_time_year[1].orders;
    // const monthsSalesTotal = dashboardData && dashboardData.sales_over_time_year[1].total;

    return (
        <Layout>
            <div className="grid grid-cols lg:grid-cols-3 gap-4 " >
                afsd
                {/*<Stats item name="Today" number={todaysSalesNumber}*/}
                {/*       total={todaysSalesTotal}/>*/}
                {/*<Stats item name="Last Week" number={weekSalesNumber}*/}
                {/*       total={weekSalesTotal}/>*/}
                {/*<Stats item name="Last Month" number={monthSalesNumber}*/}
                {/*       total={monthsSalesTotal}/>*/}
            </div>
            {/*<Chart week={chartWeek} year={chartYear}/>*/}
            {/*<Typography variant="h5">Best Sellers</Typography>*/}
            {/*<BestSellers tops={tops}/>*/}
        </Layout>
    )
}


