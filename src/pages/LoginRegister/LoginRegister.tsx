import axios, { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { setUserToken } from "utils/helpers";

type FormField = {
  fieldName: string;
  name: string;
  type: string;
};

type FormValues = {
  [key: string]: string;
};

type LoginResponse = {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
};

export const LoginRegister: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    setErrors([]);
  }, [isLoginPage]);

  const displayErrors = (
    <ul className="error-messages">
      {errors.map((err, i) => (
        <li key={`${err},${i}`}>{err}</li>
      ))}
    </ul>
  );

  const formFields: FormField[] = [
    {
      name: "Email",
      type: "text",
      fieldName: "email",
    },
    {
      name: "Password",
      type: "password",
      fieldName: "password",
    },
  ];

  if (!isLoginPage) {
    formFields.unshift({
      name: "Your Name",
      type: "text",
      fieldName: "full_name",
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const postURL = isLoginPage ? "api/users/login" : "";

    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(postURL, { user: formValues });
      const user = response.data?.user;
      if (!user) throw new Error("Invalid input");
      const userToken = `Bearer ${user.token}`;
      setUserToken(userToken);
      history.push("/");
    } catch (err) {
      const typedError: any = err;
      setErrors([typedError.message || typedError?.response?.data?.message || typedError?.response?.message]);
    }
  };

  const handleInput = (key: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{isLoginPage ? "Sign in" : "Sign up"}</h1>

              {!isLoginPage && (
                <p className="text-xs-center">
                  <a href="/#/login">Have an account?</a>
                </p>
              )}

              {errors.length > 0 && displayErrors}

              <form>
                {formFields.map(field => (
                  <fieldset key={field.name} className="form-group">
                    <input
                      onChange={event => handleInput(field.fieldName, event.target.value)}
                      className="form-control form-control-lg"
                      type={field.type}
                      placeholder={field.name}
                    />
                  </fieldset>
                ))}
                <button onClick={handleSubmit} className="btn btn-lg btn-primary pull-xs-right">
                  {isLoginPage ? "SIgn in" : "Sign up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
