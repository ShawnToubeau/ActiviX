import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { LoginValidation } from '../../utils/validationSchemas';

// Actions
import { loginUser } from '../../actions/authActions';

// Interfaces
import User from '../../models/User';

interface Props {
  loginUser: (userData: User) => void;
}

class Login extends React.Component<Props> {
  render() {
    return (
      <div className="Login">
        <h3 className="component-header">Login</h3>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={LoginValidation}
          onSubmit={(user: User, { setSubmitting }: FormikHelpers<any>) => {
            this.props.loginUser(user);
            setSubmitting(false);
          }}
          render={({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="form-field">
                <label className="required" htmlFor="email">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  type="text"
                  label="email"
                />
                <div className="form-error">
                  {errors.email && touched.email ? errors.email : null}
                </div>
              </div>
              <div className="form-field">
                <label className="required" htmlFor="password">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  label="password"
                />
                <div className="form-error">
                  {errors.password && touched.password ? errors.password : null}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      loginUser
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Login);
