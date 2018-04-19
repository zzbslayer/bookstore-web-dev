export  default class Auth{
    constructor(){
        this.isLogin = false; 
        this.username = '';
        this.role = [];
    }

    login(user_name,user_pwd,callback){
        let bodyStr = "username=" + encodeURIComponent(user_name) + "&password="+encodeURIComponent(user_pwd);
        fetch("http://localhost:8080/login", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: bodyStr
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.isLogin = true
            this.username = user_name
            this.role = result["role"]
        },
        (error) => {
            this.error= true;
            console.log(error)
            }
        )
    }
}