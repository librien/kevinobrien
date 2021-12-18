<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-if="user && isAdmin">
        <song-upload />
        <v-dialog
          v-model="postDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              New Blog Post
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Blog Post</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      label="Title"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <client-only>
                      <tiptap />
                    </client-only>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="postDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="postDialog = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div v-if="!user">
        <v-btn @click="signInPopup">Sign In</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import SongUpload from '~/components/SongUpload.vue';
import tiptap from '~/components/TipTap.vue';
export default {
  components: { SongUpload, tiptap },
  data() {
    return {
      songDialog: false,
      postDialog: false,
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