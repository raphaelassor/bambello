import { ReactComponent as AddIcon } from '../../assets/img/icons/add.svg'

export function CardDetailsLabels({ labels, openPopover, card }) {

    const onOpenPopover = (ev, type) => {
        ev.preventDefault();
        const elPos = ev.target.getBoundingClientRect()
        const props = { card }
        openPopover(type, elPos, props)
    }

    return (
        <div className="card-details-labels item-container flex column align-flex-end">
            <h3 className="card-details-item-header">Labels</h3>
            <div className="labels-container flex wrap">
                {labels.map(label => {
                    return <span
                        onClick={(ev) => onOpenPopover(ev, 'LABELS')} key={label.id} className="label" style={{ backgroundColor: label.color }}>
                        {label.title}
                    </span>
                })}
                <button className="secondary-btn"
                    onClick={(ev) => onOpenPopover(ev, 'LABELS')} ><AddIcon /></button>
            </div>
        </div>
    )
}