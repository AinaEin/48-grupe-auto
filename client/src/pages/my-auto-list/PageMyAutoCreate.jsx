import { useContext, useState } from "react";
import { Alert } from "../../components/alert/Alert";
import { GlobalContext } from "../../context/GlobalContext";

export function PageMyAutoCreate() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [responseText, setResponseText] = useState("");
  const [responseType, setResponseType] = useState("");
  const { userId, addMyNewCar } = useContext(GlobalContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (name === "" || price === "") {
      setResponseType("error");
      setResponseText("Blogi formos duomenys");
      return;
    }

    fetch("http://localhost:4821/api/create-car", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ userId, name, price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseType(data.type);
        setResponseText(data.message);

        if (data.type === "success") {
          addMyNewCar(data.car);
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <section className="container">
      <div className="row">
        <h1 className="col-12">Create new car</h1>
      </div>
      <div className="row">
        <form
          onSubmit={handleFormSubmit}
          className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 col-xxl-4 offset-xxl-4"
        >
          <Alert type={responseType} text={responseText} />

          <div className="form-floating">
            <input
              type="text"
              onChange={handleNameChange}
              value={name}
              className="form-control"
              id="name"
              placeholder="Auto"
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="number"
              onChange={handlePriceChange}
              value={price}
              className="form-control"
              id="price"
              placeholder="99"
            />
            <label htmlFor="price">Price</label>
          </div>

          <button className="btn btn-primary w-100 py-2 mt-3" type="submit">
            Create
          </button>
        </form>
      </div>
    </section>
  );
}
