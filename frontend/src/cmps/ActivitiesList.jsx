import { ActivityPreview } from './ActivityPreview'
export function ActivitiesList({ activities, isGeneral}) {
   
    const sortedActivities = activities.slice(0,20)
    
    return (
        <div className="activities-list">
            {sortedActivities.map(activity => {
                return <ActivityPreview key={activity.id} activity={activity} isGeneral={isGeneral} />
            })}
        </div>
    )
} 