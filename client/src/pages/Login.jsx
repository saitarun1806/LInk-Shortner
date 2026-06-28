import { useState } from "react";
import {Link,useNavigate,useNavigation} from "react-router-dom";
import axios from "axios";

function Login(){
    const navigate = useNavigate();
    const [eamil,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [loading,setLoading]=useState(false);

    
}