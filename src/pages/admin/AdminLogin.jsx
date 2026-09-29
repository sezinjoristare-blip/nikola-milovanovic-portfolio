import {
  useEffect,
  useState,
} from "react";

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  getCurrentAdmin,
  signInAdmin,
} from "../../services/portfolioService";

import "../../styles/pages/Admin.css";


function AdminLogin() {
  const navigate =
    useNavigate();

  const location =
    useLocation();


  const [
    checking,
    setChecking,
  ] =
    useState(true);

  const [
    alreadyLoggedIn,
    setAlreadyLoggedIn,
  ] =
    useState(false);

  const [
    email,
    setEmail,
  ] =
    useState("");

  const [
    password,
    setPassword,
  ] =
    useState("");

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState("");


  useEffect(
    () => {
      let active =
        true;


      async function checkAdmin() {
        try {
          const admin =
            await getCurrentAdmin();


          if (
            !active
          ) {
            return;
          }


          setAlreadyLoggedIn(
            Boolean(
              admin
            )
          );
        } catch {
          if (
            active
          ) {
            setAlreadyLoggedIn(
              false
            );
          }
        } finally {
          if (
            active
          ) {
            setChecking(
              false
            );
          }
        }
      }


      checkAdmin();


      return () => {
        active =
          false;
      };
    },
    []
  );


  async function handleSubmit(
    event
  ) {
    event.preventDefault();


    if (
      loading
    ) {
      return;
    }


    setErrorMessage(
      ""
    );


    if (
      !email.trim() ||
      !password
    ) {
      setErrorMessage(
        "Enter email and password."
      );

      return;
    }


    setLoading(
      true
    );


    try {
      await signInAdmin({
        email,
        password,
      });


      const destination =
        location.state?.from &&
        location.state.from.startsWith(
          "/admin"
        )
          ? location.state.from
          : "/admin/projects";


      navigate(
        destination,
        {
          replace:
            true,
        }
      );
    } catch (
      error
    ) {
      setErrorMessage(
        error?.message ||
        "Login failed."
      );
    } finally {
      setLoading(
        false
      );
    }
  }


  if (
    checking
  ) {
    return (
      <div className="admin-access-state">
        CHECKING ACCESS...
      </div>
    );
  }


  if (
    alreadyLoggedIn
  ) {
    return (
      <Navigate
        to="/admin/projects"
        replace
      />
    );
  }


  return (
    <section className="admin-login">
      <div className="admin-login__panel">
        <div className="admin-login__heading">
          <span>
            N/M
          </span>

          <h1>
            PORTFOLIO ADMIN
          </h1>

          <p>
            Sign in to manage projects.
          </p>
        </div>


        <form
          className="admin-login__form"
          onSubmit={
            handleSubmit
          }
        >
          <label className="admin-field">
            <span>
              EMAIL
            </span>

            <input
              type="email"
              value={
                email
              }
              onChange={
                (
                  event
                ) =>
                  setEmail(
                    event.target.value
                  )
              }
              autoComplete="email"
              autoFocus
              disabled={
                loading
              }
            />
          </label>


          <label className="admin-field">
            <span>
              PASSWORD
            </span>

            <input
              type="password"
              value={
                password
              }
              onChange={
                (
                  event
                ) =>
                  setPassword(
                    event.target.value
                  )
              }
              autoComplete="current-password"
              disabled={
                loading
              }
            />
          </label>


          {errorMessage ? (
            <p className="admin-message admin-message--error">
              {errorMessage}
            </p>
          ) : null}


          <button
            type="submit"
            className="admin-button admin-button--primary"
            disabled={
              loading
            }
          >
            {loading
              ? "SIGNING IN..."
              : "SIGN IN"}
          </button>
        </form>
      </div>
    </section>
  );
}


export default AdminLogin;