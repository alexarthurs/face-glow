<template>
	<div class="key-color">
		<transition name="fade">
			<colour-picker v-show="showAll" v-model="color" />
		</transition>
	</div>
</template>

<script>
import { Chrome } from "vue-color";
import { debounce } from "vue-debounce";

export default {
	name: "KeyLight",
	components: {
		"colour-picker": Chrome
	},
	watch: {
		color: function() {
			if(!this.color.hex8)
				return;
				
			document.body.style.backgroundColor = this.color.hex8;
			this.store.set('color', this.color.hex8);
		}
	},
	created() {
		window.addEventListener("mousemove", this.checkForIdle);
		window.addEventListener("mousemove", this.checkForActive);
		this.color = this.store.get('color');
		document.body.style.backgroundColor = this.color;
	},
	data() {
		return {
			color: "",
			showAll: true
		};
	},
	methods: {
		checkForIdle: debounce(function(e) {
			this.showAll = false;
		}, 1500),
		checkForActive: function(e) {
			if (!this.showAll) {
				this.showAll = true;
			}
		}
	}
};
</script>

<style scoped>
.key-color {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
