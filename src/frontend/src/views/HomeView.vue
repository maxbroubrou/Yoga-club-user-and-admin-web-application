<template>
  <div class="home">
    <img id="logo" alt="Vue logo" src="../assets/logo.png">
    <br>
  <Header/>
  <User/>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import User from '@/components/User.vue'

export default {
  name: 'HomeView',
  components: {
    Header,
    User
  },
  mounted()
        {
            let user = sessionStorage.getItem("user-info")
            if (!user)
            {
                console.log("User is not logged in")
                this.$router.push('/login')
            }
        }
}
</script>
