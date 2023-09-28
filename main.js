import appStore from './src/store/task.store'
import {App} from './src/tasks/app'
import './style.css'

appStore.initState();
App('#app');



