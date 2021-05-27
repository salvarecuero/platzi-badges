import React from "react";

import "./styles/Badge.css";
import confLogo from "../images/badge-header.svg";
import Gravatar from "./Gravatar";

class Badge extends React.Component {
  render() {
    return (
      <div className="Badge">
        <div className="Badge__header">
          <img src={confLogo} alt="Logo de la conferencia" />
        </div>

        <div className="Badge__section-name">
          <Gravatar
            className="Badge__avatar"
            email={this.props.badgeInfo.email}
            alt="Avatar"
          />
          <h1>
            {this.props.badgeInfo.firstName
              ? this.props.badgeInfo.firstName
              : "Nombre"}
            <br />
            {this.props.badgeInfo.lastName
              ? this.props.badgeInfo.lastName
              : "Apellido"}
          </h1>
        </div>

        <div className="Badge__section-info">
          <h3>
            {this.props.badgeInfo.jobTitle
              ? this.props.badgeInfo.jobTitle
              : "Título"}
          </h3>
          <div>
            @
            {this.props.badgeInfo.twitter
              ? this.props.badgeInfo.twitter
              : "su_twitter"}
          </div>
        </div>

        <div className="Badge__footer">#platziconf</div>
      </div>
    );
  }
}

export default Badge;
