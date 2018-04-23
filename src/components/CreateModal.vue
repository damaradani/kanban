<template>
  <div class="modal fade" id="createModal" role="dialog" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Create To Do</h4>
        </div>
        <div class="modal-body form-group text-left">
          <label>Title :</label>
          <input type="text" class="form-control" v-model="title">
          <label>Details :</label>
          <textarea class="form-control" v-model="details" rows="3" style="resize: none;"></textarea>
          <label>Assign To :</label>
          <select v-model="assign" class="form-control">
              <option v-for="(ppl, key) in people" :value="ppl['.value']" :key="key">{{ ppl['.value'] }}</option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-default" data-dismiss="modal" @click="createToDo">Create</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { todoRef } from '@/firebase'

export default {
  name: 'CreateModal',
  props: ['people'],
  data () {
    return {
      title: '',
      details: '',
      assign: null
    }
  },
  methods: {
    createToDo () {
      let title = this.title
      let details = this.details
      let assign = this.assign || 'none'
      let todo = {
        title,
        details,
        assign,
        status: 'todo'
      }
      todoRef.push(todo)

      this.title = ''
      this.details = ''
    }
  }
}
</script>

<style scoped>
  label {
    margin-top: 4px;
  }
</style>
