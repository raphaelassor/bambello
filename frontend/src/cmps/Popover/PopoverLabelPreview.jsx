import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';

export function PopoverLabelPreview({ label, toggleLabel, isSelected, toggleEditMode, isFilterPreview }) {
    return <li className="flex">
        {!isFilterPreview ?
            <>
                <div style={{ backgroundColor: label.color, color: 'white' }} name="label"
                    onClick={() => toggleLabel(label, 'labels')}
                    className="label-pop-over-preview flex justify-space-between">
                    <span>{label.title}</span>
                    {isSelected && <span className="icon-check" >
                        <CheckIcon style={{ width: '16px', height: '16px', color: 'white' }} />
                    </span>}
                </div>
                <div className="flex align-center justify-center">
                    <EditIcon style={{ width: '16px', height: '16px', color: '#42526e' }}
                        onClick={() => toggleEditMode(label)} />
                </div>
            </>
            :
            <div className="filter-label-preview flex align-center"
                onClick={() => toggleLabel(label, 'labels')}>
                <span className="filter-label-color" style={{ backgroundColor: label.color }} ></span>
                <span className="">{label.title}</span>
                {isSelected && <i className="icon-check" ><CheckIcon /> </i>}
            </div>
        }
    </li>
}