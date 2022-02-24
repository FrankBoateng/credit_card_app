const API_BASE_URL_DEVELOPMENT = 'https://localhost:7263';

const ENDPOINTS = {
    GET_ALL_CARDS: 'get-all-cards',
    GET_CARD_BY_ID: 'get-card-by-id',
    ADD_CARD: 'add-card',
    UPDATE_CARD: 'update-card',
    DELETE_CARD_BY_ID: 'delete-card-by-id'
};

const development = {
    API_URL_GET_ALL_CARDS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ALL_CARDS}`,
    API_URL_GET_CARD_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_CARD_BY_ID}`,
    API_URL_ADD_CARD: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.ADD_CARD}`,
    API_URL_UPDATE_CARD: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_CARD}`,
    API_URL_DELETE_CARD_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_CARD_BY_ID}`
};

const Constants = process.env.NODE_ENV === 'development' ? development : development; //prod

export default Constants;
