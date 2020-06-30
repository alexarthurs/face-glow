import Vue from 'vue'
import Router from 'vue-router'
import KeyLight from '@/components/KeyLight'

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
      name: 'KeyLight',
      component: KeyLight
    }
  ]
})
