import api from "./api"


export async function getUserInfo(){ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/users/information`, null);
            return response.data;
        } catch (e) {
            alert("오류 발생!");
            console.error(e);
        }
}
    
export default getUserInfo;