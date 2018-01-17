<template>
	<div class="popover" v-bind:class="{ open: isOpen, [name]: true }">
		<div class="popover__face" :aria-owns="id" v-on:click="onPopoverToggle">
			<slot name="face" >
				<a href="#"><img src="../assets/dots.svg"></a>
			</slot>
		</div>

		<div class="popover__container" :id="id" v-if="isOpen" v-on:click="onPopoverContentClick">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
const popovers = []

export default {
	props: {
		name: {
			type: String,
			required: true
		},
		closeOnContentClick: {
			default: true,
			type: Boolean,
			required: false
		}
	},
	data() {
		return {
			isOpen: false
		}
	},
	methods: {
		onPopoverToggle(e) {
			e.stopPropagation()
			if (this.isOpen) {
				this.isOpen = false
				this.$emit("popover:close")
				return
			}
			const length = popovers.length
			if (length > 1) {
				for (let i = 0; i < length; i++) {
					const popover = popovers[i]
					if (popover.isOpen) {
						popover.isOpen = false
						this.$emit("popover:close")
					}
				}
			}
			this.isOpen = true
			document.documentElement.addEventListener("click", this.onDocumentClick, false)
			this.$emit("popover:open")
		},
		onDocumentClick() {
			this.isOpen = false
			this.$emit("popover:close")
		},
		onPopoverContentClick(e) {
			e.stopPropagation()
			if (this.closeOnContentClick) {
				this.isOpen = false
				this.$emit("popover:close")
			}
		},
		removeDocumentEvent() {
			document.documentElement.removeEventListener("click", this.onDocumentClick, false)
		}
	},
	computed: {
		id() {
			return `popover-${this.name}`
		}
	},
	mounted() {
		popovers.push(this)
		this.$on("popover:close", this.removeDocumentEvent)
	},
	beforeDestroy() {
		this.removeDocumentEvent()
		popovers.length = 0
	}
}
</script>

<style lang="scss">
.popover {
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		li {
			cursor: pointer;
			padding: 10px 0;
			&:hover {
				background-color: rgba(0, 0, 0, 0.05);
			}
		}
	}
	position: relative;
	&__container {
		background: #fff;
		position: absolute;
		z-index: 99;
		right: 0;
		width: 200px;
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
	}
}
</style>