<template>
  <div>
    <v-card v-for="post in posts" :key="post.id">
      <div>{{ post }}</div>
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