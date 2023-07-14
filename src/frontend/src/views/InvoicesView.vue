<template>
  <div class="invoices">
    <img id="logo" alt="Vue logo" src="../assets/logo.png">
    <br>
    <Header/>
    <h1 id="invoice_title" style="margin:1%;">Here are your invoices :</h1>
    <InvoicesTable/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import InvoicesTable from '@/components/InvoicesTable.vue'

export default {
  name: 'InvoicesView',
  components: {
    Header,
    InvoicesTable
  },
  mounted()
        {
            let user = sessionStorage.getItem("user-info")
            if (!user)
            {
                console.log("User is not logged in")
                this.$router.push('/login')
            }

            if (JSON.parse(user).email === "admin@gmail.com") {
              document.getElementById("invoice_title").innerHTML = "Here are all the invoices :"
            }
        }
}
</script>