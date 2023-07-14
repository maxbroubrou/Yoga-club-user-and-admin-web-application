<template>
    <div>
        <h1>
            Edit Membership
        </h1>
        <br>
        <div class="register">
            <h2>User Id : {{ user_id }}</h2>
            <h2>Name : {{ name }}</h2>
            <br>
            <section id="box1">
                <br>
                <p>
                    <label for="active">Status</label>
                    <br>
                    <select id="active" v-model="active">
                        <option value="true">Active</option>
                        <option value="false">Canceled</option>
                    </select>
                </p>
                <br>
                <p>
                    <label for="credit">Credit</label>
                    <input type="number" name="credit" id="credit" v-model="credit">
                </p>
                <p>
                    <label for="start_date">Start Date</label>
                    <input type="date" name="start_date" id="start_date" v-model="start_date">
                </p>
                <p>
                    <label for="end_date">End Date</label>
                    <input type="date" name="end_date" id="end_date" v-model="end_date">
                </p>
            </section>
            <br><button v-on:click="updateData">Validate</button>
            <button id="redirection" v-on:click="redirect2">Cancel</button>
            <br>
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
    name: 'EditMembershipView',
    components: {

    },
    data() {
        return {
            user_id: this.$route.params.user_membership.user._id,
            membership_id: this.$route.params.user_membership.membership._id,
            name: this.$route.params.user_membership.user.name,
            credit: this.$route.params.user_membership.membership.credit,
            active: this.$route.params.user_membership.membership.active,
            start_date: this.$route.params.user_membership.membership.start_date.slice(0, 10),
            end_date: this.$route.params.user_membership.membership.end_date.slice(0, 10)
        }
    },
    methods: {
        updateData() {
            let active = document.getElementById("active").value
            let credit = document.getElementById("credit").value
            let start_date = document.getElementById("start_date").value
            let end_date = document.getElementById("end_date").value
            let data = {
                "active": active,
                "credit": credit,
                "start_date": start_date,
                "end_date": end_date
            }
            axios.put('http://localhost:3000/membership/' + this.membership_id, data, {
                headers: { "Authorization": `${JSON.parse(sessionStorage.getItem("user-info")).token}` }
            }
            )
                .then(response => {
                    this.$fire({
                        title: 'Membership updated',
                        text: '',
                        type: "success",
                        confirmButtonText: 'OK'
                    })
                    this.$router.push('/users')
                })
                .catch(error => {
                    console.log(error)
                })

        },
        mounted() {
            let user = sessionStorage.getItem("user-info")
            if (!user) {
                console.log("User is not logged in")
                this.$router.push('/login')
            }
        },
        redirect2() {
            this.$router.push('/users')
        },
    }
}
</script>
 
<style>
label {
    font-weight: bold;
    display: inline-block;
    width: 5em;
}

#box1 {
    border: 1px solid black;
    padding: 10px;
    width: 25em;
    margin: 0 auto;
}
</style>