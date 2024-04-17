import { Link } from "react-router-dom";

export function PageMyAutoList() {
  const allCars = [];

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <h1>My cars for sale</h1>
          <Link className="btn btn-primary" to="/account/my-auto-list/create">
            Create new car
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive small">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr className="h5">
                <th scope="col">Id</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {allCars.map((car) => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>
                    <img src={car.img} alt="Car" style={{ height: 60 }} />
                  </td>
                  <td>{car.name}</td>
                  <td>{car.price}</td>
                  <td>ACTIONS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
