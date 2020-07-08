import React, { Component } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import axios from 'axios';

class UserData extends Component {
	constructor() {
		super();
		this.state = {
			allDreams: [],
			dreams: [],
			lucidDreams: [],
			goals: [],
			chartData: null
		};
	}
	userData() {
		const { dreams, lucidDreams } = this.state;
		this.setState({
			chartData: {
				labels: [ 'Dreams', 'Lucid Dreams' ],
				datasets: [
					{
						label: 'Dream Progress',
						backgroundColor: [ 'rgba(75, 192, 192, 0.6)', 'rgba(192, 192, 75, 10)' ],
						data: [ dreams.length, lucidDreams.length ]
					}
				]
			}
		});
	}
	dreamSort() {
		const { allDreams } = this.state;
        let lucid = [];
        let dreams = [];
		allDreams.forEach((dream) => {
			if (dream.lucid) {
				lucid.push(dream);
				console.log(lucid);
			} else {
				dreams.push(dream);
				console.log(dreams);
			}
		});
		console.log(this.state.lucidDreams);
		this.setState({
			lucidDreams: lucid,
			dreams: dreams
		});
	}
	componentDidMount() {
		axios
			.get('/api/user_entries')
			.then((res) => {
				this.setState({ allDreams: res.data });
				this.dreamSort();
				this.userData();
				console.log(this.state.allDreams);
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { chartData } = this.state;

		return (
			<div className="userData">
				{chartData ? (
					<div className="charts">
						<Doughnut
							data={chartData}
							options={{
								title: {
									display: true,
									text: 'Lucid Dreams to Dreams Ratio',
									fontSize: 20,
									maintainAspectRatio: false
								},
								legend: {
									display: true,
									position: 'top'
								}
							}}
						/>
					</div>
				) : null}
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(UserData);
