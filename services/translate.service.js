import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/translate`;

const getAllStrings = () => {
	return fetchWrapper.get(`${baseUrl}/get-all-strings`);
};

const getPendingStrings = (language) => {
	return fetchWrapper.get(`${baseUrl}/get-pending?language=${language}`);
};

const saveTranslate = (data) => {
    return fetchWrapper.post(`${baseUrl}/save-translation`, data);
};

const getTranslations = () => {
	return fetchWrapper.get(`${baseUrl}/get-translations`);
};

const approveTranslation = (data) => {
	return fetchWrapper.post(`${baseUrl}/approve-translation`, data);
};

export const translateService = {
	getAllStrings,
    saveTranslate,
	getTranslations,
	getPendingStrings,
	approveTranslation
};
