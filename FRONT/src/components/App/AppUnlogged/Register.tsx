import React from "react";
import { myFetch, generateAccountFromToken } from "../../../utils";
import { connect } from "react-redux";
import { SetAccountAction } from "../../../redux/actions";
import { IAccount } from "../../../interfaces/IAccount";

interface IProps {}

interface IGlobalActionProps {
  setAccount(account: IAccount): void;
}

interface IState {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordControl: string;
  error: string;
}

type TProps = IProps & IGlobalActionProps;

class Register extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordControl: "",
      error: ""
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSurnameChange = this.onSurnameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordControlChange = this.onPasswordControlChange.bind(this);
    this.register = this.register.bind(this);
  }

  onNameChange(event: any) {
    const name = event.target.value;
    this.setState({ name, error: "" });
  }

  onSurnameChange(event: any) {
    const surname = event.target.value;
    this.setState({ surname, error: "" });
  }

  onEmailChange(event: any) {
    const email = event.target.value;
    this.setState({ email, error: "" });
  }

  onPasswordChange(event: any) {
    const password = event.target.value;
    this.setState({ password, error: "" });
  }

  onPasswordControlChange(event: any) {
    const passwordControl = event.target.value;
    this.setState({ passwordControl, error: "" });
  }

  register() {
    const { name, surname, email, password } = this.state;
    myFetch({
      path: "/users/register",
      method: "POST",
      json: { name, surname, email, password }
    }).then(json => {
      if (json) {
        const {
          token,
          avatar,
          banner,
          name,
          surname,
          profession,
          password,
          about_me,
          youtube,
          linkedin,
          email
        } = json;
        localStorage.setItem("token", token);
        this.props.setAccount({
          token,
          avatar,
          email,
          banner,
          name,
          surname,
          profession,
          password,
          about_me,
          youtube,
          linkedin
        });
      } else {
        this.setState({ error: "User already registered" });
      }
    });
  }

  checkPassword() {
    const { password, passwordControl } = this.state;
    if (password === passwordControl) {
      this.register();
    } else {
      this.setState({ error: "Passwords don´t match" });
    }
  }

  render() {
    const { name, surname, email, password, passwordControl } = this.state;
    return (
      <div className="container animated bounceInLeft delay-0.5s slow">
        <div className="row centered-form">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Register!</h3>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control input-sm"
                      placeholder="First Name"
                      value={name}
                      onChange={this.onNameChange}
                    />
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control input-sm"
                      placeholder="Last Name"
                      value={surname}
                      onChange={this.onSurnameChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control input-sm"
                  placeholder="Email Address"
                  value={email}
                  onChange={this.onEmailChange}
                />
              </div>

              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control input-sm"
                      placeholder="Password"
                      value={password}
                      onChange={this.onPasswordChange}
                    />
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control input-sm"
                      placeholder="Confirm Password"
                      value={passwordControl}
                      onChange={this.onPasswordControlChange}
                    />
                  </div>
                </div>
              </div>

              {password !== passwordControl && (
                <span style={{ color: "red" }}>Passwords don´t match</span>
              )}

              <button
                disabled={
                  name.length === 0 ||
                  surname.length === 0 ||
                  email.length === 0 ||
                  password === "" ||
                  passwordControl === "" ||
                  password != passwordControl
                }
                onClick={this.register}
                className="btn btn-info btn-block"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps: IGlobalActionProps = {
  setAccount: SetAccountAction
};

export default connect(null, mapDispatchToProps)(Register);
