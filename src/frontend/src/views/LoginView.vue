<template>
  <div>
    <br>
    <img id="logo" alt="Yoga club logo" src="../assets/logo.png">
    <br><br><br>
    <LoginForm/>
  </div>
  
</template>

  <script>
  import LoginForm from '@/components/LoginComponent.vue'

  export default {
  name: 'LoginFormView',
  components: {
    LoginForm
  },
  mounted()
        {
            let user = sessionStorage.getItem("user-info")
            if (user)
            {
                console.log("User is logged in > Redirect to Home ")
                this.$router.push({name:'home'})
            }
        }
  }
  </script>
 
