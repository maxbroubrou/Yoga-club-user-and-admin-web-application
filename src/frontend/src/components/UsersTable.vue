<template>
    <div>
        <!-- <a v-on:click="getInvoices" href="#">Reload</a> -->
        <div class="container mt-4" id="invoice_table">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Credit</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user_membership, index in users_memberships">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ user_membership.user._id }}</td>
                        <td>{{ user_membership.user.name }}</td>
                        <td>{{ user_membership.user.email }}</td>
                        <td>{{ user_membership.membership.active === true ? "Active" : "Canceled" }}</td>
                        <td>{{ user_membership.membership.credit }}</td>
                        <td>{{ user_membership.membership.start_date.slice(0, 10) }}</td>
                        <td>{{ user_membership.membership.end_date.slice(0, 10) }}</td>
                        <td>
                            <button class="table-button" @click="EditMembership(user_membership)">
                                Edit Membership
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'users_table',
    components: {
    },
    data() {
        return {
            users_memberships: this.getUsers()
        }
    },
    methods: {
        getUsers() {
            axios.get("http://localhost:3000/user/all/memberships",
                {
                    headers: { "Authorization": `${JSON.parse(sessionStorage.getItem("user-info")).token}` }
                })
                .then(response => {
                    this.users_memberships = response.data
                    //place admin@gmail.com email in the first row
                    for (let i = 0; i < this.users_memberships.length; i++) {
                        if (this.users_memberships[i].user.email === "admin@gmail.com") {
                            let temp = this.users_memberships[0]
                            this.users_memberships[0] = this.users_memberships[i]
                            this.users_memberships[i] = temp
                        }
                    }
                    return response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        mounted() {
            let user = sessionStorage.getItem("user-info")
            if (user) {
                this.$router.push('/home')
            }
        },
        EditMembership(user_membership) {
            this.$router.push({
                name: 'edit_membership',
                params: {
                    user_membership: user_membership
                }
            })
        }
    }
}
</script>

<style>

</style>