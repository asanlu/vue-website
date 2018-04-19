import axios from 'axios'

function customerLogin(reqData) {
    return axios.post('/api/customer/security/login', reqData);
}



export { customerLogin };