import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { customerApiService } from "../apiService/customerApiService";

export const CustomerEdit = () => {
    const [customer, setCustomer] = useState(null);
    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        customerApiService.get(params.id).then((customer) => {
            setCustomer(customer);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateCustomer = (event) => {
        event.preventDefault();

        const customerData = {
            name: event.target.name.value,
            address: {
                street: event.target.street.value,
                zipCode: event.target.zipCode.value,
                city: event.target.city.value,
            },
            nip: event.target.nip.value,
        };

        customerApiService.update(params.id, customerData).then(() => {
            console.log("nastąpiło przekierowanie");
            navigate("/customers");
        });
    };

    return (
        <form className="w-50" method="PUT" onSubmit={updateCustomer}>
            <div className="mb-3">
                <label className="form-label" htmlFor="name">
                    Nazwa klienta
                </label>
                <input
                    name="name"
                    placeholder="Nazwa klienta"
                    type="text"
                    id="name"
                    defaultValue={customer?.name}
                    className="form-control"
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
                        defaultValue={customer?.address.street}
                        className="form-control"
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
                        defaultValue={customer?.address.zipCode}
                        className="form-control"
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
                        defaultValue={customer?.address.city}
                        className="form-control"
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
                    defaultValue={customer?.nip}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Zaktualizuj
            </button>
        </form>
    );
};
