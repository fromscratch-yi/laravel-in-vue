<template>
    <div>
        <h1>Home Page</h1>
        <p class="create"></p>
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
