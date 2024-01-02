export const CustomersList = ({ customers }) => {
    console.log(customers);

    return (
        <div className="container">
            <h2>Klienci</h2>

            {customers.map((customer, index) => (
                <div className="card mb-3" key={customer._id}>
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
                        <button className="btn btn-primary">Szczegóły</button>
                    </div>
                </div>
            ))}
        </div>
    );
};
