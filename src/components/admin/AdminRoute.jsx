import {
  useEffect,
  useState,
} from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  supabase,
} from "../../lib/supabaseClient";

import {
  getCurrentAdmin,
} from "../../services/portfolioService";


function AdminRoute({
  children,
}) {
  const location =
    useLocation();


  const [
    state,
    setState,
  ] =
    useState({
      loading:
        true,

      allowed:
        false,
    });


  useEffect(
    () => {
      let active =
        true;


      async function checkAccess() {
        try {
          const admin =
            await getCurrentAdmin();


          if (
            !active
          ) {
            return;
          }


          setState({
            loading:
              false,

            allowed:
              Boolean(
                admin
              ),
          });
        } catch (
          error
        ) {
          console.error(
            "Admin access check:",
            error
          );


          if (
            active
          ) {
            setState({
              loading:
                false,

              allowed:
                false,
            });
          }
        }
      }


      checkAccess();


      const {
        data:
          authListener,
      } =
        supabase
          .auth
          .onAuthStateChange(
            () => {
              checkAccess();
            }
          );


      return () => {
        active =
          false;

        authListener
          ?.subscription
          ?.unsubscribe();
      };
    },
    []
  );


  if (
    state.loading
  ) {
    return (
      <div className="admin-access-state">
        CHECKING ACCESS...
      </div>
    );
  }


  if (
    !state.allowed
  ) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from:
            location.pathname,
        }}
      />
    );
  }


  return children;
}


export default AdminRoute;