import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

const SignUpReschedule = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email()
    .required('Email is required'),
  password: Yup.string().required('Password is required')
});

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={SignUpReschedule}
          onSubmit={(user: any, { setSubmitting }: FormikHelpers<any>) => {
            // signup user
            setSubmitting(false);
          }}
          render={({ errors, isSubmitting }) => (
            <Form>
              <div className="form-field">
                <label className="required">Name</label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  type="text"
                />
                <div className="form-error">
                  {errors.name ? errors.name : null}
                </div>
              </div>
              <div className="form-field">
                <label className="required">Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  type="text"
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
                />
                <div className="form-error">
                  {errors.password ? errors.password : null}
                </div>
              </div>
              <div className="form-field">
                <label className="required">Confirm Password</label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Reenter password"
                  type="password"
                />
                <div className="form-error">
                  {errors.confirmPassword ? errors.confirmPassword : null}
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
          <p>Have a account?</p>
          <a href="/login">Login</a>
        </div>
      </div>
    );
  }
}

export default SignUp;
