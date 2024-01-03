import { useLoaderData } from "react-router-dom";

export const CustomerDetail = () => {
    const customer = useLoaderData();
    const actions = customer.actions;
    return (
        <div className="container">
            <div className="mb-5 card">
                <div className="card-body">
                    <div className="card-title h5">{customer.name}</div>
                    <strong>Adres</strong>
                    <address>
                        {customer.address.street}
                        <br />
                        {customer.address.zipCode}
                        <br />
                        {customer.address.city}
                        <br />
                    </address>
                    <p className="card-text">NIP: {customer.nip}</p>
                </div>
            </div>
            <h2>Akcje</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>LP.</th>
                        <th>Opis</th>
                        <th>Rodzaj akcji</th>
                        <th>Data</th>
                        <th>Edycja</th>
                    </tr>
                </thead>
                <tbody>
                    {actions.map((action, index) => (
                        <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{action.description}</td>
                            <td>{action.type}</td>
                            <td>{action.date}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Usuń
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Edytuj
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" className="btn btn-primary">
                Dodaj akcje
            </button>
        </div>
    );
};
