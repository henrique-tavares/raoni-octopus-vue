import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { registerLayouts } from './layouts/register';
import { setupCalendar } from 'v-calendar';

import './assets/css/index.css';
import 'v-calendar/dist/style.css';

const app = createApp(App);

app.use(router);
app.use(setupCalendar, {
  isDark: true
});
registerLayouts(app);

app.mount('#app');
