import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getRoles();
  }, []);

  const [data, setData] = useState({});

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    fetch(process.env.BACKEND_URL + "/user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  };

  return (
    <div className="text-center mt-5 container">
      <div className="row">
        <div className="mb-3">
          <label htmlFor="nameId" className="form-label">
            Name
          </label>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="nameId"
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailId" className="form-label">
            Email address
          </label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            className="form-control"
            id="emailId"
            placeholder="Email address"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordId" className="form-label">
            Password
          </label>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            className="form-control"
            id="passwordId"
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            onChange={handleChange}
            aria-label="Default select example"
            name="role"
          >
            <option defaultValue>Selecciona un rol para este usuario:</option>

            {store.roles.map((value, index) => {
              return (
                <option key={index} value={value.id}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={handleSubmit}>Crear nuevo usuario</button>
      </div>
    </div>
  );
};
