import React, { Component } from 'react';
import SubjectIcon from '@material-ui/icons/Subject';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { TextareaAutosize } from '@material-ui/core';



export class CardDescription extends Component {

    state = {
        description: '',
        isInputSelected: false,
    }

    componentDidMount() {
        const { description } = this.props
        this.setState({ description })
    }

    handleChange = ({ target: { value } }) => {
        this.setState({ description: value })
    }

    onEditClicked = () => {
        this.selectedInput.focus()
        this.setState({ isInputSelected: true }, () => {
            this.selectedInput.focus()
        })
    }

    onSaveDescription = () => {
        const { description } = this.state
        this.setState({ isInputSelected: false }, () => {
            this.props.onSaveCardDescription(description)
        })
    }

    render() {
        let { description, isInputSelected } = this.state
        return (<div className="card-description flex column">
            <div className="window-modal-title flex align-center">
                <SubjectIcon />
                <h3>Description</h3>
                <button className={`secondary-btn ${!description || isInputSelected ? 'hidden' : 'show'}`}
                    onClick={() => this.onEditClicked()}>
                    Edit
                     </button>
            </div>
            <div className="card-description-edit flex column">
                <TextareaAutosize
                    className={!description ? 'placeholder-mode' : ''}
                    onFocus={() => this.onEditClicked()}
                    ref={(input) => { this.selectedInput = input; }}
                    onBlur={() => this.onSaveDescription()}
                    value={description} placeholder="Add a more detailed description..."
                    onChange={this.handleChange} aria-label="empty textarea" />
                <div className={`description-controls flex align-center ${isInputSelected ? 'show' : 'hidden'}`}>
                    <button className="primary-btn" onClick={() => this.onSaveDescription()}>Save</button>
                    <CloseRoundedIcon className="close-svg" />
                </div>
            </div>
        </div>)
    }
}