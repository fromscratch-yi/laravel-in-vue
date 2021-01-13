<template>
    <div>
        <h1>Home Page</h1>
        <div class="create_wrap">
            <button type="button" class="create_btn" v-on:click="openCreateForm">{{ createBtnLabel }}</button>
            <table id="create_form" v-show="formOpen">
                <tbody>
                    <tr>
                        <th>TODO</th>
                        <td><input type="text" v-model="newTodo" placeholder="Write do what you should do."></td>
                    </tr>
                    <tr>
                        <td colspan="2"><button type="button" class="create_btn" v-on:click="createTodo">Create TODO</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>TODO</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(todo) in todos" :key="todo.id">
                    <td class="date_wrap">{{ todo.created_at }}</td>
                    <td class="todo_wrap">{{ todo.todo }}</td>
                    <td class="action_wrap">
                        <input type="hidden" v-model="todo.id">
                        <button type="button" class="edit_btn" v-on:click="editTodo">Edit</button>
                        <button type="button" class="delete_btn" v-on:click="deleteTodo">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      createBtnLabel: 'Create New TODO',
      formOpen: false,
      newTodo: ''
    };
  },
  beforeMount() {
    axios
      .get('/api/todos')
      .then((response) => {
        this.todos = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
      openCreateForm () {
          if (this.formOpen) {
              this.formOpen = false;
              this.createBtnLabel = 'Create New TODO';
          } else {
              this.formOpen = true;
              this.createBtnLabel = 'Close';
          }
      },
      createTodo (e) {
          let self = this;
          if (this.newTodo) {
              axios
                .create('/api/todos')
                .then((response) => {
                    this.todos = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
          }
          return false;
      },
      editTodo () {
          let self = this;
          let todoParent = e.currentTarget.parentNode;
          let todoId = todoParent.firstElementChild.value;
          axios
            .put('/api/todos/' + todoId)
            .then((response) => {
                this.todos = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
      },
      async deleteTodo (e) {
          let self = this;
          let todoParent = e.currentTarget.parentNode;
          let todoId = todoParent.firstElementChild.value;
          await axios
            .delete('/api/todos/' + todoId)
            .then((response) => {
                self.todos = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
      }
  },
};
</script>
