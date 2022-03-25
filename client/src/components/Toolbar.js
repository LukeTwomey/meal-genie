import React from "react";
import { connect } from "react-redux";
import { toggleMealLock, toggleSearchModal } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLockOpenAlt,
  faLockAlt,
  faSearch,
} from "@fortawesome/pro-solid-svg-icons";
import "./Toolbar.css";

const Toolbar = (props) => {
  const { arrayIndex, locked, toggleMealLock, toggleSearchModal } = props;

  return (
    <div className="toolbar">
      <div
        className="button"
        onClick={() => {
          toggleMealLock(arrayIndex);
        }}
      >
        {locked === false || locked === undefined ? (
          <FontAwesomeIcon icon={faLockOpenAlt} />
        ) : (
          <FontAwesomeIcon icon={faLockAlt} />
        )}
      </div>
      {/* <div
        className="button"
        onClick={() => {
          toggleSearchModal(arrayIndex);
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </div> */}
    </div>
  );
};

export default connect(null, { toggleMealLock, toggleSearchModal })(Toolbar);
