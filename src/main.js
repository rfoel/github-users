// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import VueTranslate from "vue-translate-plugin"

import App from "./App"
import router from "./router"

Vue.use(VueTranslate)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	template: "<App/>",
	components: { App },
	mounted() {
		if (localStorage.getItem("lang") != null) this.$translate.setLang(localStorage.getItem("lang"))
		else this.$translate.setLang("pt")
	}
})

Vue.locales({
	en: {
		portuguese: "Português",
		english: "English",
		japanese: "日本語",
		title: "GitHub Users",
		greeting: "Welcome to GitHub Users!",
		search: "Search user",
		searching: "Searching...",
		back: "Go back",
		"made by": "Made by",
		welcome1: "Search for a user in the field above or",
		"click here": "click here",
		welcome2: " to see my profile.",
		repositories: "repositories",
		following: "following",
		followers: "followers",
		"not found": "User not found. Try another username.",
		"no public repositories": "This user does not have public repositories."
	},
	pt: {
		portuguese: "Português",
		english: "English",
		japanese: "日本語",
		title: "GitHub Usuários",
		greeting: "Bem-vindo ao GitHub Usuários!",
		search: "Procurar usuário",
		searching: "Procurando...",
		back: "Voltar",
		"made by": "Feito por",
		welcome1: "Procure um usuário no campo acima ou",
		"click here": "clique aqui",
		welcome2: "para ver meu perfil.",
		repositories: "repositórios",
		following: "seguindo",
		followers: "seguidores",
		"not found": "Usuário não encontrado. Tente outro nome de usuário.",
		"no public repositories": "Este usuário não possui repositórios públicos."
	},
	jp: {
		portuguese: "Português",
		english: "English",
		japanese: "日本語",
		title: "GitHub ユーザーズ",
		greeting: "GitHub ユーザーズへようこそ！",
		search: "ユーザーによる検索",
		searching: "検索。。。",
		back: "戻る",
		"made by": "に作られた",
		welcome1: "上記のフィールドでユーザーを検索するか、",
		"click here": "ここをクリックして",
		welcome2: "私のプロフィールを見る。",
		repositories: "リポジトリ",
		following: "フォロー",
		followers: "フォロワー",
		"not found": "ユーザーが見つかりません。 別のユーザー名を試してください。",
		"no public repositories": "このユーザーには公開リポジトリはありません。"
	}
})
