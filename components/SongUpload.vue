<template>
  <v-dialog v-model="songDialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Upload Song </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Upload Song</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="Song Name*" v-model="songTitle" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-file-input
                label="File input"
                ref="songFile"
                dense
                accept="audio/*"
                v-model="file"
                required
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="songDialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="uploadSongFile()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
     <v-overlay :value="isUploading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-dialog>
</template>
<script>
export default {
  setup() {},
  data() {
    return {
      songDialog: false,
      songTitle: null,
      file: null,
      isUploading: false,
    };
  },
  methods: {
    uploadSongFile: async function () {
      if (!this.file) {
        console.log("no file");
        return;
      }
      const file = this.file;

      if (!file.type.match("audio.*")) {
        alert("Please upload an audio file.");
        return;
      }

      const metadata = {
        contentType: file.type,
      };

      this.isUploading = true;

      const storage = this.$fireModule.storage();

      const songUrl = await storage.ref(`songs/${file.name}`)
        .put(file, metadata)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL().then((url) => {
            return url;
          });
        })
        .catch((error) => {
          console.error("Error uploading song", error);
        });

      const user = this.$fireModule.auth().currentUser
      const idToken = await user.getIdToken(true)
      
      this.user = user;

      const slugify = function convertToSlug(Text) {
        return Text
          .toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-')
          ;
      }

      const song = {
        title: this.songTitle,
        url: songUrl,
        slug: slugify(title)
      }
      
      const response = await this.$axios.post(`https://kevinobrien-dev-default-rtdb.firebaseio.com/songs.json?auth=${idToken}`, song)
      this.isUploading = false;
      this.songDialog = false
    },
  },
};
</script>
