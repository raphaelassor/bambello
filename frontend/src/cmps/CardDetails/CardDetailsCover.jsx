import VideoLabelIcon from '@material-ui/icons/VideoLabel'

export function CardDetailsCover({ style, openPopover, card }) {

    const onOpenPopover = (ev, type) => {
        ev.preventDefault();
        const elPos = ev.target.getBoundingClientRect()
        const props = { card }
        openPopover(type, elPos, props)
    }

    const getBackground = () => {
        const { bgColor, bgImgUrl } = style
        const background = bgColor ? { background: bgColor } : { backgroundImage: `url(${bgImgUrl})` }
        return background
    }

    return (
        <div className={`card-details-cover ${style.bgImgUrl ? 'img' : ''}`} style={getBackground()}>
            < button className="cover-menu-btn" onClick={(ev) => onOpenPopover(ev, 'COVER')
            }> <VideoLabelIcon />Cover</button >
        </div >
    )
}