<template>
    <div id="box">
        <h1>Login</h1>
        <div class="register">
            <input type="text" v-model="email" placeholder="Enter Email">
            <input type="password" v-model="password" v-on:keyup.enter="login" placeholder="Enter Password">
            <button v-on:click="login">Login</button>
            <button id="redirection" v-on:click="redirect">Don't have an account?</button>
            <p id="error"></p>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:'login',
    data()
    {
        return{
            email:'',
            password:''
        }
    },
    methods:{
        login()
        {
            if (this.email === '' || this.password === '')
            {
                document.getElementById("error").innerHTML = "Please fill in all the fields"
                return
            }
            else
            {
                document.getElementById("error").innerHTML = ""
                axios.post("http://localhost:3000/user/login",{
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    if (response.status === 200)
                    {
                        console.log("Login Successful")
                        sessionStorage.setItem("user-info", JSON.stringify(response.data))
                        this.$router.push({name:'home'})
                    }
                }
                )
                .catch((error) => {
                    if(error.code === "ERR_NETWORK")
                    {
                        document.getElementById("error").innerHTML = "Connection to database failed"
                    }
                    else if(error.response.status === 401)
                    {
                        document.getElementById("error").innerHTML = "Incorrect Email or Password"
                    }
                    else
                    {   
                        console.log(error)
                        document.getElementById("error").innerHTML = "Something went wrong"
                    }
                })
            }
        },
        mounted()
        {
            let user = sessionStorage.getItem("user-info")
            if (user)
            {
                this.$router.push('/home')
            }
        },
        redirect()
        {
            this.$router.push({name:'signup'})
        }
    }
}
</script>

<style>
h1 {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 1%;
  }

  #box {
    border: #2c3e50;
    border-radius: 10px;
  }

.register input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    text-align: left;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid #2c3e50;
}

.register button {
    width: 300px;
    height: 40px;
    display: block;
    margin-right: auto;
    margin-left: auto;
    background-color: #2c3e50;
    border: 1px solid #2c3e50;
    color: white;
    font-size: 20px;
    font-weight: bold;
}

#redirection {
    font-size: small;
    font-style:normal;
    display: block;
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
    background-color: transparent;
    border: none;
    color: #2c3e50;
    text-decoration: underline;
  }

  #redirection:hover {
    cursor: pointer;
    color: grey
  }

#error {
    /* little red text */
    all:none;
    color:crimson;
    font-size: small;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>