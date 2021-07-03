import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import { openPopover } from '../../store/actions/app.actions'
import { connect } from 'react-redux'
function _BackToPrevPopover({ popoverName, openPopover }) {

    function onOpenPopover(ev, popoverName) {
        const elPos = ev.target.getBoundingClientRect()
        const props = {}
        openPopover(popoverName, elPos, props)
    }

    return <span className="back" onClick={ev => onOpenPopover(ev, popoverName)}>
        <ArrowBackIcon />
    </span>
}

const mapDispatchToProps = {
    openPopover,

}

export const BackToPrevPopover = connect(null, mapDispatchToProps)(_BackToPrevPopover)

