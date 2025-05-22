// 생성 날짜: 2024-09-16
import { DefaultTheme } from 'styled-components';

const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  white: '#ffffff',
  black: '#000000',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529'
};

const breakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px'
};

const theme: DefaultTheme = {
  colors,
  breakpoints,
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
  borderRadius: '0.375rem',
  transition: '0.3s ease',
};

export default theme; 