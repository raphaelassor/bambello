import React from 'react'

export function CardPreviewComments({ commentsCount }) {
    return (
        <div className="card-preview-comments">
            <div className="comment-icon"></div>
            <span>{commentsCount}</span>
        </div>
    )
}
