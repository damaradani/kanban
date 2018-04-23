<template>
  <div class="modal fade" id="editModal" role="dialog" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Edit To Do</h4>
        </div>
        <div class="modal-body form-group">
          <label for="editTitle">Title :</label>
          <input type="text" v-model="setEdit.title" class="form-control">
          <label for="editContent">Details :</label>
          <textarea class="form-control" v-model="setEdit.details" rows="3" style="resize: none;"></textarea>
          <label>Assign To :</label>
          <input type="text" class="form-control" v-model="setEdit.assign">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="saveEdit">Save Edit</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { todoRef } from '@/firebase'

export default {
  name: 'EditModal',
  props: ['setEdit'],
  methods: {
    saveEdit: function () {
      console.log(this.setEdit)
      console.log(this.setEdit.details)
      console.log(this.setEdit.assign)
      todoRef.child(this.setEdit['.key']).update({
        title: this.setEdit.title,
        details: this.setEdit.details,
        assgin: this.setEdit.assign
      })
    }
  }
}
</script>

<style scoped>
  label {
    margin-top: 4px;
  }
</style>
