import Vue from 'vue';
import { format } from 'date-fns';

Vue.filter('format', (value) => format(value, 'DD.MM.YYYY.'));
