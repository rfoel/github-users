<template>
  <div>
		<div class="search">
			<input type="text" :placeholder="t('search')" v-model="username" @keyup="keyUp" />
		</div>
  </div>
</template>

<script>
export default {
	name: "SearchBar",
	data() {
		return {
			username: this.$route.params.username,
			timer: undefined
		}
	},
	watch: {
		$route: function() {
			this.username = this.$route.params.username
		}
	},
	methods: {
		keyUp() {
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				if (this.username) this.$router.push({ name: "users", params: { username: this.username } })
				else this.$router.push({ name: "home" })
			}, 1000)
		}
	}
}
</script>

<style lang="scss" scoped>
.search {
	margin: 0 auto;
	max-width: 250px;
	input {
		box-sizing: border-box;
		padding: 6px 8px;
		font-size: 14px;
		line-height: 20px;
		width: 100%;
		max-width: 250px;
		border-radius: 3px;
		border: 0;
		box-shadow: none;
		background-color: #43474b;
		color: #fff;
		outline: none;
		&:focus {
			background-color: rgba(255, 255, 255, 0.175);
		}
	}
	::placeholder {
		color: #8f9193;
	}
}
</style>
