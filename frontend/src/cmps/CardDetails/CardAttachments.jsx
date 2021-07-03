import React from 'react';
import Moment from 'react-moment';
import { ReactComponent as PaperClipIcon } from '../../assets/img/icons/paperclip-solid.svg'


export function CardAttachments({ attachs, onDeleteCardAttachment, card, openPopover }) {

    const onOpenPopover = (ev, type) => {
        ev.preventDefault();
        let elPos;
        let props;
        elPos = ev.target.getBoundingClientRect()
        props = { card }
        openPopover(type, elPos, props)
    }

    return (
        <div className="card-attachments">
            <div className="window-modal-title flex align-center">
                <PaperClipIcon />
                <h3>Attachments</h3>
            </div>
            <div className="attachments-container">
                {attachs.map(attach => {
                    return <a key={attach.id} target="_blank"
                        rel="noreferrer" href={attach.url} className="clean-link">
                        <div className="attach-preview flex">
                            <div className="img-container">
                                <img src={attach.url} alt="" />
                            </div>
                            <div className="attach-content flex column full">
                                <span className="file-name">{attach.fileName} </span>
                                <div className="time-n-actions flex wrap align-center ">
                                    <Moment fromNow>{attach.createdAt}</Moment>
                                    <span>-</span>
                                    <button
                                        onClick={(ev) => onDeleteCardAttachment(ev, attach.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </a>
                })}
            </div>
            <button className="secondary-btn"
                onClick={(ev) => onOpenPopover(ev, 'ATTACH')}>Add an attachment</button>
        </div>
    )
}