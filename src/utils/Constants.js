import fran from '../img/fran.jpg';
import mati from '../img/mati.jpg';
import pablo from '../img/pablo.jpg';
import franco from '../img/franco.jpg';

export const API = {
  URL: 'http://localhost:8080/api/v1',
  EVENT: '/event',
  TICKETS: '/tickets',
  RESERVATION: '/reservation',
  VENUE: '/venue',
};

export const VALIDATION_MESSAGE = {
  TICKETS: 'No hay suficientes tickets disponibles para realizar su reserva',
  EMAIL: 'Ingrese un email valido',
  SOLD_OUT: 'Se agotaron los tickets para el evento seleccionado',
};

export const PLACEHOLDER = {
  EVENT_DROPDOWN: 'Selecciones un evento',
  NAME: 'Ingrese su nombre . . .',
  EMAIL: 'Ingrese su email . . .',
  TICKET_AMOUNT: 'Ingrese la cantidad de tickets . . .',
  TICKET_PRICE: 'Ingrese el precio del ticket...',
  EVENT_DATE: 'Fecha del evento:',
};

export const FORM_LABELS = {
  AVAILABLE_TICKETS: 'Tickets disponibles: ',
  NAME: 'Nombre:',
  EMAIL: 'Email:',
  TICKET_AMOUNT: 'Cantidad de tickets:',
  TOTAL: 'Total: ',
  DOLLAR_SIGN: '$',
  VENUE: 'Venue:',
  CAPACITY: 'Capacidad:',
  PRICE: 'Precio:',
};

export const BUTTON_LABELS = {
  ADD: 'AGREGAR',
  CANCEL: 'CANCELAR',
  ADD_VENUE: '+ venue',
  ADD_EVENT: '+ evento',
  DONE: 'HECHO',
};

export const REGEX = {
  MAIL: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
};

export const ADD_VENUE_MODAL = {
  HEADER: 'Agregar Venue',
  LOADER: 'Agregando venue...',
  VENUE_NAME_LABEL: 'Nombre del venue: ',
  VENUE_NAME_PLACEHOLDER: 'Ingrese el nombre . . .',
  ADD_VENUE_SUCCESS_MESSAGE: 'Venue agregado correctamente',
  ADD_VENUE_ERROR_MESSAGE: 'Hubo un error agregando el venue.',
  SELECT_VENUE_PLACEHOLDER: 'Seleccione un venue',
};

export const ADD_RESERVATION_MODAL = {
  HEADER: 'Crear reserva',
  LOADER: 'Creando reserva...',
  ADD_RESERVATION_SUCCESS_MESSAGE: 'Reserva realizada correctamente',
  ADD_RESERVATION_ERROR_MESSAGE: 'Hubo un error realizando la reserva.'
}

export const ADD_EVENT_MODAL = {
  HEADER: 'Agregar Evento',
  LOADER: 'Agregando evento...',
  EVENT_NAME_LABEL: 'Nombre del evento: ',
  EVENT_NAME_PLACEHOLDER: 'Ingrese el nombre . . .',
  ADD_EVENT_SUCCESS_MESSAGE: 'Evento agregado correctamente',
  ADD_EVENT_ERROR_MESSAGE: 'Hubo un error agregando el evento.',
  CAPACITY_PLACEHOLDER: 'Ingrese la cantidad de personas...',
};

export const DATE_FORMAT = {
  FORMAT: 'YYYY-MM-DD',
};

export const SEND_EMAIL_MESSAGE = 'Mandame un email';

export const MATIAS_ROSOFSKY = {
    NAME: 'Matias Rosofsky',
    AGE: '23 años',
    WORK: 'Application Developer en IBM',
    MAIL: 'mailto:matias.rosofsky@comunidad.ub.edu.ar',
    PHOTO: mati
};

export const FRANCISCO_GIORDANO = {
    NAME: 'Francisco Giordano',
    AGE: '25 años',
    WORK: 'Full Stack Dev en Baufest',
    MAIL: 'mailto:francisco.giordano@comunidad.ub.edu.ar',
    PHOTO: fran
};

export const PABLO_ACHAVAL = {
    NAME: 'Pablo Achaval',
    AGE: '27 años',
    WORK: 'Full Stack Dev en Baufest',
    MAIL: 'mailto:pablo.achaval@comunidad.ub.edu.ar',
    PHOTO: pablo
};

export const FRANCO_FIORI = {
    NAME: 'Franco Fiori',
    AGE: '26 años',
    WORK: 'Administrador de redes',
    MAIL: 'mailto:franco.fiori@comunidad.ub.edu.ar',
    PHOTO: franco
}

export const RESPONSE_STATUS = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
}

export const OPEN_MODAL = {
  VENUE_MODAL: 'VENUE_MODAL',
  EVENT_MODAL: 'EVENT_MODAL',
  RESERVATION_MODAL: 'RESERVATION_MODAL'
}
