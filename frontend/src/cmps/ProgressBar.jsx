import { Component } from "react";


export class ProgressBar extends Component {

    state = {
        fillerStyles: {
            width: `0%`,
        },
        bgColor: {
            activeColor: "#5ca4cf",
            doneColor: "#60bd4f",
        },
        completed: 0
    }

    componentDidMount() {
        const { completed } = this.props;
        this.setState({ completed, fillerStyles: { width: `${completed}%` } });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.completed !== this.props.completed) {
            const { completed } = this.props;
            this.setState({ completed, fillerStyles: { width: `${completed}%` } });
        }
    }

    get bgColor() {
        const { completed, bgColor } = this.state;
        if (completed === 100) return bgColor.doneColor
        return bgColor.activeColor
    }

    render() {
        const { completed, fillerStyles: { width } } = this.state;
        const finished = (completed === 100) ? { borderTopRightRadius: '5em', borderBottomRightRadius: '5em' } : ''
        return (
            <div className="progress flex align-center">
                <span className="precent">
                    {completed}%
        </span>
                <div className="progress-bar-container ">
                    <div className="progress-bar" style={{ width, backgroundColor: this.bgColor, ...finished }}>
                    </div>
                </div>
            </div >
        )
    }

}