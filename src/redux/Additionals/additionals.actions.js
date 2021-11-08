import additionalTypes from './additionals.types';

export const addSizeChartStart = (data) => ({
    type: additionalTypes.ADD_SIZE_CHART_START,
    payload1: data.ID,
    payload2: data.url
});