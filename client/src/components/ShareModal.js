import React from 'react';
import { connect } from 'react-redux';
import { toggleShareModal } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import './ShareModal.css';

const ShareModal = ({ toggleShareModal, show }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main shareModal">
                <div className="modal-contents">
                    <div className='button' onClick={() => { toggleShareModal(null) }}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>

                    <h1>Share Meal Plan</h1>
                    <p>To email a copy of the meal plan, enter the email address in the field below and click "Send"</p>

                    <form onSubmit={() => {console.log("hey")}}>
                        <input name="Email Address" type='text'/>
                        <div className="formButtons">
                            <input type="button" value="Cancel" onClick={() => { toggleShareModal(null) }}/>
                            <input type="submit" value="Send" />
                        </div>
                    </form>

                    
                </div>
            </section>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.shareModal.show
    };
}

export default connect(mapStateToProps, { toggleShareModal })(ShareModal);