import { useEffect, useState } from "react";
import User from "../../../models/User";
import { UserService } from "../../../services/user_service";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import './employees.css';

function Employees() {

    const navigate = useNavigate();
    const [employees, setEmployees] = useState<User[]>();

    useEffect(() => {
        UserService.getAllEmployees().then(res => {
            setEmployees(res.data);
        }).catch(err => {
            if (err.response.status === 401) {
                navigate('/unauthorized');
            }
        });
    }, [])

    const deleteEmployee = (id: string) => {
        UserService.deleteUser(id).then(res => {
            UserService.getAllEmployees().then(res => {
                setEmployees(res.data);
            }).catch(err => console.log(err));
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            {
                employees?.map((employee, index) => <Paper key={index} sx={{ padding: 2, margin: 1 }}>
                    <h3>{employee.name}</h3>
                    <p>{employee.email}</p>
                    <p>{employee.points} points</p>
                    <div className="action-buttons">
                        <Button variant="contained" onClick={() => navigate(`/admin/add-employee/${employee._id}`)}>Edit</Button>
                        <Button color="warning" variant="contained" onClick={() => deleteEmployee(employee._id!)}>Delete</Button>
                    </div>
                </Paper>)
            }
            <Fab onClick={() => navigate('/admin/add-employee')} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </>
    )
}

export default Employees;