<template>
  <div class="invoices">
    <img id="logo" alt="Vue logo" src="../assets/logo.png">
    <br>
    <Header/>
    <h1>Here are all the users :</h1>
    <UsersTable/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import UsersTable from '@/components/UsersTable.vue'

export default {
  name: 'UsersView',
  components: {
    Header,
    UsersTable
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