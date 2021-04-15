import { createApp } from 'vue'
import App from './App.vue'
import UiSelect from './components/UiSelect'

createApp(App)
    .component('ui-select', UiSelect)
    .mount('#app')
