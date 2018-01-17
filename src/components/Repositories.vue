<template>
	<div>
		<div class="card">
			<div class="buttons" v-if="!loading">
				<div class="button">
					<a @click="$router.go(-1)"><i class="fa fa-chevron-left" aria-hidden="true"></i> {{t('back')}}</a>
				</div>
				<div class="sort-buttons">
					<a @click="sortStars">
						<i class="fa fa-sort-amount-asc" aria-hidden="true" v-if="starsOrdered"></i>
						<i class="fa fa-sort-amount-desc" aria-hidden="true" v-else></i>
					</a>
					<a @click="sortAlpha">
						<i class="fa fa-sort-alpha-desc" aria-hidden="true" v-if="alphaOrdered"></i>
						<i class="fa fa-sort-alpha-asc" aria-hidden="true" v-else></i>
						</a>
				</div>
			</div>
			<div v-if="repos && repos.length && !loading" class="repos-info">
				<div class="repo-info-block" v-for="(repo, index) in repos" :key="index" @click="goToRepo(repo.full_name)">
					<span class="repo-info-name">{{repo.name}} <i class="fa fa-code-fork" aria-hidden="true" v-if="repo.fork"></i></span>
					<span class="repo-info-description">{{repo.description}}</span>
					<span class="repo-info-bottom">
					<span class="repo-info-lang">{{repo.language}}</span>
					<span class="repo-info-stars"><i class="fa fa-star" aria-hidden="true"></i> {{repo.stargazers_count}}</span><span class="repo-info-stars"></span>
					</span>
				</div>
			</div>
			<div v-if="!repos && !loading">
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
	name: "Repositories",
	data() {
		return {
			repos: undefined,
			loading: false,
			alphaOrdered: true,
			starsOrdered: false
		}
	},
	created() {
		this.fetchRepositories()
	},
	methods: {
		fetchRepositories() {
			this.loading = true
			let api = `https://api.github.com/users/${this.$route.params.username}/repos?client_id=${clientId}&client_secret=${clientSecret}`
			fetch(api)
				.then(response => {
					return response.json()
				})
				.then(result => {
					this.loading = false
					this.repos = undefined
					if (!result.message) this.repos = result
					console.log(result)
					this.sortStars()
				})
				.catch(err => {
					this.loading = false
				})
		},
		goToRepo(full_name) {
			this.$router.push({ name: "repository", params: { full_name } })
		},
		sortAlpha() {
			this.alphaOrdered = !this.alphaOrdered
			this.repos = this.repos.sort((a, b) => {
				if (this.alphaOrdered) return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
				else return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
			})
		},
		sortStars() {
			this.starsOrdered = !this.starsOrdered
			this.repos = this.repos.sort((a, b) => {
				if (this.starsOrdered) return a.stargazers_count < b.stargazers_count ? 1 : -1
				else return a.stargazers_count > b.stargazers_count ? 1 : -1
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
	.repos-info {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 20px 0;

		.repo-info-block {
			flex: 1;
			min-width: 200px;
			margin: 10px;
			cursor: pointer;
			padding: 20px;
			border: 1px solid rgba(0, 0, 0, 0.15);
			display: flex;
			flex-direction: column;

			.repo-info-name {
				font-size: 20px;
				margin-bottom: 10px;

				i {
					float: right;
				}
			}
			.repo-info-description {
				flex: 1;
				font-size: 15px;
				color: rgba(#282d31, 0.7);
				margin-bottom: 10px;
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
