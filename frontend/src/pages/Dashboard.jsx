import React, { Component } from 'react'
import { connect } from 'react-redux'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { ScreenOverlay } from '../cmps/ScreenOverlay'
import AssignmentIcon from '@material-ui/icons/Assignment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { ReactComponent as ExclamationIcon } from '../assets/img/icons/exclamation-lg.svg'
import { ReactComponent as ChartIcon } from '../assets/img/icons/chart.svg'
import { BoardCharts } from '../cmps/BoardCharts'
import { CircularProgressbar } from 'react-circular-progressbar';
import { Loader } from '../cmps/Loader'
import 'react-circular-progressbar/dist/styles.css';

class _Dashboard extends Component {

    state = {
        chartsData: null
    }

    componentDidMount() {
        const cardsPerMemberMap = this.cardsPerMemberMap
        const cardsPerLabelMap = this.cardsPerLabelMap
        const cardsPerListMap = this.cardsPerListMap
        this.setState({ chartsData: { cardsPerMemberMap, cardsPerLabelMap, cardsPerListMap } })
    }

    get allCards() {
        const { lists } = this.props.board
        return lists.reduce((acc, list) => {
            acc = acc.concat(list.cards)
            return acc
        }, [])
    }

    get cardsCount() {
        const { lists } = this.props.board
        const cardsCount = lists.reduce((acc, list) => {
            acc += list.cards.length
            return acc
        }, 0)
        return cardsCount
    }

    get overdueCardsCount() {
        const { lists } = this.props.board
        const overdueCardsCount = lists.reduce((acc, list) => {
            const overdueCardsCountPerList = list.cards.reduce((acc, card) => {
                if (card.dueDate < Date.now() && card.dueDate && !card.isDone) acc++
                return acc
            }, 0)
            acc += overdueCardsCountPerList
            return acc
        }, 0)
        return overdueCardsCount
    }

    get dueSoonCardsCount() {
        const { lists } = this.props.board
        const dueSoonCardsCount = lists.reduce((acc, list) => {
            const dueSoonCardsCountPerList = list.cards.reduce((acc, card) => {
                if (card.dueDate && Date.now() <= card.dueDate) {
                    const timeDiff = card.dueDate - Date.now()
                    if ((timeDiff < 86400000) && card.dueDate) acc++
                }
                return acc
            }, 0)
            acc += dueSoonCardsCountPerList
            return acc
        }, 0)
        return dueSoonCardsCount
    }

    get cardsPerMemberMap() {
        const { members } = this.props.board
        const allCards = this.allCards
        const cardsPerMemberMap = members.reduce((acc, member) => {
            if (!acc[member.fullname]) acc[member.fullname] = 0
            const cardsPerMemberCount = allCards.reduce((acc, card) => {
                const memberIdx = card.members.findIndex(currMember => currMember._id === member._id)
                if (memberIdx > -1 && !card.isDone) acc++
                return acc
            }, 0)
            acc[member.fullname] = cardsPerMemberCount
            return acc
        }, {})
        return cardsPerMemberMap
    }

    get cardsPerLabelMap() {
        const { labels } = this.props.board
        const allCards = this.allCards
        const cardsPerLabelMap = labels.reduce((acc, label) => {
            if (!acc[label.title]) acc[label.title] = { count: 0 }
            const cardsPerLabelCount = allCards.reduce((acc, card) => {
                const labelIdx = card.labelIds.findIndex(currLabelId => currLabelId === label.id)
                if (labelIdx > -1 && !card.isDone) acc++
                return acc
            }, 0)
            acc[label.title].count = cardsPerLabelCount
            return acc
        }, {})
        return cardsPerLabelMap


    }

    get cardsPerListMap() {
        const { lists } = this.props.board
        const cardsPerListMap = lists.reduce((acc, list) => {
            if (!acc[list.title]) acc[list.title] = 0
            acc[list.title] = list.cards.length
            return acc
        }, {})
        return cardsPerListMap
    }

    get progressCircleStyle() {
        return {
            path: {
                stroke: ` #2fb4f5`,
                transition: 'stroke-dashoffset 0.5s ease 0s',
                transformOrigin: 'center center',
            },
            trail: {
                stroke: '#ffffff',
                strokeLinecap: 'butt',
                transform: 'rotate(0.25turn)',
                transformOrigin: 'center center',
            },
            text: {
                fill: '#ffffff',
                fontSize: '25px',

            },
        }
    }
    get dueSoonPercentage() {
        return +((this.dueSoonCardsCount / this.cardsCount * 100).toFixed(1))
    }
    get overduePercentage() {

        return +((this.overdueCardsCount / this.cardsCount * 100).toFixed(1))
    }

    goBackToBoard = () => {
        const { board } = this.props
        this.props.history.push(`/board/${board._id}`)
    }

    render() {
        const { chartsData } = this.state
        if (!chartsData) return <Loader />
        return (
            <>
                <ScreenOverlay styleMode="heavy-dark" />
                <section className="dashboard-container flex column">
                    <CloseRoundedIcon className="close-svg" onClick={() => this.goBackToBoard()} />
                    <div className="general-statistics flex justify-center wrap">

                        <div className="stats flex justify-space-between  ">
                            <div className="content flex  column justify-space-between">

                                <h3 className="flex align-center"><AssignmentIcon />All Tasks </h3>
                                <h4>{this.cardsCount}</h4>
                            </div>
                            <ChartIcon />
                        </div>

                        <div className="stats flex justify-space-between  ">
                            <div className="content flex  column justify-space-between">
                                <h3 className="flex align-center">  <QueryBuilderIcon /> Due Soon  </h3>
                                <h4>{this.dueSoonCardsCount}</h4>
                            </div>
                            <CircularProgressbar value={this.dueSoonPercentage} text={`${this.dueSoonPercentage}%`}
                                styles={this.progressCircleStyle} />
                        </div>

                        <div className="stats flex justify-space-between  ">
                            <div className="content flex  column justify-space-between">

                                <h3 className="flex align-center"><ExclamationIcon />Overdue </h3>
                                <h4>{this.overdueCardsCount}</h4>
                            </div>
                            <CircularProgressbar value={this.overduePercentage} text={`${this.overduePercentage}%`}
                                styles={this.progressCircleStyle} />
                        </div>
                    </div>
                    <BoardCharts chartsData={chartsData} />
                </section>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

export const Dashboard = connect(mapStateToProps, null)(_Dashboard)
