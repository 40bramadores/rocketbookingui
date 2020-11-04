import React, { Component } from 'react';
import * as CONST from '../utils/Constants';
import { Form } from 'semantic-ui-react';
import axios from 'axios';
import AdminModal from '../modals/AdminModal';

export default class Reservations extends Component {

  state = {
    responseStatus: undefined,
    activeModal: undefined,
    loadingTickets: false,
    eventsDropdown: [],
    ticketQuantity: 0,
    loading: false,
    ticketPrice: 0,
    eventId: 0,
    email: '',
    name: ''
  };

  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    axios
      .get(`${CONST.API.URL}${CONST.API.EVENT}`)
      .then((response) => {
        this.setDropdown(response.data);
      })
      .catch((error) => {
      });
  };

  setDropdown = (response) => {
    let events = response.map((event) => {
      return {
        value: event.id,
        text: event.description,
      };
    });
    this.setState({ eventsDropdown: events });
  };

  getTickets = (id) => {
    this.setState({ loadingTickets: true });
    axios
      .get(`${CONST.API.URL}${CONST.API.EVENT}/${id}${CONST.API.TICKETS}`)
      .then((response) => {
        this.setState({
          availableTickets: response.data.length,
          ticketPrice: response.data[0].price,
          loadingTickets: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingTickets: false,
          availableTickets: 0,
        });
      });
  };

  requestReservation = (reservation) => {
    this.setState({ loading: true, activeModal: CONST.OPEN_MODAL.RESERVATION_MODAL });
    axios
      .post(`http://localhost:8080/api/v1/reservation`, reservation)
      .then((response) => {
        this.setState({ loading: false, responseStatus: CONST.RESPONSE_STATUS.SUCCESS });
      })
      .catch((error) => {
        this.setState({ loading: false, responseStatus: CONST.RESPONSE_STATUS.ERROR });
      });
  };

  handleEventChange = (e, data) => {
    this.setState(
      {
        selectedevents: data.text,
        eventId: data.value,
      },
      this.getTickets(data.value)
    );
  };


  handlenameChange = (e, data) => {
    this.setState({
      name: data.value,
    });
  };

  handleEmailChange = (e, data) => {
    this.setState({
      email: data.value,
    });
  };

  handleCantidadChange = (e, data) => {
    this.setState({
      ticketQuantity: parseInt(data.value),
    });
  };

  handleClose = () => {
    this.setState({
      responseStatus: undefined,
      activeModal: undefined,
      loading: false,
    });
  };

  
  validateTicketQuantity = () => {
    if (this.state.ticketQuantity > this.state.availableTickets) {
      return (
        <div className='form-validation-message'>
          <label className='form-error-text'>
            {CONST.VALIDATION_MESSAGE.TICKETS}
          </label>
        </div>
      );
    }
  };

  validateEmail = () => {
    let emailValid = this.state.email.match(CONST.REGEX.MAIL);
    if (!emailValid) {
      return (
        <div className='form-validation-message'>
          <label className='form-error-text'>
            {CONST.VALIDATION_MESSAGE.EMAIL}
          </label>
        </div>
      );
    }
  };

  validateForm = () => {
    let emailValid = this.state.email.match(CONST.REGEX.MAIL);
    return (
      this.state.ticketQuantity <= this.state.availableTickets &&
      this.state.ticketQuantity > 0 &&
      this.state.eventId &&
      this.state.email &&
      this.state.name &&
      emailValid
    );
  };

  clearForm = () => {
    this.setState({
      ticketQuantity: 0,
      eventsId: 0,
      email: '',
      name: '',
    });
  };

  makeReservation = () => {
    let reservation = {
      numberOfTickets: parseInt(this.state.ticketQuantity),
      idEvent: this.state.eventId,
      email: this.state.email,
      name: this.state.name
    };
    this.requestReservation(reservation);
  };

  render() {
    let validForm = this.validateForm();

    return (
      <div className='form-div'>
        <Form size='large'>
          <label className='form-label'>Eventos:</label>

          <Form.Dropdown
            required
            value={this.state.eventId === 0 ? '' : this.state.eventId}
            placeholder={CONST.PLACEHOLDER.EVENT_DROPDOWN}
            options={this.state.eventsDropdown}
            loading={this.state.loadingTickets}
            onChange={this.handleEventChange}
            id='evento-seleccionado'
            className='form-input'
            selection
            fluid
            search
          />

          {this.state.eventId !== 0 && this.state.availableTickets > 0 && (
            <div className='form-validation-message'>
              <label className='form-message'>
                {CONST.FORM_LABELS.AVAILABLE_TICKETS}<strong>{this.state.availableTickets}</strong>
              </label>
            </div>
          )}

          {this.state.eventId !== 0 && this.state.availableTickets === 0 && (
            <div className='form-validation-message'>
              <label className='form-error-text'>
                {CONST.VALIDATION_MESSAGE.SOLD_OUT}
              </label>
            </div>
          )}

          <label className='form-label'>{CONST.FORM_LABELS.NAME}</label>
          <Form.Input
            onChange={this.handlenameChange}
            placeholder={CONST.PLACEHOLDER.NAME}
            value={this.state.name}
            className='form-input'
          />

          <label className='form-label'>{CONST.FORM_LABELS.EMAIL}</label>
          <Form.Input
            onChange={this.handleEmailChange}
            placeholder={CONST.PLACEHOLDER.EMAIL}
            value={this.state.email}
            className='form-input'
          />

          {this.state.email.length > 0 && this.validateEmail()}

          <label className='form-label'>{CONST.FORM_LABELS.TICKET_AMOUNT}</label>
          <Form.Input
            value={this.state.ticketQuantity === 0 ? '' : this.state.ticketQuantity}
            placeholder={CONST.PLACEHOLDER.AVAILABLE_TICKETS}
            onChange={this.handleCantidadChange}
            className='form-input'
            type='number'
          />

          {this.validateTicketQuantity()}

          <label className='form-message'>
            {CONST.FORM_LABELS.TOTAL}
            <strong>{CONST.FORM_LABELS.DOL}${this.state.ticketQuantity > 0 ? this.state.ticketQuantity  * this.state.ticketPrice : '0'}</strong>
          </label>
        </Form>

        {this.state.activeModal === CONST.OPEN_MODAL.RESERVATION_MODAL && (
          <AdminModal
            activeModal={this.state.activeModal}
            responseStatus={this.state.responseStatus}
            handleClose={this.handleClose}
            loading={this.state.loading}
          />
        )}
        
        <div className='form-buttons'>

          <Form.Button
            onClick={() => this.makeReservation()}
            disabled={!validForm}
            color='green'
          >
            {CONST.BUTTON_LABELS.ADD}
          </Form.Button>

          <Form.Button
            onClick={() => this.clearForm()}
            color='red'
          >
            {CONST.BUTTON_LABELS.CANCEL}
          </Form.Button>

        </div>
      </div>
    );
  }
}
