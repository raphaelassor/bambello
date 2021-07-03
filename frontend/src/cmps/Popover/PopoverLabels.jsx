import { Component } from "react"
import { PopoverLabelPreview } from "./PopoverLabelPreview"
import { Popover } from './Popover'
import { PopoverLabelEdit } from "./PopoverLabelEdit"
import { onSaveBoard } from "../../store/actions/board.actions";
import { connect } from 'react-redux'
import { boardService } from '../../services/board.service'
import { utilsService } from "../../services/utils.service";

class _PopoverLabels extends Component {

    state = {
        inputTxt: '',
        presentedLabels: '',
        labelToEdit: null,
        isEditMode: false,
    }

    componentDidMount() {
        this.setState({ presentedLabels: this.props.board.labels })

    }

    handleChange = ({ target }) => {
        this.setState({ inputTxt: target.value })
    }

    get presentedLabels() {
        const filterRegex = new RegExp(this.state.inputTxt, 'i')
        return this.props.board.labels.filter(label => filterRegex.test(label.title))
    }

    toggleLabel = (label) => {
        const { card, onSaveBoard, board } = this.props
        const idx = card.labelIds.findIndex(labelId => labelId === label.id)
        if (idx === -1) card.labelIds.push(label.id)
        else card.labelIds.splice(idx, 1)
        const updatedBoard = boardService.updateCardInBoard(board, card)
        onSaveBoard(updatedBoard)
    }

    saveLabel = (labelToSave) => {
        const { board, onSaveBoard } = this.props
        if (labelToSave.id) {
            const idx = board.labels.findIndex(label => label.id === labelToSave.id)
            board.labels.splice(idx, 1, labelToSave)
        }
        else {
            labelToSave.id = utilsService.makeId()
            board.labels.push(labelToSave)
        }
        onSaveBoard(board)
    }

    removeLabel = (labelToRemove) => {
        const { board, onSaveBoard } = this.props
        const idx = board.labels.findIndex(label => label.id === labelToRemove.id)
        board.labels.splice(idx, 1)
        onSaveBoard(board)
    }

    toggleEditMode = (label = null) => {
        this.setState({ isEditMode: !this.state.isEditMode, labelToEdit: label })
    }

    isLabelInCard = (label) => {
        return this.props.card.labelIds.some(labelId => labelId === label.id)
    }
    render() {
        const { presentedLabels, inputTxt, isEditMode, labelToEdit } = this.state
        if (!presentedLabels) return '';
        return (<>
            {isEditMode ?
                <PopoverLabelEdit removeLabel={this.removeLabel}
                    labelToEdit={labelToEdit} saveLabel={this.saveLabel} toggleEditMode={this.toggleEditMode} />
                :
                <Popover title={"Labels"} >
                    <div className="labels-pop-over">
                        <input className="pop-over-input" type="text" value={inputTxt}
                            onChange={this.handleChange} placeholder={"Search Labels"} />
                        <h4>LABELS</h4>
                        <ul className="clean-list">

                            {this.presentedLabels.map(label => <PopoverLabelPreview key={label.id} label={label}
                                toggleLabel={this.toggleLabel} isSelected={this.isLabelInCard(label)}
                                toggleEditMode={this.toggleEditMode} />)}
                        </ul>
                        <button className="secondary-btn" onClick={this.toggleEditMode}>Create a new label</button>
                    </div>
                </Popover>
            }
        </>
        )
    }

}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    onSaveBoard
}


export const PopoverLabels = connect(mapStateToProps, mapDispatchToProps)(_PopoverLabels)
