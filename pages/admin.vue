<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
        <div v-if="user && isAdmin">
          <v-btn @click="createPost">Upload song</v-btn>
        </div>
        <div v-if="!user">
          <v-btn @click="signInPopup">Sign In</v-btn>
          {{user}}
        </div>
      </v-col>
    </v-row>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      isAdmin: false,
    }
  },
  methods: {
    async sendData(){
      // Test data
    
        
    },
    signInRedirect: async function() {
      var provider = new this.$fireModule.auth.GoogleAuthProvider()
      const redr = await this.$fireModule.auth().signInWithRedirect(provider)
    },
    signInPopup: async function() { 
      var provider = new this.$fireModule.auth.GoogleAuthProvider()
      const result = await this.$fireModule.auth().signInWithPopup(provider)
      this.user = result.user
      this.checkAdmin();
    },
    checkAdmin() {
      if (this.user.email == 'kevin.matthew.obrien@gmail.com') {
        this.isAdmin = true;
      }
    },
    createPost: async function() {
      const user = this.$fireModule.auth().currentUser
      const idToken = await user.getIdToken(true)
      
      this.user = user;
      
      const post = {
        title: 'Test',
        body: 'Test'
    }
      const response = await this.$axios.post(`https://kevinobrien-dev-default-rtdb.firebaseio.com/posts.json?auth=${idToken}`, post)
      const url = `https://kevinobrien-dev-default-rtdb.firebaseio.com/posts.json?auth=${idToken}`
      const test = await this.$axios.$get(url)
     }
  },
  mounted() {
  }
}
</script>