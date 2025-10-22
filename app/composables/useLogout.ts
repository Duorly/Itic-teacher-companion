const token = useCookie('token')
const refresh_token = useCookie('refresh_token')

export function useLogout(){
    token.value = null;
    refresh_token.value = null;

    refreshCookie('token')
    refreshCookie('refresh_token')
    clearNuxtData()

    window.location.reload();
}
