import React, { useContext, useState } from "react";
import style from "./LogIn.module.css";
import login from "../../Assets/images/login.webp";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function LogIn() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();
  let { setUserToken } = useContext(UserContext);

  async function registerSubmit(values) {
    setLoading(true);
    let { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values).catch((error) => {
      setApiError(error.response.data.msg);
      setLoading(false);
    });
    if (data.msg === "done") {
      setLoading(false);
      navigate("/");
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("Email Is Required").email("Invalid Email"),
    password: Yup.string()
      .required("Password Is Required")
      .matches(/^[A-Z][\w @]{5,8}$/, "Invalid Password"),
  });

  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <section className="vh-100">
      <div className={`container-fluid ${style.hcustom}`}>
        <div className="row d-flex justify-content-center align-items-center flex-column flex-nowrap h-100 ms-5">
          <div className="col-md-4">
            <img src={login} className="img-fluid" alt="logIn" />
          </div>
          <div className="col-md-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="text">
                <h3>Welcome Back</h3>
              </div>
              {apiError ? <div className="alert alert-danger text-center">{apiError}</div> : ""}
              <div className="form-outline mb-4">
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                />
                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : ""}
              </div>
              <div className="form-outline mb-3">
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="password"
                />
                {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password}</div> : ""}
              </div>

              <div className="text-center text-lg-start mt-4 pt-2 d-flex justify-content-between">
                {loading ? (
                  <button type="button" className="btn text-light">
                    <ThreeDots
                      visible={true}
                      height="30"
                      width="30"
                      color="#0aad0a"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </button>
                ) : (
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    log In
                  </button>
                )}

                <Link className="btn btn-primary btn-lg" to={"/register"}>
                  Regester
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
