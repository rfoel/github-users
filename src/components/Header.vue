<template>
	<div>
		<nav>
			<ul>
				<li class="logo">
					<router-link :to="{ name: 'home' }"><img src="../assets/github-star.svg"> <span  class="title">{{ t('title') }}</span></router-link>
				</li>
				<search-bar class="search"></search-bar>
				<li class="lang">
					<a @click="changeLanguage('pt')"><img src="../assets/pt.svg" :title="t('portuguese')"></a>
					<a @click="changeLanguage('en')"><img src="../assets/en.svg" :title="t('english')"></a>
					<a @click="changeLanguage('jp')"><img src="../assets/jp.svg" :title="t('japanese')"></a>
				</li>
				<popover name="options" >
					<div slot="content">
						<ul class="options-lang">
							<li @click="changeLanguage('pt')">
								<img src="../assets/pt.svg" :title="t('portuguese')"> {{t('portuguese')}}
							</li>
							<li @click="changeLanguage('en')">
								<img src="../assets/en.svg" :title="t('english')"> {{t('english')}}
							</li>
							<li @click="changeLanguage('jp')">
								<img src="../assets/jp.svg" :title="t('japanese')"> {{t('japanese')}}
							</li>									
						</ul>
					</div>
				</popover>
			</ul>
		</nav>
	</div>
</template>

<script>
import SearchBar from "@/components/SearchBar"
import Popover from "@/components/Popover"

export default {
	name: "Header",
	components: { SearchBar, Popover },
	data() {
		return {}
	},
	methods: {
		changeLanguage(lang) {
			switch (lang) {
				case "pt":
					localStorage.setItem("lang", "pt")
					this.$translate.setLang("pt")
					document.title = "GitHub Usuários"
					break
				case "en":
					localStorage.setItem("lang", "en")
					this.$translate.setLang("en")
					document.title = "GitHub Users"
					break
				case "jp":
					localStorage.setItem("lang", "jp")
					this.$translate.setLang("jp")
					document.title = "GitHub ユーザーズ"
					break
				default:
					localStorage.setItem("lang", "pt")
					this.$translate.setLang("pt")
					break
			}
		}
	}
}
</script>

<style lang="scss" scoped>
nav {
	display: flex;
	justify-content: center;
	background: #282d31;
	> ul {
		width: 80%;
		max-width: 1000px;
		display: flex;
		align-items: center;
		padding: 10px 0;
		list-style: none;
		margin: 0;
		.logo {
			img {
				width: 35px;
				height: 100%;
				padding: 0 10px;
			}
		}
		.title {
			color: #fff;
			vertical-align: 10px;
		}
		.lang {
			img {
				align-self: flex-end;
				cursor: pointer;
				width: 26px;
				margin: 0 10px;
			}
		}
		.options {
			visibility: hidden;
			display: none;
		}
	}
}
@media screen and (max-width: 1000px) {
	header nav > ul {
		width: 100% !important;
	}
}
@media screen and (max-width: 800px) {
	.title,
	.lang {
		visibility: hidden;
		display: none;
	}
	header nav > ul li {
		margin-right: 0px;
	}
	.options {
		visibility: visible !important;
		display: block !important;
		padding: 0 10px;
		.options-lang {
			img {
				vertical-align: middle;
				align-self: flex-end;
				cursor: pointer;
				width: 26px;
				margin: 0 10px;
			}
		}
	}
}
</style>
