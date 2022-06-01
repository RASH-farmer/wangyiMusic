import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Tabbar, TabbarItem, Button, Search, NavBar } from 'vant';
import { Col, Row } from 'vant';
import { Image as VanImage } from 'vant';
import { Grid, GridItem } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Icon } from 'vant';
import { List } from 'vant';

Vue.use(List);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Col);
Vue.use(Row);
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')