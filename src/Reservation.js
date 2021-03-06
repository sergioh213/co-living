import React, {Component} from 'react'
import axios from './axios'
import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

class Reservation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showBio: false,
            showOnline: false,
            showPayment: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                this.setState(data)
            }
        )
        this.setState({
            arrival_date: localStorage.getItem("arrival_date"),
            departure_date: localStorage.getItem("departure_date")
        })
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        if (!this.state.card_number || !this.state.expiration_month || !this.state.expiration_year || !this.state.ccv) {
            localStorage.setItem("arrival_date", this.state.arrival_date)
            localStorage.setItem("departure_date", this.state.departure_date)
            this.props.toggleShowPayment()
            this.props.toggleShowReservation()
        } else {
            this.setState({
                location_id: this.props.hostelInfo.id
            }, () => {
                localStorage.removeItem("arrival_date")
                localStorage.removeItem("departure_date")
                this.props.makeReservation(this.state)
            })
        }
    }
    render() {
        if (!this.state.id) {
            return null;
        }
        const { hostel_main_img, street, num, postal_code, city_name, num_beds_left } = this.props.hostelInfo
        return (
            <div id="reservation">
                <p id="close-x" onClick={ this.props.toggleShowReservation }>x</p>
                <img className="map-label-img" id="reservation-img" src={`${ hostel_main_img }`} alt=""/>
                <div id="reservation-hostel-text-box">
                    <div>{`${ street } ${ num }`}</div>
                    <div>{`${ postal_code }, ${ city_name }`}</div>
                    <div id="beds-left-text">
                        There are
                        <div id="num-beds-left">{ num_beds_left }</div>
                        beds left
                    </div>
                </div>
                <div className="section-header">Chose your bed</div>
                <form id="reservation-form" onSubmit={ this.handleSubmit }>
                    <div className="date-subheader">Check-In date</div>
                    <div className="date-section">
                        {/*<DayPicker />*/}
                        {/*<div className="reservation-input-box">*/}
                        <input className="date-input" onChange={ this.handleChange } name="arrival_date" type='date' min="2018-08-13" max="2019-12-31" defaultValue={ this.state.arrival_date } />
                            {/*<input className="date-input" onChange={ this.handleChange } name="arrival_day" placeholder='Day' type='number'/>*/}
                        {/*</div>*/}
                        {/*<div className="reservation-input-box">
                            <input className="date-input" onChange={ this.handleChange } name="arrival_month" placeholder='Month' type='number'/>
                        </div>
                        <div className="reservation-input-box">
                            <input className="date-input" onChange={ this.handleChange } name="arrival_year" placeholder='Year' type='number'/>
                        </div>*/}
                    </div>
                    <div className="date-subheader">Check-Out date</div>
                    <div className="date-section">
                        {/*<div className="reservation-input-box">*/}
                            <input className="date-input" onChange={ this.handleChange } name="departure_date" type='date' defaultValue={ this.state.departure_date } />
                        {/*</div>*/}
                        {/*<div className="reservation-input-box">
                            <input className="date-input" onChange={ this.handleChange } name="departure_month" placeholder='Month' type='number'/>
                        </div>
                        <div className="reservation-input-box">
                            <input className="date-input" onChange={ this.handleChange } name="departure_year" placeholder='Year' type='number'/>
                        </div>*/}
                    </div>
                    <button className="button" id="submit-button-reservation">Reserve bed</button>
                </form>
            </div>
        )
    }
}

export default Reservation
