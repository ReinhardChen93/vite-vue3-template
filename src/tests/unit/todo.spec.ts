// 编写测试用例

// 1. 引入测试模块
import Todo from "@/components/todo/index.vue"
// vitest 测试框架
// @vue/test-utils 提升测试编写的速度
import { shallowMount, mount } from "@vue/test-utils"

// 用户在输入框中输入内容 会影响数据内容

// 用户点击按钮 可以新增一条数据， 新增的内容不能为空

// 如果点击添加，新增的内容和输入框中的填入的内容需要是一致的

// 分组
describe("测试todo组件功能是否正常", () => {
  // 某一个用例
  it("用户在输入框中输入内容 会影响数据内容", () => {
    const wrapper = shallowMount(Todo)
    const inputDom = wrapper.find("input")
    inputDom.setValue("hello")
    // 断言 组件中的 todo 应该定于 输入的hello
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((wrapper.vm as any).todo).toBe("hello")
  })

  it("用户点击按钮 可以新增一条数据， 新增的内容不能为空", async () => {
    const wrapper = mount(Todo)
    const inputDom = wrapper.find("input[type=text]")
    const buttonDom = wrapper.find("input[type=button]")
    inputDom.setValue("")
    await buttonDom.trigger("click")
    // 断言 组件中的 todoList 应该等于 输入的hello
    expect(wrapper.findAll("li").length as number).toBe(0)
    inputDom.setValue("hello")
    await buttonDom.trigger("click")
    expect(wrapper.findAll("li").length as number).toBe(1)
  })
  it("如果点击添加，新增的内容和输入框中的填入的内容需要是一致的", async () => {
    const wrapper = mount(Todo)
    const inputDom = wrapper.find("input[type=text]")
    const buttonDom = wrapper.find("input[type=button]")
    inputDom.setValue("hello")
    await buttonDom.trigger("click")
    expect(wrapper.findAll("li").length as number).toBe(1)
    expect(wrapper.find("li").text()).toBe("hello")
  })
})
