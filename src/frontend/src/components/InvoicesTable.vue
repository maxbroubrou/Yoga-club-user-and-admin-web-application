<template>
    <div>
        <!-- <a v-on:click="getInvoices" href="#">Reload</a> -->
        <div class="container mt-4" id="invoice_table">
            <table class="table table-bordered">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">User Id</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
                <th scope="col">Details</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="invoice, index in invoices">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ invoice.user_id }}</td>
                <td>{{ invoice.date.slice(0,10) }}</td>
                <td>{{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}</td>
                <td>{{ invoice.description }}</td>
                <td>{{ invoice.total_amount }} €</td>
                <td><pdfComponent :invoice="invoice"/></td>
                </tr>
            </tbody>
            </table>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
import pdfComponent from '@/components/Pdf.vue'

export default {
    name:'invoices_table',
    components: {
        pdfComponent
    },
    data()
    {
        return{
            user_id: JSON.parse(sessionStorage.getItem("user-info")).userId,
            invoices:this.getInvoices()
        }
    },
    methods:{
        getInvoices()
        {
            this.user_id = JSON.parse(sessionStorage.getItem("user-info")).userId;
            let endpoint = ""
            if(JSON.parse(sessionStorage.getItem("user-info")).email === "admin@gmail.com")
            {
                endpoint = "http://localhost:3000/invoice/all"
            }
            else
            {
                endpoint = "http://localhost:3000/invoice/user/" + this.user_id
            }
            axios.get(endpoint,
            {
                headers: { "Authorization": `${JSON.parse(sessionStorage.getItem("user-info")).token}` }
            })
            .then(response => {
                this.invoices = response.data;
                if (response.data.length === 0)
                {
                    document.getElementById("invoice_title").innerHTML = "You have no invoices"
                    //hide table
                    document.getElementById("invoice_table").style.display = "none"
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        mounted()
        {
            let user = sessionStorage.getItem("user-info")
            if (user)
            {
                this.$router.push('/home')
            }
        }
      
    }
}
</script>

<style>
</style>