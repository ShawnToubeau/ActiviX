import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

const LoginReschedule = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Email is required'),
  password: Yup.string().required('Password is provided')
});

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <h3 className="component-header">Login</h3>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={LoginReschedule}
          onSubmit={(user: any, { setSubmitting }: FormikHelpers<any>) => {
            // login user
            setSubmitting(false);
          }}
          render={({ errors, isSubmitting }) => (
            <Form>
              <div className="form-field">
                <label className="required">Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  type="text"
                  label="email"
                />
                <div className="form-error">
                  {errors.email ? errors.email : null}
                </div>
              </div>
              <div className="form-field">
                <label className="required">Password</label>
                <Field
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  label="password"
                />
                <div className="form-error">
                  {errors.password ? errors.password : null}
                </div>
              </div>
              <button
                className="login-btn"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        />
        <div className="referrer">
          <p>Need a account?</p>
          <a href="/signup">Sign up</a>
        </div>
      </div>
    );
  }
}

export default Login;
