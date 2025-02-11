import { PropType } from "vue"

export default defineComponent({
  props: {
    todos: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  render() {
    return (
      <ul>
        {this.todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    )
  }
})
