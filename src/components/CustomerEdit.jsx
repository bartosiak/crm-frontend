import React from "react";
import { Form, useLoaderData } from "react-router-dom";

export async function updateCustomer({ request, params }) {
    const data = await request.formData();
    console.log(data);

    return fetch(`http://localhost:4000/customers/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
            name: data.get("name"),
            address: {
                street: data.get("street"),
                zipCode: data.get("zipCode"),
                city: data.get("city"),
            },
            nip: data.get("nip"),
        }),
        headers: {
            "Content-type": "application/json",
        },
    });
}

export const CustomerEdit = () => {
    const customer = useLoaderData();
    console.log(customer._id);

    return (
        <Form className="w-50" method="PUT">
            <div className="mb-3">
                <label className="form-label" htmlFor="name">
                    Nazwa klienta
                </label>
                <input
                    name="name"
                    placeholder="Nazwa klienta"
                    type="text"
                    id="name"
                    defaultValue={customer.name}
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
                        defaultValue={customer.address.street}
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
                        defaultValue={customer.address.zipCode}
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
                        defaultValue={customer.address.city}
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
                    defaultValue={customer.nip}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Dodaj
            </button>
        </Form>
    );
};
