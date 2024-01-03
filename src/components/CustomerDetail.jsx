import { useParams } from "react-router-dom";

export const CustomerDetail = ({ customers }) => {
    const { id } = useParams();
    const selectedUser = customers.find((user) => user.id === Number(id));
    console.log(selectedUser);
    return (
        <div className="customer">
            <div className="mb-5 card">
                <div className="card-body">
                    <div className="card-title h5"></div>
                    <strong>Adres</strong>
                    <address>
                        <div>Orszańska</div>
                        <div>30-698</div>
                        <div>Kraków</div>
                    </address>
                    <p className="card-text">NIP: 6793097580</p>
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
                    {/* {
            {actions.map((action, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{akcja.opis}</td>
                <td>{akcja.rodzaj}</td>
                <td>{akcja.data}</td>
                <td>
                  <Button type="button" className="btn btn-primary">
                    Usuń
                  </Button>
                  <Button type="button" className="btn btn-primary">
                    Edytuj
                  </Button>
                </td>
              </tr>
            ))}
          } */}
                </tbody>
            </table>
            <button type="button" className="btn btn-primary">
                Dodaj akcje
            </button>
        </div>
    );
};
