import React from "react";
import "./UpdateProfile.css";
import { connect } from "react-redux";
import { IStore } from "../../../../interfaces/IStore";
import { IAccount } from "../../../../interfaces/IAccount";
import { myFetch } from "../../../../utils";
import { SetAccountAction } from "../../../../redux/actions";
import swal from "sweetalert";
import youtubeIcon from "../../../../icons/youtube2.png";
import linkedinIcon from "../../../../icons/linkedin2.png";

interface IGlobalStateProps {
  account: IAccount;
}

interface IGlobalActionProps {
  setAccount(account: IAccount): void;
}

interface IState {
  name: string;
  surname: string;
  profession: string;
  about_me: string;
  oldPassword: string;
  newPassword: string;
  youtube: string;
  linkedin: string | undefined;
  passwordMessage: string;
  updatedMessage: string;
}

type TProps = IGlobalStateProps & IGlobalActionProps;

class UpdateProfileForm extends React.Component<TProps, IState> {
  constructor(props: any) {
    super(props);

    const { account } = this.props;

    this.state = {
      name: account.name,
      surname: account.surname,
      profession: account.profession,
      about_me: account.about_me,
      oldPassword: "",
      newPassword: "",
      youtube: account.youtube,
      linkedin: account.linkedin,
      passwordMessage: "",
      updatedMessage: ""
    };

    this.updateAccount = this.updateAccount.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  updatePassword() {
    //TODO - NOT WORKING
    this.setState({ passwordMessage: "" });
    const { account } = this.props;
    const { id, token }: any = account;
    const { oldPassword, newPassword } = this.state;
    myFetch({
      path: `/users/editPassword/${id}`,
      method: "PUT",
      json: { oldPassword, newPassword },
      token
    }).then(response => {
      console.log(response);
      if (response) {
        console.log("actualizo pss");
        this.setState({ passwordMessage: "Password updated correctly" });
      } else {
        console.log("no puedo");
        this.setState({ passwordMessage: "Please insert correct password" });
      }
    });
  }

  updateAccount() {
    const { account, setAccount } = this.props;
    const { id, token }: any = account;
    let { name, surname, profession, about_me, youtube, linkedin } = this.state;
    //If the state of the component is empty because there hasn´t been a change
    //I´m taking the value that comes from redux so it doesn´t update with empty strings
    name = name !== "" ? name : account.name;
    surname = surname !== "" ? surname : account.surname;
    profession = profession !== "" ? profession : account.profession;
    about_me = about_me !== "" ? about_me : account.about_me;
    youtube = youtube !== "" ? youtube : account.youtube;
    linkedin = linkedin !== "" ? linkedin : account.linkedin;
    myFetch({
      path: `/users/edit/${id}`,
      method: "PUT",
      json: { name, surname, profession, about_me, linkedin, youtube },
      token
    }).then(response => {
      console.log(response);
      if (response) {
        const {
          name,
          surname,
          profession,
          avatar,
          id,
          email,
          isAdmin,
          banner,
          about_me,
          linkedin,
          youtube,
          isCreator
        } = response;
        console.log("usuario actualizado");
        swal({
          title: "Updated!",
          text: "User updated correctly",
          icon: "success",
          timer: 4000
        });
        setAccount({
          name,
          surname,
          profession,
          avatar,
          id,
          email,
          isAdmin,
          banner,
          about_me,
          token,
          youtube,
          linkedin,
          isCreator
        });
      } else {
        console.log("no actualizado");
        this.setState({
          updatedMessage: "Error updating details, please try again"
        });
      }
    });
  }

  render() {
    const { account } = this.props;
    let {isCreator} = account;
    isCreator = Boolean(isCreator) ;
    let {
      name = account?.name,
      surname,
      profession,
      oldPassword,
      newPassword,
      about_me,
      youtube,
      linkedin,
    } = this.state;

    return (
      <>
        {/* the form starts here */}
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
          
        <div className="col-8 ml-1 animated zoomInUp ">
          <div className="container">
            <div className="row centered-form">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="row">
                    {/* FIRST NAME */}
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control input-sm"
                          placeholder="First Name"
                          value={name}
                          onChange={({ target: { value } }) =>
                            this.setState({ name: value })
                          }
                        />
                      </div>
                    </div>
                    {/* SURNAME */}
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control input-sm"
                          placeholder="Last Name"
                          value={surname}
                          onChange={({ target: { value } }) =>
                            this.setState({ surname: value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* PROFESSION*/}
                  {isCreator &&<div className="form-group">
                    <input
                      type="text"
                      className="form-control input-sm"
                      placeholder="Profession"
                      value={profession}
                      onChange={({ target: { value } }) =>
                        this.setState({ profession: value })
                      }
                    /> 
                  </div>}
                  {/* ABOUT_ME */}
                  {isCreator  && <textarea
                    placeholder="Write a description about you"
                    className="form-control mt-3"
                    value={about_me}
                    onChange={({ target: { value } }: any) =>
                      this.setState({ about_me: value })
                    }
                  ></textarea>}

                    {/* YOUTUBE */}
                   {isCreator  && <div
                    className="row"
                    style={{ width: "100%", marginLeft: "0.2rem" }}
                  >
                    <img
                      src={youtubeIcon}
                      alt=""
                      style={{ width: "2rem" }}
                      className="mt-3"
                    />

                    <input
                      style={{ width: "93%" }}
                      placeholder="Youtube"
                      className="form-control mt-3 input-sm ml-2 "
                      type="text"
                      value={youtube}
                      onChange={({ target: { value } }) =>
                        this.setState({ youtube: value })
                      }
                    />
                  </div>}
                  {/* Linkedin */}
                 {isCreator && <div
                    className="row mt-3"
                    style={{ width: "100%", marginLeft: "0.2rem" }}
                  >
                    <img
                      src={linkedinIcon}
                      alt=""
                      style={{ width: "2rem", height: "2rem" }}
                    />
                    <input
                      style={{ width: "93%" }}
                      className="form-control input-sm ml-2"
                      placeholder="Linkedin"
                      type="text"
                      value={linkedin}
                      onChange={({ target: { value } }) =>
                        this.setState({ linkedin: value })
                      }
                    />
                  </div>}
                  <button
                    className="btn  btn-block mt-3 buttonColor"
                    onClick={this.updateAccount}
                  >
                    Update profile
                  </button>
                  <span>{this.state.updatedMessage}</span>

                  <div className="row mt-4">
                    {/* OLD PASSWORD */}
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control input-sm"
                          placeholder="Old password"
                          value={oldPassword}
                          onChange={({ target: { value } }) =>
                            this.setState({ oldPassword: value })
                          }
                        />
                      </div>
                    </div>
                    {/* NEW PASSWORD */}
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control input-sm"
                          placeholder="New password"
                          value={newPassword}
                          onChange={({ target: { value } }) =>
                            this.setState({ newPassword: value })
                          }
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-block mt-1 mb-2 buttonColor passButton"
                      onClick={this.updatePassword}
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
        </div>
        </div>

      </>
    );
  }
}

const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

const mapDispatchToProps: IGlobalActionProps = {
  setAccount: SetAccountAction
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileForm);
