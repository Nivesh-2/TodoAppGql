const Todo = require("../models/Todo");
const User = require("../models/User");
const mongodb = require("mongodb");

module.exports = {
  hello: () => {
    return "Hello World!";
  },

  getTodos: async ({},req) => {
    const userId = req.user.id;
    const todos = await Todo.find({ userId: mongodb.ObjectID(userId) });
    console.log(todos);
    return todos;
  },

  getTodo: async ({ id }) => {
    const todo = await Todo.findById(id);
    console.log(todo);
    return todo;
  },

  addTodo: async ({ inputVal }, req) => {
    const userId = req.user.id;
    const todo = new Todo({
      description: inputVal.description,
      targetDate: inputVal.targetDate,
      userId: userId,
    });

    await todo.save();
    return "done";
  },
  updateTodo: async ({ inputVal, todoId }) => {
    await Todo.updateOne(
      { _id: todoId },
      { description: inputVal.description, targetDate: inputVal.targetDate }
    );
    return inputVal;
  },

  deleteTodo: async ({ todoId }) => {
    const todo = await Todo.findById(todoId);
    await Todo.deleteOne({ _id: todoId });
    return todo;
  },
};
