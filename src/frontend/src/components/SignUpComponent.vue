<template>
    <div>

        <h1>Sign up</h1>
        <div class="register">
            <input type="text" v-model="name" placeholder="Enter Name">
            <input type="text" v-model="email" placeholder="Enter Email">
            <input type="password" v-model="password" v-on:keyup.enter="signUp" placeholder="Enter Password">
            <button v-on:click="signUp">Sign Up</button>
            <button id="redirection" v-on:click="redirect">Already have an account?</button>
            <p id="error"></p>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'SignUp',
    data()
    {
        return{
            name:'',
            email:'',
            password:''
        }
    },
    methods:{
        signUp()
        {
            if (this.name === '' || this.email === '' || this.password === '')
            {
                document.getElementById("error").innerHTML = "Please fill in all the fields"
                return
            }
            else
            {
                document.getElementById("error").innerHTML = ""
                axios.post("http://localhost:3000/user/signup",{
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    if (response.status === 201)
                    {
                        console.log("Sign up Successful")
                        this.$fire({
                        title: `User ${this.name.charAt(0).toUpperCase() + this.name.slice(1)} created successfully`,
                        text: "We offer you 3 free sessions!",
                        type: "success",
                        timer: 5000
                        })
                        this.$router.push({name:'login'})
                    }
                }
                )
                .catch((error) => {
                    if(error.response && error.response.data.error.message.includes("User validation failed: email: Error"))
                    {
                        document.getElementById("error").innerHTML = "Email already exists"
                    }
                    else
                    {
                        document.getElementById("error").innerHTML = "Connection to database failed"
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
            this.$router.push({name:'login'})
        }
    }
}
</script>

<style>
.register input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
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
</style>