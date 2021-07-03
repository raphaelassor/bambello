import { connect } from 'react-redux'
import { PopoverMembers } from "./PopoverMembers";
import { PopoverLabels } from "./PopoverLabels";
import { PopoverCover } from "./PopoverCover";
import { PopoverDate } from "./PopoverDate";
import { PopoverAttach } from "./PopoverAttach";
import { PopoverChecklist } from "./PopoverChecklist";
import { PopoverMoveCopy } from './PopoverMoveCopy';
import { PopoverProfile } from './PopoverProfile';
import { PopoverInvite } from "./PopoverInvite";
import { PopoverMenu } from './PopoverMenu';
import { PopoverBackground } from './PopoverBackground';
import { PopoverArchive } from './PopoverArchive';
import { PopoverActivity } from './PopoverActivity';
import { PopoverBoardFilter } from './PopoverBoardFilter';
import { PopoverCreateBoard } from './PopoverCreateBoard';
import { PopoverListMenu } from './PopoverListMenu';
import { PopoverNotifics } from './PopoverNotifics';
import { PopoverBoardsSearch } from './PopoverBoardsSearch';

function _DynamicPopover({ currPopover }) {
    
    const { name, props } = currPopover

    switch (name) {
        case 'MEMBERS': return <PopoverMembers {...props} />;
        case 'LABELS': return <PopoverLabels {...props} />;
        case 'COVER': return <PopoverCover {...props} />;
        case 'DATE': return <PopoverDate {...props} />;
        case 'COPY': return <PopoverMoveCopy popoverType="copy" {...props} />;
        case 'MOVE': return <PopoverMoveCopy popoverType="move" {...props} />;
        case 'ATTACH': return <PopoverAttach {...props} />;
        case 'CHECKLIST': return <PopoverChecklist {...props} />;
        case 'PROFILE': return <PopoverProfile {...props} />
        case 'INVITE': return <PopoverInvite {...props} />
        case 'MENU': return <PopoverMenu {...props} />
        case 'BACKGROUND': return <PopoverBackground {...props} />
        case 'ARCHIVE': return <PopoverArchive {...props} />
        case 'ACTIVITY': return <PopoverActivity {...props} />
        case 'BOARD_FILTER': return <PopoverBoardFilter {...props} />
        case 'CREATE_BOARD': return <PopoverCreateBoard {...props} />
        case 'LIST_MENU': return <PopoverListMenu {...props} />
        case 'NOTIFICATIONS': return <PopoverNotifics {...props} />
        case 'BOARDS_SEARCH': return <PopoverBoardsSearch {...props} />
        default: return '';
    }
}

function mapStateToProps(state) {
    return {
        isOverlayOpen: state.appModule.isOverlayOpen,
        currPopover: state.appModule.currPopover
    }
}

export const DynamicPopover = connect(mapStateToProps, null)(_DynamicPopover)