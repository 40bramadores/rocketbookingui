import React, { Component } from 'react';
import { Modal, Form, ModalContent } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import * as CONST from '../utils/Constants';
import moment from 'moment';
import axios from 'axios';
import ModalLoader from '../shared/ModalLoader';

export default class AdminModal extends Component {
  state = {
    venuesDropdown: [],
    validForm: false,
    description: '',
    newVenue: '',
    capacity: 0,
    venueId: '',
    today: '',
    price: 0,
    date: ''
  };

  componentDidMount() {
    if (this.props.activeModal === CONST.OPEN_MODAL.EVENT_MODAL) {
      this.getVenues();
      let today = moment().format(`${CONST.DATE_FORMAT.FORMAT}`);
      this.setState({ today: today, date: today });
    }
  }

  getVenues = () => {
    axios.get(`${CONST.API.URL}${CONST.API.VENUE}`).then((response) => {
      this.setDropdown(response.data);
    });
  };

  setDropdown = (response) => {
    let venues = response.map((venue) => {
      return {
        value: venue.id,
        text: venue.description,
      };
    });
    this.setState({ venuesDropdown: venues });
  };

  handleVenueChange = (e, data) => {
    this.setState({
      selectedVenue: data.text,
      venueId: data.value,
    });
  };

  handleNewVenueChange = (e, data) => {
    this.setState({
      newVenue: data.value
    });
  }

  handleCapacityChange = (e, data) => {
    this.setState({
      capacity: data.value,
    });
  };

  handlePriceChange = (e, data) => {
    this.setState({
      price: data.value,
    });
  };

  handleDateChange = (e, data) => {
    this.setState({
      date: data.value,
    });
  };

  handleDescriptionChange = (e, data) => {
    this.setState({
      description: data.value,
    });
  };

  setEvent = () => {
    let postEvent = {
      venueId: this.state.venueId,
      capacity: parseInt(this.state.capacity),
      price: parseInt(this.state.price),
      event: {
        date: this.state.date,
        description: this.state.description
      },
    };
    this.props.addEvent(postEvent);
  };

  validateForm = () => {
    if (
      (this.props.activeModal === CONST.OPEN_MODAL.VENUE_MODAL && this.state.newVenue) ||
      (this.props.activeModal === CONST.OPEN_MODAL.EVENT_MODAL &&
        this.state.venueId &&
        this.state.capacity &&
        this.state.price &&
        this.state.description &&
        this.state.date)
    ) return true;
  };

  submit = () => {
    if (this.props.activeModal === CONST.OPEN_MODAL.VENUE_MODAL) {
      this.props.addVenue(this.state.newVenue);
    } else {
      this.setEvent();
    }
  }

  render() {
    let validForm = this.validateForm();
    return (
      <Modal
        size='small'
        open={true}
        closeOnEscape={true}
        closeOnDimmerClick={false}
        onClose={() => this.props.handleClose()}
      >
        {this.props.activeModal === CONST.OPEN_MODAL.EVENT_MODAL && (
          <>
            <Modal.Header>{CONST.ADD_EVENT_MODAL.HEADER}</Modal.Header>
            {this.props.loading && (
              <ModalLoader
                active={this.props.loading}
                content={CONST.ADD_EVENT_MODAL.LOADER}
              />
            )}

            <Modal.Content>
              {this.props.responseStatus === undefined && (
                <Form>
                  <label className='form-label'>{CONST.FORM_LABELS.NAME}</label>
                  <Form.Input
                    placeholder={CONST.ADD_EVENT_MODAL.EVENT_NAME_PLACEHOLDER}
                    onChange={this.handleDescriptionChange}
                    className='modal-input-label'
                    value={this.state.description}
                  />

                  <label className='form-label'>{CONST.FORM_LABELS.VENUE}</label>
                  <Form.Dropdown
                    required
                    id='venue-seleccionado'
                    placeholder={CONST.ADD_VENUE_MODAL.SELECT_VENUE_PLACEHOLDER}
                    fluid
                    search
                    selection
                    options={this.state.venuesDropdown}
                    onChange={this.handleVenueChange}
                    value={this.state.venueId}
                  />

                  <label className='form-label'>
                    {CONST.FORM_LABELS.CAPACITY}
                  </label>
                  <Form.Input
                    placeholder={CONST.ADD_EVENT_MODAL.CAPACITY_PLACEHOLDER}
                    onChange={this.handleCapacityChange}
                    className='modal-input-label'
                    value={this.state.capacity}
                  />

                  <label className='form-label'>{CONST.FORM_LABELS.PRICE}</label>
                  <Form.Input
                    placeholder={CONST.PLACEHOLDER.TICKET_PRICE}
                    onChange={this.handlePriceChange}
                    className='modal-input-label'
                    value={this.state.price}
                  />

                  <DateInput
                    required
                    minDate={this.state.today}
                    dateFormat={CONST.DATE_FORMAT.FORMAT}
                    label={CONST.PLACEHOLDER.EVENT_DATE}
                    name='date-evento'
                    id='date-evento'
                    placeholder={CONST.PLACEHOLDER.EVENT_DATE}
                    value={this.state.date}
                    iconPosition='left'
                    initialDate={this.state.today}
                    onChange={this.handleDateChange}
                    closable
                    closeOnMouseLeave
                    width={5}
                  />
                </Form>
              )}

              {this.props.responseStatus === CONST.RESPONSE_STATUS.SUCCESS && (
                <label className='modal-success-message'>
                  {CONST.ADD_EVENT_MODAL.ADD_EVENT_SUCCESS_MESSAGE}
                </label>
              )}

              {this.props.responseStatus === CONST.RESPONSE_STATUS.ERROR && (
                <label className='modal-error-message'>
                  {CONST.ADD_EVENT_MODAL.ADD_EVENT_ERROR_MESSAGE}
                </label>
              )}
            </Modal.Content>
          </>
        )}

        {this.props.activeModal === CONST.OPEN_MODAL.VENUE_MODAL && (
          <>
            <Modal.Header>{CONST.ADD_VENUE_MODAL.HEADER}</Modal.Header>
            {this.props.loading && (
              <ModalLoader
                active={this.props.loading}
                content={CONST.ADD_VENUE_MODAL.LOADER}
              />
            )}
            <Modal.Content>
              {this.props.responseStatus === undefined && (
                <Form>
                  <label className='form-label'>{CONST.ADD_VENUE_MODAL.VENUE_NAME_LABEL}</label>
                  <Form.Input
                    placeholder={CONST.ADD_VENUE_MODAL.VENUE_NAME_PLACEHOLDER}
                    onChange={this.handleNewVenueChange}
                    className='modal-input-label'
                    value={this.state.newVenue}
                  />
                </Form>
              )}
              {this.props.responseStatus === CONST.RESPONSE_STATUS.SUCCESS && (
                <label className='modal-success-message'>
                  {CONST.ADD_VENUE_MODAL.ADD_VENUE_SUCCESS_MESSAGE}
                </label>
              )}
              {this.props.responseStatus === CONST.RESPONSE_STATUS.ERROR && (
                <label className='modal-error-message'>
                  {CONST.ADD_VENUE_MODAL.ADD_VENUE_ERROR_MESSAGE}
                </label>
              )}
            </Modal.Content>
          </>
        )}

        {this.props.activeModal === CONST.OPEN_MODAL.RESERVATION_MODAL && (
          <>
            <Modal.Header>{CONST.ADD_VENUE_MODAL.HEADER}</Modal.Header>
            {this.props.loading && (
              <ModalLoader
                active={this.props.loading}
                content={CONST.ADD_VENUE_MODAL.LOADER}
              />
            )}
            <Modal.Content>
              {this.props.responseStatus === CONST.RESPONSE_STATUS.SUCCESS && (
                <label className='modal-sucess-message'>
                  {CONST.ADD_RESERVATION_MODAL.ADD_RESERVATION_SUCCESS_MESSAGE}
                </label>
              )}
              {this.props.responseStatus === CONST.RESPONSE_STATUS.ERROR && (
                <label className='modal-error-message'>
                  {CONST.ADD_RESERVATION_MODAL.ADD_RESERVATION_ERROR_MESSAGE}
                </label>
              )}
            </Modal.Content>
          </>
        )}

        <Modal.Actions>
          {this.props.responseStatus === undefined && (
            <div className='modal-buttons'>
              <Form.Button
                color='green'
                onClick={() => this.submit()}
                disabled={!validForm}
              >
                {CONST.BUTTON_LABELS.ADD}
              </Form.Button>

              <Form.Button color='red' onClick={() => this.props.handleClose()}>
                {CONST.BUTTON_LABELS.CANCEL}
              </Form.Button>
            </div>
          )}

          {this.props.responseStatus !== undefined && (
            <div className='modal-buttons'>
              <Form.Button color='blue' onClick={() => this.props.handleClose()}>
                {CONST.BUTTON_LABELS.DONE}
              </Form.Button>
            </div>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}
