import Vue from "vue"
import Router from "vue-router"
import Header from "@/components/Header"
import Welcome from "@/components/Welcome"
import Profile from "@/components/Profile"
import Repositories from "@/components/Repositories"
import Repository from "@/components/Repository"

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: "/",
			name: "home",
			components: { header: Header, main: Welcome }
		},
		{
			path: "/users/:username",
			name: "users",
			components: { header: Header, main: Profile }
		},
		{
			path: "/users/:username/repos",
			name: "repos",
			components: { header: Header, main: Repositories }
		},
		{
			path: "/repos/:full_name",
			name: "repository",
			components: { header: Header, main: Repository }
		}
	]
})
