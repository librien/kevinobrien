<template>
  <div>
    <v-card v-for="post in posts" :key="post.id" style="margin-bottom: 20px">
      <v-card-title to="/">{{post.title}}</v-card-title>
      <v-card-text v-html="post.body"></v-card-text>
      <v-card-actions>
        <!--<v-btn
          outlined
          rounded
          text
        >
          Button
        </v-btn>-->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      required: true,
    },
  },
  mounted: function (){ 
    console.log(this.posts);
  }
}
</script>