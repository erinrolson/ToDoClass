// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// this class represents a collection of todo objects
class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }
  
  toString() {
    let title = `--- ${this.getTitle()} ---`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
    
  }
  
  forEach(callback) {
    this.todos.forEach(callback);
  }
  
  filter(callback) {
    let newList = new TodoList(this.title);
    let filtered = this.todos.filter(callback)
                             .forEach(todo => newList.add(todo));
    return newList;
  }
  
  toArray() {
    return JSON.parse(JSON.stringify(this.todos));
  }
  
  getTitle() {
    return this.title;
  }
  
  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }
  
  add(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new TypeError('Error: object is not an instance of the Todo class!');
    }
  }
  
  size() {
    return this.todos.length;
  }
  
  first() {
    return this.todos[0];
  }
  
  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }
  
  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
  
  markDoneAt(index) {
    this.itemAt(index).markDone();
  }
  
  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }
  
  markDone(title) {
    let foundTodo = this.findByTitle(title);
    
    if (foundTodo) {
      foundTodo.markDone();
    }
  }
  
  markAllDone() {
    this.forEach(todo => todo.markDone());
  }
  
  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }
  
  isDone() {
    return this.todos.every( todo => todo.isDone() );
  }
  
  allDone() {
    return this.filter(todo => todo.isDone());
  }
  
  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }
  
  shift() {
    return this.todos.shift();
  }
  
  pop() {
    return this.todos.pop()
  }
  
  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1).shift();
  }
}

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();


console.log(list.allNotDone());


