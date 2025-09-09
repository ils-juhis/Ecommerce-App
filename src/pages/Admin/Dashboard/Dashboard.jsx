import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../../../store/actions/AdminActions/AdminAction';
import './Dashboard.scss'
import {ReactComponent as Product} from '../../../assets/images/product.svg'
import {ReactComponent as Order} from '../../../assets/images/order.svg'
import {ReactComponent as Money} from '../../../assets/images/money.svg'
import {ReactComponent as Users} from '../../../assets/images/users.svg'
import { BarChart } from '@mui/x-charts/BarChart';

const Dashboard = () => {
    const {loading, data} =  useSelector(state=> state.dashboardReducer)
    const dispatch = useDispatch();
  
  const stats = [
    { title: 'Total Products', color: 'primary', key: 'total_products' , icon: <Product/>},
    { title: 'Total Orders', color: 'success', key: 'total_users', icon:<Order fill='red' /> },
    { title: 'Total Users', color: 'info', key: 'total_orders', icon:<Users stroke='#3ccd16' /> },
    { title: 'Revenue', color: 'warning', key: 'total_revenue', icon:<Money color={'#f9d745'} /> }
  ];

  useEffect(()=>{
    dispatch(getDashboardData())
  }, [])

  

  return (
    <div className='dashboard'>
      <div className=" d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 d-flex align-items-center ms-3">
            Dashboard
          </h4>
        <div className="text-muted">
          <i className="bi bi-calendar3 me-2"></i>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-2">
        {stats.map((stat, index) => (
          <div key={index} className="col-lg-6 col-xl-3 mb-4">
            <div className="card h-100 border-0 shadow-sm hover-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="card-title text-muted mb-2">{stat.title}</h6>
                    <h5 className="mb-0 fw-bold">{data?.[stat.key]}</h5>
                  </div>
                  <div className={`fs-2`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">{console.log(data)}
        <div className="col-12 col-lg-6">
          <div className="rounded shadow ">
            {
              data?.revenueByCategory &&
              <BarChart
                height={300}
                series={[
                  { data: data?.revenueByCategory?.map(item=> item.revenue), label: 'Revenue', id: 'pvId' },
                ]}
                xAxis={[{ data: data?.revenueByCategory?.map(item=> item.category) }]}
                yAxis={[{ width: 50 }]}
              />
            }
          </div>
        </div>
        <div className="div col-12 col-lg-6">
          {
            data?.revenueByCategory &&
            <BarChart
              height={300}
              series={[
                { data: data?.statusCount?.map(item=> item.revenue), label: 'Revenue', id: 'pvId' },
              ]}
              xAxis={[{ data: data?.statusCount?.map(item=> item.category) }]}
              yAxis={[{ width: 50 }]}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;