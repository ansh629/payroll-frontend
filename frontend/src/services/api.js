import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createEmployee = (data) => axios.post(`${API_URL}/employees`, data);
export const getEmployees = () => axios.get(`${API_URL}/employees`);

export const createPayroll = (data) => axios.post(`${API_URL}/payroll`, data);
export const getPayroll = () => axios.get(`${API_URL}/payroll`);

export const createPayment = (data) => axios.post(`${API_URL}/payments`, data);
