<template>
	<div>
		<div class="card">
			<div v-if="user && !loading" class="user">
				<img :src="user.avatar_url" :title="user.name" class="user-avatar">
				<span class="user-name" v-if="user.name">{{user.name}} <span class="user-login">(@{{user.login}})</span></span>
				<span class="user-login" v-else>@{{user.login}}</span>
				<span class="user-bio" v-if="user.bio">{{user.bio}}</span>
				<span class="user-email" v-if="user.email"><i class="fa fa-envelope" aria-hidden="true"></i> {{user.email}}</span>
				<span class="user-location" v-if="user.location"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{user.location}}</span>
				<a :href="`http://${user.blog}`" target="_blank" class="user-blog" v-if="user.blog"><i class="fa fa-link" aria-hidden="true"></i> {{user.blog}}</a>
				
				<div class="user-info">
					<a class="user-info-block" @click="goToRepos">
						<span class="user-info-data">{{user.public_repos}}</span>
						<span class="user-info-label">{{t('repositories')}}</span>				
					</a>
					<div class="user-info-block">
						<span class="user-info-data">{{user.following}}</span>
						<span class="user-info-label">{{t('following')}}</span>				
					</div>
					<div class="user-info-block">
						<span class="user-info-data">{{user.followers}}</span>
						<span class="user-info-label">{{t('followers')}}</span>				
					</div>
				</div>
			</div>
			<div v-if="!user && !loading">
				{{t('not found')}}
			</div>
			<div v-if="loading" class="loading">
				<img src="../assets/search.svg">
				<span class="loading-label">{{t('searching')}}</span>								
			</div>			
		</div>
	</div>
</template>

<script>
const clientId = "92258f4e6dfe45eb3afc"
const clientSecret = "c211319efea89cc8a52c1f7afd609c6d941f5546"

export default {
	name: "Profile",
	data() {
		return {
			user: undefined,
			loading: false
		}
	},
	created() {
		this.fetchUser()
	},
	watch: {
		$route: function() {
			this.fetchUser()
		}
	},
	methods: {
		fetchUser() {
			this.loading = true
			let api = `https://api.github.com/users/${this.$route.params.username}?client_id=${clientId}&client_secret=${clientSecret}`
			fetch(api)
				.then(response => {
					return response.json()
				})
				.then(result => {
					this.loading = false
					this.user = undefined
					if (!result.message) this.user = result
				})
				.catch(err => {
					this.loading = false
				})
		},
		goToRepos() {
			this.$router.push({ name: "repos", params: { username: this.$route.params.username } })
		}
	}
}
</script>

<style lang="scss" scoped>
.card {
	animation: fadein 1s;
	display: flex;
	max-width: 800px;
	padding: 50px;
	margin: 30px auto;
	box-sizing: border-box;
	box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
	background: #fff;
	justify-content: center;
	text-align: center;
	.user-avatar {
		display: block;
		margin: 0 auto 30px auto;
		width: 150px;
		height: 150px;
		border-radius: 50%;
	}
	.user-name,
	.user-login {
		display: inline;
		text-align: center;
		font-weight: 300;
		font-size: 25px;
	}
	.user-email,
	.user-location,
	.user-blog,
	.user-bio {
		display: block;
		text-align: center;
		font-weight: 300;
		font-size: 20px;
		margin: 10px 0;
	}
	.user-bio {
		color: rgba(#282d31, 0.7);
	}
	.user-info {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;

		.user-info-block {
			flex: 1;
			text-align: center;
			margin: 0 10px;
			cursor: pointer;
			padding: 20px;
			.user-info-data {
				display: block;
				box-sizing: content-box;
				font-size: 30px;
				padding: 10px 20px;
				font-weight: bold;
			}
			.user-info-label {
				font-size: 20px;
				text-transform: capitalize;
				white-space: nowrap;
			}
			&:hover {
				background-color: rgba(#282d31, 0.05);
			}
		}
	}
}
@media screen and (max-width: 800px) {
	.card {
		width: 100%;
		box-shadow: none;
	}
}
@keyframes fadein {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
