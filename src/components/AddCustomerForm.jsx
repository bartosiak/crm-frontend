import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customerApiService } from "../apiService/customerApiService";

export const AddCustomerForm = () => {
    const navigate = useNavigate();
    const [customerFormData, setCustomerFormData] = useState({
        name: "",
        address: {
            street: "",
            zipCode: "",
            city: "",
        },
        nip: "",
    });

    const handleInputChange = (event) => {
        setCustomerFormData({
            ...customerFormData,
            [event.target.name]: event.target.value,
        });
    };
    const handleAddressInputChange = (event) => {
        setCustomerFormData({
            ...customerFormData,
            address: {
                ...customerFormData.address,
                [event.target.name]: event.target.value,
            },
        });
    };

    function createNewCustomer(event) {
        console.log(event);
        event.preventDefault();
        customerApiService.create(customerFormData).then((newCustomer) => {
            return navigate(`/customers/${newCustomer._id}`);
        });
    }

    return (
        <form className="w-50" onSubmit={createNewCustomer}>
            <div className="mb-3">
                <label className="form-label" htmlFor="name">
                    Nazwa klienta
                </label>
                <input
                    name="name"
                    placeholder="Nazwa klienta"
                    type="text"
                    id="name"
                    className="form-control"
                    onChange={handleInputChange}
                />
            </div>
            <fieldset className="mb-3">
                <strong>Adres:</strong>
                <div className="mb-1">
                    <label className="form-label" htmlFor="street">
                        Ulica numer
                    </label>
                    <input
                        name="street"
                        placeholder="Ulica numer"
                        type="text"
                        id="street"
                        className="form-control"
                        onChange={handleAddressInputChange}
                    />
                </div>
                <div className="mb-1">
                    <label className="form-label" htmlFor="zipCode">
                        Kod pocztowy
                    </label>
                    <input
                        name="zipCode"
                        placeholder="Kod pocztowy"
                        type="text"
                        id="zipCode"
                        className="form-control"
                        onChange={handleAddressInputChange}
                    />
                </div>
                <div className="mb-1">
                    <label className="form-label" htmlFor="city">
                        Miasto
                    </label>
                    <input
                        name="city"
                        placeholder="Miasto"
                        type="text"
                        id="city"
                        className="form-control"
                        onChange={handleAddressInputChange}
                    />
                </div>
            </fieldset>
            <div className="mb-3">
                <label className="form-label" htmlFor="nip">
                    NIP
                </label>
                <input
                    name="nip"
                    placeholder="NIP klienta"
                    type="text"
                    id="nip"
                    className="form-control"
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Dodaj
            </button>
        </form>
    );
};
