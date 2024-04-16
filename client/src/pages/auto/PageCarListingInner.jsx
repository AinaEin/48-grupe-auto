import { Link } from "react-router-dom";
import { NewestCarsList } from "../../components/auto-list/NewestCarsList";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function PageCarListingInner() {
  const { loginStatus } = useContext(GlobalContext);
  const guestActions = (
    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
      <Link to="/login" className="btn btn-primary btn-lg px-4 me-md-2">
        Login
      </Link>
      <Link to="/register" className="btn btn-outline-secondary btn-lg px-4">
        Register
      </Link>
    </div>
  );
  const userActions = (
    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
      <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">
        Add to favorite
      </button>
    </div>
  );

  return (
    <>
      <section className="container px-4">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="http://localhost:4821/img/cars/1.jpg"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Automobilio pavadinimas
            </h1>
            <p className="lead">
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the world’s most popular front-end open source toolkit,
              featuring Sass variables and mixins, responsive grid system,
              extensive prebuilt components, and powerful JavaScript plugins.
            </p>
            <ul>
              <li>Detail</li>
              <li>Detail</li>
              <li>Detail</li>
              <li>Detail</li>
              <li>Detail</li>
              <li>Detail</li>
            </ul>
            {loginStatus ? userActions : guestActions}
          </div>
        </div>
      </section>
      <NewestCarsList />
    </>
  );
}
