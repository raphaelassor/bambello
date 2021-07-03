import {connect} from 'react-redux'
import { ActivitiesList } from '../ActivitiesList'
import {Popover} from './Popover'

function _PopoverNotifcs ({loggedInUser,board}){

    function getNotifcsActivities(){
        if(!loggedInUser)return
        const sortedActivities = board.activities.sort((a, b) => b.createdAt - a.createdAt)
        const userNotifics=sortedActivities.reduce((acc,activity)=>{
            if(activity.card?.members){
                activity.card.members.forEach(member=>{
                    if(loggedInUser._id===member._id&&loggedInUser._id!==activity.byMember._id){
                        acc.push(activity)
                    }
                })
            }
            return acc
        },[])
        return userNotifics.slice(0,15)
    }

    const notifcsActivities=getNotifcsActivities()

    return <Popover title="Notifications">
        <div className="user-notifics">
            <ActivitiesList activities={notifcsActivities} isGeneral={true}/>
            {!notifcsActivities&& <p> No notifications to present...</p> }
        </div>
    </Popover>
}

function mapStateToProps(state){
    return {
        loggedInUser:state.appModule.loggedInUser,
        board:state.boardModule.board
    }
}

export const PopoverNotifics = connect(mapStateToProps,null)(_PopoverNotifcs)