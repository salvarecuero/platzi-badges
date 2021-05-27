import React from "react";
import { Link } from "react-router-dom";

import "./styles/BadgesList.css";

class BadgesListItem extends React.Component {
  render() {
    return (
      <div className="BadgesListItem">
        <img
          src={this.props.badge.avatarUrl}
          alt="Avatar de la persona."
          className="BadgesListItem__avatar"
        />
        <div>
          <div>
            <strong>
              {this.props.badge.firstName} {this.props.badge.lastName}
            </strong>
          </div>
          <div className="Twitter__name">
            <a href={`https://www.twitter.com/${this.props.badge.twitter}`}>
              <i className="Twitter__logo"></i>@{this.props.badge.twitter}
            </a>
          </div>
          <div>{this.props.badge.jobTitle}</div>
        </div>
      </div>
    );
  }
}

function useSearchBadges(badges) {
  const [query, setQuery] = React.useState("");
  const [filteredBadges, setFilteredBadges] = React.useState(badges);

  React.useMemo(() => {
    const result = badges.filter((badge) => {
      return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setFilteredBadges(result);
  }, [badges, query]);

  return { query, setQuery, filteredBadges };
}

function BadgesList(props) {
  const badges = props.badges;

  const { query, setQuery, filteredBadges } = useSearchBadges(badges);

  if (filteredBadges.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filter badges</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>

        <h3>No badges were found</h3>
        <Link className="btn btn-primary" to="/badges/new">
          Create new badge
        </Link>
      </div>
    );
  }

  return (
    <div className="BadgesList">
      <div className="form-group">
        <label>Filter badges</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <ul className="list-unstyled BadgesList">
        {filteredBadges.map((badge) => {
          return (
            <li key={badge.id}>
              <Link
                to={`/badges/${badge.id}`}
                className="text-reset text-decoration-none"
              >
                <BadgesListItem badge={badge} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BadgesList;
