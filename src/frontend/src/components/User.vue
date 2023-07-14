<template>
    <div>
        <h1>Hello {{name}}!</h1>
        <br>
        <h2 id="membership-title">Your membership</h2>
        <div id="membership-panel">
            <p id="membership-status">Status : {{status}}</p>
            <p>Credits left : {{credits}}</p>
            <p>Start date : {{ start_date }}</p>
            <p>End date : {{ end_date }}</p>
            <button class="button-87" @click="checkIn">Check-in to club</button>
        </div>
        <br><br>
        <p id="info-text">Please contact an admin if you want to modify your membership</p>
    </div>
</template>

<script>
import axios from 'axios'
import { AcroFormPasswordField } from 'jspdf'



export default {
    name: "User",
    computed: {
        name: function () {
            let name_string = JSON.parse(sessionStorage.getItem("user-info")).name;
            name_string = name_string.charAt(0).toUpperCase() + name_string.slice(1);
            return name_string;
        },
        email: function () {
            let mail_string = JSON.parse(sessionStorage.getItem("user-info")).email;
            return mail_string;
        }
    },
    data() {
        return {
            user_id: JSON.parse(sessionStorage.getItem("user-info")).userId,
            credits: this.getUserCredits(),
            status: "",
            start_date: "",
            end_date: ""
        };
    },
    methods: {
        mounted() {
            let user = sessionStorage.getItem("user-info");
            if (user) {
                this.$router.push("/home");
            }
        },
        getUserCredits() {
            this.user_id = JSON.parse(sessionStorage.getItem("user-info")).userId;
            axios.get("http://localhost:3000/membership/user/" + this.user_id, 
            // axios.get("http://localhost:3000/membership/user/"+"63b9bb11f428db9706498913",
            {
                headers: { "Authorization": `${JSON.parse(sessionStorage.getItem("user-info")).token}` }
            })
                .then(response => {
                if (response.status === 200) {
                    this.credits = response.data[0].credit;
                    response.data[0].active ? (this.status = "Active") : (this.status = "Inactive");
                    response.data[0].active ? document.getElementById("membership-status").style.color = "green" : document.getElementById("membership-status").style.color = "red";
                    this.start_date = response.data[0].start_date.slice(0, 10);
                    this.end_date = response.data[0].end_date.slice(0, 10);
                }
            })
                .catch((error) => {
                    //Hide membership panel
                    document.getElementById("membership-panel").style.display = "none";
                    document.getElementById("info-text").style.display = "none";
                    if(this.email !== "admin@gmail.com")
                    {
                        document.getElementById("membership-title").innerHTML = "You don't have a membership yet. Please contact a club admin to get one.";
                    }
                    else {
                        document.getElementById("membership-title").innerHTML = "You are an admin. You don't have a membership because you can enter at anytime :)";
                    }
            });
        },
        checkIn() {
            axios.get("http://localhost:3000/user/"+ this.user_id+"/checkin",
            // axios.get("http://localhost:3000/user/"+ "63b9bb11f428db9706498913"+"/checkin",
            {
                headers: { "Authorization": `${JSON.parse(sessionStorage.getItem("user-info")).token}` }
            })
            .then(response => {
                if (response.status === 200) {
                    this.getUserCredits();
                    this.$fire({
                        title: `Check-in successful`,
                        text: `Your code to enter via turnstyle : ${Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)}`,
                        type: "success",
                        timer: 30000
                        })
                }
                else if (response.status === 202) {
                    console.log(response.data);
                    this.$fire({
                        title: `Check-in failed`,
                        text: `${response.data.message}`,
                        type: "error",
                        timer: 30000
                        })
                }
            })
        }
    },
    components: { AcroFormPasswordField }
}
</script>

<style>

* {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#info-text {
    font-size: 12px;
    color: #ff7043;
}

/* Button credits : https://getcssscan.com/css-buttons-examples */
.button-87 {
  margin: 10px;
  padding: 15px 30px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  /* display: block; */
  border: 0px;
  font-weight: 700;
  box-shadow: 0px 0px 14px -7px #f09819;
  background-image: linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-87:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.button-87:active {
  transform: scale(0.95);
}
</style>