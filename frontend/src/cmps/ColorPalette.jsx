import CheckIcon from '@material-ui/icons/Check';
// import { styles } from '@material-ui/pickers/views/Calendar/Calendar';

export function ColorPalette({ handleChange, selectedColor, isGradient, isColor, count }) {

    const colorCodes = [
        '#60bd4f',
        '#f2d600',
        '#ff9e1a',
        '#eb5a46',
        '#c277e0',
        '#0279bf',
        '#52e898',
        '#ff78cb',
        '#334563',
        '#b3bac5',

    ]
    
    const gradientStyles = [
        'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
        'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
        'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
        ' linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
        'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
        'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
    ]

    function getStyles() {
        const styles = isGradient ? gradientStyles : colorCodes
        return count ? styles.slice(0, count) : styles
    }

    return <div className="color-palette">
        {getStyles().map(colorCode => {
            return <label key={colorCode} className="flex align-center justify-center" style={{ background: colorCode }} name="label-color" htmlFor={`color-${colorCode}`}>
                <input type="radio" name="color" id={`color-${colorCode}`} value={colorCode} onClick={handleChange} />
                {selectedColor === colorCode && <CheckIcon key={colorCode} style={{ width: '16px', height: '16px', color: 'white' }} />}
            </label>
        })}
    </div>
}