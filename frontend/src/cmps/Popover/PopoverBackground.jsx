import { Popover } from './Popover'
import { connect } from 'react-redux'
import { onSaveBoard } from '../../store/actions/board.actions'
import { ColorPalette } from '../ColorPalette'
import { ImagePalette } from '../ImagePalette'
import { BackToPrevPopover } from "./BackToPrevPopover"

function _PopoverBackground({ onSaveBoard, board }) {

    function handleChange({ target }) {
        const { name, value } = target
        if (name === 'imgUrl') {
            board.style.background = `url(${value})`
        } else board.style.background = value;
        onSaveBoard(board)
    }
    return <Popover title="Change background" displayMode="menu-popovers">
        <BackToPrevPopover popoverName="MENU" />
        <div className="pop-over-backround-details">
            <div>
                <h4>Colors</h4>
                <ColorPalette handleChange={handleChange} selectedColor={board.background} />
            </div>
            <div>
                <h4>Gradients</h4>
                <ColorPalette handleChange={handleChange} selectedColor={board.background} isGradient={true} />
            </div>
            <div>
                <h4>Images</h4>
                <ImagePalette handleChange={handleChange} />
            </div>
        </div>
    </Popover>

}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    onSaveBoard,

}


export const PopoverBackground = connect(mapStateToProps, mapDispatchToProps)(_PopoverBackground)