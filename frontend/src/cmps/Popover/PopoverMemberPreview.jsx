import CheckIcon from '@material-ui/icons/Check';
import { ProfileAvatar } from '../ProfileAvatar';

export function PopoverMemberPreview({ member, toggleMember, isSelected }) {
    return <li onClick={() => toggleMember(member, 'members')} className="member-pop-over-preview flex">
        <ProfileAvatar member={member} size={32} />
        <span>{member.fullname}</span>
        {isSelected && <span className="icon-check" ><CheckIcon style={{ width: '16px' }} /></span>}
    </li>
}