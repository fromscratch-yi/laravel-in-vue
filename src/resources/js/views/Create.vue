<template>
    <div>
        <h1>Home Page</h1>
        <p class="create"></p>
        <form>
            <table>
                <tbody>
                    <tr>
                        <th>TODO</th>
                        <td><input type="text" placeholder="Write do what you should do."></td>
                    </tr>
                    <tr>
                        <td colspan="2"><button type="sbumit">Create TODO</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
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
