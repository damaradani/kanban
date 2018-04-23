<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <div class="panel panel-danger">
            <div class="panel-heading">
              To-do
            </div>
            <div class="panel-body">
              <!-- Isi -->
              <div v-for="(task, key) in tasks" :key="key">
                <div v-if="task.status === 'todo'" class="panel panel-danger" data-toggle="tooltip" :title="assginTo(task.assign)">
                  <div class="panel-heading">
                    <button type="button" data-toggle="popover" title="Delete" @click="delete_task(task['.key'])" class="close">&times;</button>
                    {{ task.title }}
                  </div>
                  <div class="panel-body text-left" style="overflow: auto;">
                    {{ task.details }}
                  </div>
                  <div class="panel-footer">
                    <div class="btn-group btn-group-justified">
                      <a href="#" class="btn btn-default" @click="set_task(task)" data-toggle="modal" data-target="#editModal">Edit</a>
                      <a href="#" class="btn btn-default" @click="mvTo_dotoday(task['.key'])">Do Today</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="panel panel-info">
            <div class="panel-heading">
              Do Today
            </div>
            <div class="panel-body">
              <!-- Isi -->
              <div v-for="(task, key) in tasks" :key="key">
                <div v-if="task.status === 'dotoday'" class="panel panel-info" data-toggle="tooltip" :title="assginTo(task.assign)">
                  <div class="panel-heading">
                    <button type="button" data-toggle="popover" title="Delete" @click="delete_task(task['.key'])" class="close">&times;</button>
                    {{ task.title }}
                  </div>
                  <div class="panel-body text-left" style="overflow: auto;">
                    {{ task.details }}
                  </div>
                  <div class="panel-footer text-right">
                    <div class="btn-group btn-group-justified">
                      <a href="#" class="btn btn-default" @click="mvTo_todo(task['.key'])">To-do</a>
                      <a href="#" class="btn btn-default" @click="mvTo_inprog(task['.key'])">In Progress</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="panel panel-primary">
            <div class="panel-heading">
              In Progress
            </div>
            <div class="panel-body">
              <!-- Isi -->
              <div v-for="(task, key) in tasks" :key="key">
                <div v-if="task.status === 'inprogress'" class="panel panel-primary" data-toggle="tooltip" :title="assginTo(task.assign)">
                  <div class="panel-heading">
                    <button type="button" data-toggle="popover" title="Delete" @click="delete_task(task['.key'])" class="close">&times;</button>
                    {{ task.title }}
                  </div>
                  <div class="panel-body text-left" style="overflow: auto;">
                    {{ task.details }}
                  </div>
                  <div class="panel-footer text-right">
                    <div class="btn-group btn-group-justified">
                      <a href="#" class="btn btn-default" @click="mvTo_dotoday(task['.key'])">Do Today</a>
                      <a href="#" class="btn btn-default" @click="mvTo_done(task['.key'])">Done</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="panel panel-success">
            <div class="panel-heading">
              Done
            </div>
            <div class="panel-body">
              <!-- Isi -->
              <div v-for="(task, key) in tasks" :key="key">
                <div v-if="task.status === 'done'" class="panel panel-success" data-toggle="tooltip" :title="assginTo(task.assign)">
                  <div class="panel-heading">
                    <button type="button" data-toggle="popover" title="Delete" @click="delete_task(task['.key'])" class="close">&times;</button>
                    {{ task.title }}
                  </div>
                  <div class="panel-body text-left" style="overflow: auto;">
                    {{ task.details }}
                  </div>
                  <div class="panel-footer text-right">
                    <div class="btn-group btn-group-justified">
                      <a href="#" class="btn btn-default" @click="mvTo_inprog(task['.key'])">In Progress</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <PeopleModal />
    <CreateModal :people="people" />
    <edit-modal :setEdit="setEdit"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateModal from '@/components/CreateModal.vue'
import EditModal from '@/components/EditModal.vue'
import PeopleModal from '@/components/PeopleModal.vue'
import { todoRef, peopleRef } from '@/firebase'
// import { db } from './firebase'

export default {
  name: 'home',
  components: {
    CreateModal,
    EditModal,
    PeopleModal
  },
  data () {
    return {
      setEdit: {},
      go: false,
      people_name: ''
    }
  },
  firebase: {
    tasks: todoRef,
    people: peopleRef
  },
  methods: {
    mvTo_todo: function (key) {
      todoRef.child(key).update({
        status: 'todo'
      })
    },
    mvTo_dotoday: function (key) {
      todoRef.child(key).update({
        status: 'dotoday'
      })
    },
    mvTo_inprog: function (key) {
      todoRef.child(key).update({
        status: 'inprogress'
      })
    },
    mvTo_done: function (key) {
      todoRef.child(key).update({
        status: 'done'
      })
    },
    delete_task: function (key) {
      swal({
        title: 'Are you sure?',
        text: `Do you really gonna delete this `,
        icon: 'warning',
        buttons: [true, 'yes Delete this']
      }).then(result => {
        if (result) {
          todoRef.child(key).remove()
        }
      })
    },
    set_task: function (task) {
      // this.setEdit = task
      this.setEdit = {
        ['.key']: task['.key'],
        assign: task.assign,
        details: task.details,
        status: task.status,
        title: task.title
      }
      this.go = true
    },
    add_people: function () {
      peopleRef.push(this.people_name)
    },
    assginTo: function (people) {
      return 'Assign to : ' + people
    }
  }
}
</script>

<style scoped>
.panel {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
