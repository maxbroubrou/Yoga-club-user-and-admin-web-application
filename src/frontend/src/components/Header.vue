<template>
    <div id="app">
      <nav>
        <router-link to="/">Home</router-link>  | 
        <router-link to="/invoices">Invoices</router-link>  |
        <router-link v-if="admin" id="header-user" to="/users">Users  | </router-link>
        <a v-on:click="logout" href="#">Logout</a>
        <p id="name">{{name}}</p>
      </nav>
      <router-view/>
    </div>
  </template>
  
  <script>

  export default {
    name: 'Header',
  computed: {
    name: function () {
      let name_string = ""
      let user_info = JSON.parse(sessionStorage.getItem("user-info"))
      if(user_info) {
        name_string = user_info.name
      }
      name_string = name_string.charAt(0).toUpperCase() + name_string.slice(1)
      return name_string
    },
    admin: function ()
    {
      return JSON.parse(sessionStorage.getItem("user-info")).email === "admin@gmail.com"
    }
  },
    methods: {
      logout() {
        this.$confirm("Log out?").then(() => {
            console.log("Logout")
            sessionStorage.clear()
            this.$router.push({name:'login'})
        })
      }
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

#name {
    all: unset;
    position: absolute;
    right: 5%;
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
  
  nav {
    background-color: #ff7043;
    padding: 30px;
  }
  
  nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  
  nav a.router-link-exact-active {
    color: white;
  }
  </style>
  