<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <blog-posts :posts="posts" />
    </v-col>
  </v-row>
</template>

<script>
import BlogPosts from "~/components/BlogPosts.vue";
export default {
  components: { BlogPosts },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    getPosts: async function () {
      const url = `https://kevinobrien-dev-default-rtdb.firebaseio.com/posts.json`;
      const posts = await this.$axios.$get(url);
      this.posts = posts;
      console.log(this.posts);
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>