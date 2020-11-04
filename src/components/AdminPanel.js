import React, { Component } from 'react';
import * as CONST from '../utils/Constants';
import AdminModal from '../modals/AdminModal';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

export default class AdminPanel extends Component {
  state = {
    responseStatus: undefined,
    activeModal: undefined,
    loading: false
  };

  addVenue = (venue) => {
    this.setState({ loading: true });
    axios
      .post(`${CONST.API.URL}${CONST.API.VENUE}`, { description: venue })
      .then((response) => {
        this.setState({ loading: false, responseStatus: CONST.RESPONSE_STATUS.SUCCESS });
      })
      .catch((error) => {
        this.setState({ loading: false, responseStatus: CONST.RESPONSE_STATUS.ERROR });
      });
  };

  addEvent = (evento) => {
    this.setState({ loading: true });
    axios
      .post(`${CONST.API.URL}${CONST.API.EVENT}`, evento)
      .then((response) => {
        this.setState({ loading: false, responseStatus: CONST.RESPONSE_STATUS.SUCCESS });
      })
      .catch((error) => {
        this.setState({ loading: false, responseStatus: CONST.RESPONSE_STATUS.ERROR });
      });
  };

  openModal = (modal) => {
    this.setState({ activeModal: modal });
  }

  handleClose = () => {
    this.setState({
      responseStatus: undefined,
      activeModal: undefined,
      loading: false
    });
  };

  render() {
    return (
      <div className='panel-gestion-div'>

        <Button color='blue' onClick={() => this.openModal(CONST.OPEN_MODAL.VENUE_MODAL)}>
          {CONST.BUTTON_LABELS.ADD_VENUE}
        </Button>

        <Button color='blue' onClick={() => this.openModal(CONST.OPEN_MODAL.EVENT_MODAL)}>
          {CONST.BUTTON_LABELS.ADD_EVENT}
        </Button>

        {this.state.activeModal === CONST.OPEN_MODAL.VENUE_MODAL && (
          <AdminModal
            activeModal={this.state.activeModal}
            responseStatus={this.state.responseStatus}
            handleClose={this.handleClose}
            loading={this.state.loading}
            addVenue={this.addVenue}
          />
        )}

        {this.state.activeModal === CONST.OPEN_MODAL.EVENT_MODAL && (
          <AdminModal
            activeModal={this.state.activeModal}
            responseStatus={this.state.responseStatus}
            handleClose={this.handleClose}
            loading={this.state.loading}
            addEvent={this.addEvent}
          />
        )}

      </div>
    );
  }
}
