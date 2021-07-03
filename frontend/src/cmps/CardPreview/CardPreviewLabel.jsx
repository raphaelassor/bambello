
import { Component } from 'react'
import { connect } from 'react-redux'
import { togglePreviewLabels, setPreviewLabelClassName } from '../../store/actions/board.actions'

class _CardPreviewLabel extends Component {

    get label() {
        const { labelId, labels } = this.props
        const label = labels.find(label => {
            return label.id === labelId
        })
        if (!label) return ''
        return label
    }

    onTogglePreviewLabels = (ev) => {
        ev.preventDefault();
        if (this.props.isArchived) return
        const { isPreviewLabelsOpen, setPreviewLabelClassName } = this.props
        setPreviewLabelClassName(isPreviewLabelsOpen ? 'close-anim' : 'open-anim')
        setTimeout(() => { setPreviewLabelClassName('') }, 1000)

        if (!this.props.isPreview) this.props.togglePreviewLabels()
    }

    render() {
        const { isPreviewLabelsOpen, previewLabelClassName } = this.props
        const label = this.label

        return (
            <div className={`card-preview-label ${isPreviewLabelsOpen ? 'open' : 'close'} ${previewLabelClassName}`} style={{ backgroundColor: label.color }}
                onClick={this.onTogglePreviewLabels}>
                <span className={`label-text ${isPreviewLabelsOpen ? 'open' : ''}`}>{label.title}</span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isPreviewLabelsOpen: state.boardModule.isPreviewLabelsOpen,
        previewLabelClassName: state.boardModule.previewLabelClassName,
    }
}

const mapDispatchToProps = {
    togglePreviewLabels,
    setPreviewLabelClassName
}

export const CardPreviewLabel = connect(mapStateToProps, mapDispatchToProps)(_CardPreviewLabel)