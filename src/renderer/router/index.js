import Vue from 'vue'
import Router from 'vue-router'
const Store = require('electron-store');

Vue.use(Router)
Vue.mixin({
	data: function() {
		return {
			store: new Store()
		};
	}
});

export default new Router({
  routes: [
    {
      path: '/',
      name: 'key-light',
      component: require('@/components/KeyLight').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
