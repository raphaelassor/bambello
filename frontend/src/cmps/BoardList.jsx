
import { Link } from 'react-router-dom'
export function BoardList({ boards, onToggleFavorite }) {
    return (
        <div className="board-list">
            {boards.map(board => {
                return <Link key={board._id} className="clean-link" to={`/board/${board._id}`}>
                    <div className="board-preview"
                        style={{ background: `${board.style.background} center center / cover` }}>
                        <div className="board-preview-details">
                            <h3>{board.title.length > 20 ? board.title.substring(0, 20) + '...' : board.title}</h3>
                            <span className={`far fa-star ${board.isFavorite ? 'favorite' : ''}`}
                                onClick={(ev) => onToggleFavorite(ev, board._id)}>
                            </span>
                        </div>
                    </div>
                </Link >
            })}
        </div>
    )
}