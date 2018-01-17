<template>
  <div id="app">
		<header>
			<router-view name="header"></router-view>
		</header>
		<main>
			<router-view name="main"></router-view>
		</main>
		<footer>
			<span v-if="$translate.lang == 'jp'">
				<a href="http://rafaelfran.co/" target="_blank">Rafael Franco</a> {{t('made by')}}
			</span>
			<span v-else>
				{{t('made by')}} <a href="http://rafaelfran.co/" target="_blank">Rafael Franco</a>
			</span>
		</footer>
  </div>
</template>

<script>
export default {
	name: "app",
	data() {
		return {
			patterns: []
		}
	}
}
</script>

<style lang="scss">
html {
	height: 100%;
}
html,
body {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	box-sizing: content-box;
	font-family: "Roboto", sans-serif;
	background: #282d31;
	color: #282d31;
}
#app {
	height: 100vh;
	display: flex;
	flex-direction: column;
}
header {
	display: block;
}
main {
	display: flex;
	justify-content: center;
	flex: 1 0 auto;
}
footer {
	display: flex;
	min-height: 50px;
	text-align: center;
	justify-content: center;
	align-content: center;
	line-height: 50px;
	color: rgba(255, 255, 255, 0.6);
	a {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.6);
		&:hover {
			color: rgba(255, 255, 255, 0.8);
		}
	}
}
a {
	color: #2196f3;
	text-decoration: none;
	cursor: pointer;
}
.loading {
	padding: 20px;
	img {
		display: block;
	}
	span {
		font-size: 20px;
	}
}
.buttons {
	display: flex;
	.button {
		flex: 1;
	}
	.sort-buttons {
		a {
			cursor: pointer;
			margin-left: 10px;
		}
	}
}
</style>
