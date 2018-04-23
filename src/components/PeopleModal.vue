<template>
  <div class="modal fade" id="peopleModal" role="dialog" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Add People</h4>
        </div>
        <div class="modal-body form-group">
          <label>People Name :</label>
          <input type="text" class="form-control" v-model="people">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="addPeople()">Add People</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { peopleRef } from '@/firebase'

export default {
  name: 'PeopleModal',
  data () {
    return {
      people: ''
    }
  },
  methods: {
    addPeople () {
      peopleRef.push(this.people)

      this.people = ''
    }
  }
}
</script>

<style>

</style>
