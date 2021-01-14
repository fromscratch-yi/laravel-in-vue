<template>
    <div>
        <h1>Home Page</h1>
        <div class="create_wrap">
            <button type="button" class="btn btn-success" v-on:click="openCreateForm">{{ createBtnLabel }}</button>
            <table class="table mt-3" id="create_form" v-show="formOpen">
                <tbody>
                    <tr>
                        <th>TODO</th>
                        <td class="input-group">
                            <input class="form-control" type="text" v-model="newTodo" placeholder="Write do what you should do.">
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-primary" v-on:click="createTodo">Create TODO</button>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table class="table mt-5" v-if="todos.length > 0">
            <thead>
                <tr>
                    <th><p class="mb-0 text-center">Date</p></th>
                    <th><p class="mb-0 text-center">TODO</p></th>
                    <th><p class="mb-0 text-center">Action</p></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(todo) in todos" :key="todo.id">
                    <td class="date_wrap">
                        <div class="text-center">{{ todo.created_at }}</div>
                    </td>
                    <td class="todo_wrap">
                        <div class="text-center">{{ todo.todo }}</div>
                    </td>
                    <td class="action_wrap">
                        <div class="text-center">
                            <input type="hidden" v-model="todo.id">
                            <button type="button" class="btn btn-danger" v-on:click="deleteTodo">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="mt-5" v-else>登録データがありません。</p>
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
                .post('/api/todos', {
                    todo: this.newTodo
                })
                .then((response) => {
                    this.todos = response.data;
                    this.newTodo = '';
                    this.openCreateForm();
                })
                .catch((error) => {
                    console.log(error);
                })
          }
          return false;
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
