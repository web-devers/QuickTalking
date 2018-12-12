import Vue from 'vue';
import 'mint-ui/lib/style.css';
import { Field, Header, Button,Navbar, TabItem,TabContainer, TabContainerItem} from 'mint-ui';


// Vue.use(MintUI);
Vue.component(Field.name, Field);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);