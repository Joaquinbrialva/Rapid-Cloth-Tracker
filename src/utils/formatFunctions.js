//Funcion para formatear fechas y horas con moment
const moment = require('moment-timezone');
import 'moment/locale/es'

const formatDate = (date) => {
    moment.locale('es');
    const formattedDate = moment(date).tz('America/Argentina/Buenos_Aires').format('DD [de] MMMM [a las] HH:mm');
    return formattedDate;
};

const timeAgo = (date) => {
    return moment(date).fromNow();
};

const formatPrice = (price) => {
    return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


module.exports = {
    formatDate,
    timeAgo,
    formatPrice,
    removeAccents
};