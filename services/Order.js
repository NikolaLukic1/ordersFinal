import axios from 'axios';

//const url = process.env.NODE_ENV === 'production'? 'api/partners/' : 'http://localhost:5000/api/partners/'
const url = 'http://localhost:5000/api/order/'

class OrderService{
    //Get posts
    static getOrders(){
        return new Promise(async (resolve,reject) => {
            try{
                const res = await axios.get(url);
                resolve(
                    res.data
                );
            } catch(err){
                reject(err);
            }
        })
    }

    //Create posts
    static insertOrder(order){
        return axios.post(url, order);
    }
/*
    //Edit posts
    static updatePartner(partner){
        return axios.put(url, partner);
    }*/
    
    //Delete posts
    static deleteOrder(id){
        return axios.delete(`${url}${id}`);
    }

}

export default OrderService;