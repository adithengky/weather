import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';
import swal from 'sweetalert';

class WeatherList extends Component {

	constructor(props) {
		super(props);
	}

	componentWillUpdate(props, state) {
		if(props.weather[0].status && props.weather[0].status != 200) {
			swal({   
				title: 'ERROR', 
				text: props.weather[0].message,   
				type: "error",   
				confirmButtonText: "Close" 
			});

			props.weather.shift();
		}
	}

	renderWeather(cityData) {	
		const name = cityData.city.name;
		const temps = cityData.list.map(weather => weather.main.temp);
		const pressure = cityData.list.map(weather => weather.main.pressure);
		const humidities = cityData.list.map(weather => weather.main.humidity);
		const { lon, lat } = cityData.city.coord;

		return (
			<tr key={name}>
				<td><GoogleMap lon={lon} lat={lat} /></td>
				<td>
					<Chart data={temps} color="orange" units="K"/>
				</td>
				<td>
					<Chart data={pressure} color="blue" units="hPa"/>
				</td>
				<td>
					<Chart data={humidities} color="black" units="%"/>
				</td>
			</tr>
		)
	}

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (K)</th>
						<th>Pressure (hPa)</th>
						<th>Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
		);
	}
}

function mapStateToProps({weather}) {
	return {weather}
}

export default connect(mapStateToProps)(WeatherList);