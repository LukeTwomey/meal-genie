import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { toggleShareModal } from '../actions';
import './ShareModal.css';

class ShareModal extends Component {

    state = {
        emailAddress: '',
    }

    resetForm = () => {
        this.setState({ emailAddress: '' });
        this.props.toggleShareModal(null);
    }

    handleChange = e => {
        this.setState({ emailAddress: e.target.value });
    };
    
    handleSubmit = async e => {
        e.preventDefault();
        this.resetForm();
        const { recipes } = this.props.mealPlan
        const weekdays = [{day: 'Monday'}, {day: 'Tuesday'}, {day: 'Wednesday'}, {day: 'Thursday'}, {day: 'Friday'}, {day: 'Saturday'}, {day: 'Sunday'}];
        const mealPlan = weekdays.map((day, i) => ({...day, recipe: recipes[i].name}));
        const formData = {
            emailAddress: this.state.emailAddress,
            mealPlan: mealPlan
        };
        const res = await axios.post('/api/shareMealPlan', formData);
        console.log(res.data);
    };
    
    render() {
        const { toggleShareModal, show } = this.props
        const showHideClassName = show ? 'modal display-block' : 'modal display-none';
        return (
            <div className={showHideClassName}>
            <section className="modal-main shareModal">
                <div className="modal-contents">
                <div className="button" onClick={() => { toggleShareModal(null); }}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>

                <h1>Share Meal Plan</h1>
                <p>To email a copy of the meal plan, enter the email address in the field below and click "Send"</p>

                <form onSubmit={this.handleSubmit}>
                    <input name="Email Address" type="text" onChange={this.handleChange} value={this.state.emailAddress}/>
                    <div className="formButtons">
                    <input type="button" value="Cancel" onClick={() => { toggleShareModal(null); }} />
                    <input type="submit" value="Send" />
                    </div>
                </form>


                </div>
            </section>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return { 
        mealPlan: state.mealPlan,
        show: state.shareModal.show,
    };
}


export default connect(mapStateToProps, { toggleShareModal })(ShareModal);
