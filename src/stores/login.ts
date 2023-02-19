import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
saveStateToStorage(state) {
	cookies.set("testvue.login.memberId", state.memberId);
	cookies.set("testvue.login.accessToke", state.accessToken);
	cookies.set("testvue.login.refreshToken", state.refreshToken);
}
cookies.set(Name, Value, Expires);
