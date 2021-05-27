import React from "react";

import "./styles/BadgeNew.css";
import header from "../images/platziconf-logo.svg";
import BadgeForm from "../components/BadgeForm";
import Badge from "../components/Badge";
import PageLoading from "../components/PageLoading";
import api from "../api";
import md5 from "md5";

class BadgeNew extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      twitter: "",
      avatarUrl: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });

    let email = this.state.form.email;
    let hash = md5(email);

    try {
      this.state.form.avatarUrl = `https://s.gravatar.com/avatar/${hash}?d=identicon`;
      await api.badges.create(this.state.form);
      this.setState({
        loading: false,
      });

      this.props.history.push("/badges");
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    return (
      <React.Fragment>
        <div className="BadgeNew__hero">
          <img className="BadgeNew__hero-image fluid" src={header} alt="Logo" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge badgeInfo={this.state.form}></Badge>
            </div>

            <div className="col-6">
              <h1>New attendant</h1>

              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeNew;
