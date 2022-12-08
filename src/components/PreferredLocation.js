import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Table } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Axios from 'axios';
import Switch from '@mui/material/Switch';
import axios from "axios";


const PreferredLocation = () =>{

    const [data, setData] = useState([]);
    
    const navigate = useNavigate();
    const fetchData = () => {
        axios.get("location/view")
            .then((response) => {
                setData(response.data.result);
                console.log(response.data.result)
               
    }
            )
}
    

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        Axios.get("location/delete/" + id);
        alert('successfully Deleted')
        fetchData();
    }

    const statusHandler = (id) =>{
        Axios.get(`location/status/${id}`,{id:id})
        .then(result => {
            console.log(result);
        });
        fetchData();
    }

    return(
        <section className="content">
        <div className="container-fluid">
            <div className="block-header">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <ul className="breadcrumb breadcrumb-style ">
                            <li className="breadcrumb-item">
                                <h4 className="page-title">Preferred Location</h4>
                            </li>
                            <FaHome className="HomeIcon" />
                            <li className="breadcrumb-item bcrumb-1">

                                <IoIosArrowForward className="Arrow" />
                                <Link className="nav-link" to="">
                                    Home
                                </Link>
                            </li>

                            <li className="DashboardActive">
                                <IoIosArrowForward className="Arrow" />
                                Preferred Location</li>
                        </ul>
                    </div>
                    <div>
                        <button onClick={() => navigate("/Add_PreferredLocation")} className="btn btn-primary" style={{ float: 'right',marginBottom:"10px",fontSize:"12px" }}>Add PreferredLocation</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>location</th>
                                    {/* <th>location_status</th> */}
                                    <th colSpan={2} >Action</th>
                                    <th>create_date</th>
                                </tr>
                            </thead>
                            <tbody className="TableColumns">
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.location}</td>
                                        {/* <td >
                                        <Switch
                                            defaultChecked={item.location_status=="enable"?true:false}
                                            defaultValue={item.location_status}
                                            name="status"
                                            onChange={()=> statusHandler(item.id,item.location_status)}
                                            />
                                        </td> */}
                                        <td style={{borderStyle:"none"}}>
                                            <Link to={"/Updatelocation/" + item.id} style={{ color: 'green' }}>
                                                <FaRegEdit />
                                            </Link>
                                        </td>
                                        <td style={{borderStyle:"none"}}>
                                            <button className="" style={{ color: "red" }} onClick={() => handleDelete(item.id)}><FaRegTrashAlt /></button>
                                        </td>
                                        <td>{item.create_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
}
export default PreferredLocation;