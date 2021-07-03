//TODO: // import CloseIcon from '@material-ui/icons/Close';


export function ScreenOverlay({ goBack = null, styleMode, children }) {

    return (
        <div className="screen-overlay-wrapper">
            <div className={`screen-overlay ${styleMode}`} onClick={() => {
                if (goBack) goBack()
                return
            }}></div>
            {children}
        </div>
    )
}