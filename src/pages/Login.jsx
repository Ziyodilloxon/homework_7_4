// Login.jsx
import { Form, Link, useActionData } from "react-router-dom";

// components
import FormInput from "../components/FormInput";

// custom hooks
import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();
  const [errors, setErrprs] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      if (userData.email.trim() && userData.password.trim()) {
        signInWithEmail(userData.email, userData.password);
      }
      if (!userData.email.trim()) {
        setErrprs((prev) => {
          return { ...prev, email: "error" };
        });
      }
      if (!userData.password.trim()) {
        setErrprs((prev) => {
          return { ...prev, password: "error" };
        });
      }
    }
    console.log(errors);
  }, [userData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
      <div className="bg-[url('https://picsum.photos/1000/1200')] bg-center bg-cover lg:block bg-no-repeat md:hidden"></div>
      <div className=" bg-[url('https://picsum.photos/1000/1200')] bg-center bg-cover bg-no-repeat lg:bg-none grid place-items-center min-h-screen">
        <Form
          method="post"
          className="flex flex-col items-center gap-5 card bg-base-100 shadow-xl w-96 p-5"
        >
          <h1 className="text-4xl font-bold">Login</h1>
          <FormInput
            type="email"
            name="email"
            label="Email"
            status={errors.email}
          />
          <FormInput
            type="password"
            name="password"
            label="Password"
            status={errors.password}
          />
          <div className="w-full">
            {!isPending && (
              <button className="btn btn-block btn-primary">Login</button>
            )}
            {isPending && (
              <button disabled className="btn btn-block btn-primary">
                Loading...
              </button>
            )}
          </div>
          <div className="flex gap-2 items-center">
            Sizda hisob yoqmi?
            <Link to="/register" className="link link-info">
              Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
