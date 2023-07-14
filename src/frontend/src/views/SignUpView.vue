<template>
    <div>
      <br>
      <img id="logo" alt="Yoga club logo" src="../assets/logo.png">
      <br><br><br>
      <SignUpForm/>
    </div>
    
</template>

<script>
import SignUpForm from '@/components/SignUpComponent.vue'

export default {
  name: 'SignUpFormView',
  components: {
    SignUpForm
  },
  mounted()
        {
            let user = sessionStorage.getItem("user-info")
            if (user)
            {
                console.log("User is logged in > Redirect to Home")
                this.$router.push({name:'home'})
            }
        }
}
</script>

<style>
#logo {
    display: block;
    margin-top: 30px;
    margin-right: auto;
    margin-left: auto;
    width: 293px;
    height: 64px;
}
</style>
  