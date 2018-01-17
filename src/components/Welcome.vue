<template>
  <div>
		<h1 class="greeting">{{ t('greeting') }}</h1>
		
		<div class="card">
			{{ t('welcome1') }} <router-link :to="{ name: 'users', params: { username: 'rfoel' }}">{{ t('click here') }}</router-link> {{ t('welcome2') }}
		</div>
  </div>
</template>

<script>
export default {
	name: "Welcome",
	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
h1 {
	color: #fff;
	font-size: 30px;
	font-weight: 300;
	text-align: center;
	padding: 0 20px;
}
.card {
	width: auto;
	background: #fff;
	padding: 30px;
	box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
	h2 {
		text-align: center;
		font-weight: 300;
		padding: 0 20px;
	}
}
</style>
