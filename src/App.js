import { config } from "./config";
import axios from "axios";
import "./App.css";
import { CustomersList } from "./components/CustomersList";
import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";

function App() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomersList();
    }, []);
    const getCustomersList = () => {
        axios
            .get(config.api.url + "/crm/customers")
            .then((res) => {
                setCustomers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="App">
            <NavBar />
            <CustomersList customers={customers} />
        </div>
    );
}

export default App;
