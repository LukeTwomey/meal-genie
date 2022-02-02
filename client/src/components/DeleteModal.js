import React from "react";
import { connect } from "react-redux";
import { toggleDeleteModal } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
import "./DeleteModal.css";

const DeleteModal = ({
  toggleDeleteModal,
  show
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="modal-contents">
          <h1>Delete Recipe</h1>
          <div
            className="button"
            onClick={() => {
              toggleDeleteModal(null);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <p>Are you sure you want to delete this recipe?</p>
          <div
            className="button"
            onClick={() => {
              toggleDeleteModal(null);
            }}
          >
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: Object.values(state.recipes),
    show: state.deleteModal.show,
  };
};

export default connect(mapStateToProps, {
  toggleDeleteModal
})(DeleteModal);
