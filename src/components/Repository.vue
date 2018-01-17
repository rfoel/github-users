<template>
	<div>
		<div class="card">
			<div class="buttons" v-if="!loading">
				<div class="button">
					<a @click="$router.go(-1)"><i class="fa fa-chevron-left" aria-hidden="true"></i> {{t('back')}}</a>
				</div>
			</div>
			<div v-if="repo && !loading" class="repo-info">
				<div class="repo-info-block">
					<span class="repo-info-name"><a :href="`${repo.html_url}`" target="_blank">{{repo.name}}</a> <i class="fa fa-code-fork" aria-hidden="true" v-if="repo.fork"></i></span>
					<span class="repo-info-description">{{repo.description}}</span>
					<span class="repo-info-homepage" v-if="repo.homepage"><a :href="`${repo.homepage}`" target="_blank"><i class="fa fa-globe" aria-hidden="true"></i> {{repo.homepage}}</a></span>
					<span class="repo-info-bottom">
						<span class="repo-info-lang">{{repo.language}}</span>
						<span class="repo-info-stars"><i class="fa fa-star" aria-hidden="true"></i> {{repo.stargazers_count}}</span><span class="repo-info-stars"></span>
					</span>
				</div>
			</div>
			<div v-if="!repo && !loading">
				{{t('no public repositories')}}
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
	name: "Repository",
	data() {
		return {
			repo: undefined,
			loading: false,
			alphaOrdered: true,
			starsOrdered: false
		}
	},
	created() {
		this.fetchRepository()
	},
	methods: {
		fetchRepository() {
			this.loading = true
			let api = `https://api.github.com/repos/${this.$route.params.full_name}?client_id=${clientId}&client_secret=${clientSecret}`
			fetch(api)
				.then(response => {
					return response.json()
				})
				.then(result => {
					console.log(result)
					this.loading = false
					this.repo = undefined
					if (!result.message) this.repo = result
				})
				.catch(err => {
					this.loading = false
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.card {
	animation: fadein 1s;
	display: flex;
	flex-direction: column;
	max-width: 1000px;
	padding: 50px;
	margin: 30px auto;
	box-sizing: border-box;
	box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
	background: #fff;
	.repo-info {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 20px;

		.repo-info-block {
			flex: 1;
			min-width: 200px;
			display: flex;
			flex-direction: column;

			.repo-info-name {
				font-size: 20px;
				margin-bottom: 20px;

				i {
					float: right;
				}
			}
			.repo-info-description {
				flex: 1;
				font-size: 15px;
				color: rgba(#282d31, 0.7);
				margin-bottom: 20px;
			}
			.repo-info-homepage {
				flex: 1;
				font-size: 15px;
				margin-bottom: 20px;
			}
			.repo-info-lang {
				flex: 1;
				align-self: flex-end;
			}
			.repo-info-lang {
				font-size: 15px;
			}
			.repo-info-stars {
				float: right;
				font-size: 15px;
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
