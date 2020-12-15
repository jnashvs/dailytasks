<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="login">
              <v-text-field v-model="email" label="E-mail" type="email" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-btn color="blue darken-1" class="mr-4" type="submit">submit</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  created() {
    //this.testing()
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"])
  },
  methods: {
    ...mapActions({
      auth_login: "auth/login"
    }),
    login() {
      let data = {
        email: this.email,
        password: this.password
      };

      this.auth_login(data).then(
        response => {
          this.$router.push("/")
          console.log(response)
        }
      ).catch(err =>{
          console.log('error login catch 2020')
        console.log(err);
    });

      //   this.$store
      //     .dispatch("login", data)
      //     .then(() => this.$router.push("/"))
      //     .catch(err => console.log(err));
    }
  }
};
</script>