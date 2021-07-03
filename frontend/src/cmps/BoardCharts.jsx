
import React, { Component } from 'react'
import { Bar, defaults, } from 'react-chartjs-2'



export class BoardCharts extends Component {

    state = {
        gradientColor: '',
    }

    componentDidMount() {
        defaults.font.size = 16
        defaults.color = '#fff'
        defaults.plugins.legend.display = false
        setTimeout(() => this.setState({ gradientColor: this.getGradientColor() }), 50)
    }

    get cardsPerMemberData() {
        const { cardsPerMemberMap } = this.props.chartsData
        return {
            labels: Object.keys(cardsPerMemberMap),
            datasets: [
                {
                    data: Object.values(cardsPerMemberMap),
                    backgroundColor: this.state.gradientColor,
                    barThickness: 20
                }
            ]
        }
    }


    get cardsPerLabelData() {
        const { cardsPerLabelMap } = this.props.chartsData
        let labels = [];
        let values = [];
        const sortedLabels = Object.entries(cardsPerLabelMap).sort((labelA, labelB) => labelB[1].count - labelA[1].count).slice(0, 5)
        sortedLabels.forEach(label => {
            labels.push(label[0])
            values.push(label[1].count)
        })
        
        return {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: this.state.gradientColor,
                    barThickness: 20,
                    borderWidth: 0,

                },
            ],
        }
    }


    get cardsPerListData() {
        const { cardsPerListMap } = this.props.chartsData
        return {
            labels: Object.keys(cardsPerListMap),
            datasets: [
                {
                    data: Object.values(cardsPerListMap),
                    backgroundColor: this.state.gradientColor,
                    borderWidth: 0,
                    barThickness: 20
                },
            ],
        }
    }

    getGradientColor(canvas = this.canvas) {
        if (!canvas) return
        const ctx = canvas.getContext("2d");
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 300, 0)
        gradient.addColorStop(0, '#4fa8f8');
        gradient.addColorStop(0.3, '#2fb4f5');
        gradient.addColorStop(0.6, '#23beee');
        gradient.addColorStop(0.85, '#37c7e5');
        gradient.addColorStop(1, '#55ceda');
        return gradient


        // #4fa8f8, #2fb4f5, #23beee, #37c7e5, #55ceda);
    }
    render() {

        return (
            <div className="board-charts flex wrap justify-center align-center">
                <div className=" flex column">
                    <h3>Tasks per label</h3>
                    <div className="chart">
                        <Bar
                            data={this.cardsPerLabelData}
                            options={{
                                maintainAspectRatio: false,

                                title: {
                                    display: true,
                                    text: 'Tasks per label',
                                },
                                legend: {
                                    display: false,
                                },
                                cutout: '60%',
                            }}
                            ref={(canvas) => { this.canvas = canvas }}
                        />
                    </div>
                </div>
                <div className="flex column">
                    <h3>Tasks per member</h3>
                    <div className="chart">
                        <Bar
                            data={this.cardsPerMemberData}
                            options={{
                                indexAxis: 'y',
                                maintainAspectRatio: false,
                                legend: {
                                    labels: {
                                        // This more specific font property overrides the global property
                                        fontColor: 'black'
                                    }
                                }
                            }
                            }


                        />
                    </div>
                </div>
                <div className="flex column">
                    <h3>Tasks per list</h3>
                    <div className="chart">
                        <Bar
                            data={this.cardsPerListData}
                            options={{
                                indexAxis: 'y',
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

