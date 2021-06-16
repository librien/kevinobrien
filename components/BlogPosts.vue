<template>
  <div>
    <v-card v-for="post in posts" :key="post.id">
      <div>{{ post.title.rendered }}</div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>