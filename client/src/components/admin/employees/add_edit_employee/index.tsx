import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../../../../models/User";
import { UserService } from "../../../../services/user_service";
import AddEditEmployeeForm from "./form";
function AddEditEmployee() {

    const params = useParams();
    const id = params.id;
    
    const [employee, setEmployee] = useState<User>();

    useEffect(() => {
        if (id !== undefined) {
            UserService.getUserById(id).then(res => {
                setEmployee(res.data);
            }).catch(err => console.log(err));
        }
    }, []);

    return ( <AddEditEmployeeForm key={employee} employee={employee}/> )
}

export default AddEditEmployee;