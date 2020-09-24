<template>
  <b-container fluid>
    <b-row>
      <b-col cols="4" class="home-left"><List /></b-col>
      <b-col cols="8" style="padding: 0;" v-if="!isSelected"><Empty /></b-col>
      <b-col cols="8" style="padding: 0;" v-if="isSelected"><Room /></b-col>
    </b-row>
  </b-container>
</template>

<script>
import List from '@/components/List'
import Empty from '@/components/Empty'
import Room from '@/components/Room'

export default {
  name: 'Home',
  components: {
    List,
    Empty,
    Room
  },
  data() {
    return {
      isSelected: true
    }
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
