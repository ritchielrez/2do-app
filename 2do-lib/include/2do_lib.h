#ifndef TODO_LIB_H_INCLUDED
#define TODO_LIB_H_INCLUDED

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

typedef struct TodoString {
  char *data;
  size_t capacity;
  size_t size;
} TodoString;

typedef struct Todo {
  TodoString *task;
  bool checked;
} Todo;

typedef struct Todos {
  Todo *data;
  size_t capacity;
  size_t size;
} Todos;

typedef struct TodoData {
  const char *file_name;
  TodoString *file_buffer;
  size_t file_buffer_i;
  Todos *todos;
} TodoData;

TodoString *string_init(size_t capacity);
void string_delete(TodoString *string);
void string_push_back(TodoString *string, char ch);
void string_assign(TodoString *string, char *assigned_string);
Todos *todos_init(size_t capacity);
void todos_push_back(Todos *todos, Todo todo);
void todos_delete(Todos *todos);
TodoData *todo_data_init(const char *file_name);
void todo_data_delete(TodoData *todo_data);
char consume(TodoData *todo_data);
char peek(TodoData *todo_data, size_t offset);
int32_t read_file(TodoData *todo_data);
int32_t add_task(TodoData *todo_data, char *task);
bool search_task(char *task);
bool done_task(char *task);
bool remove_task(char *task);

#endif // TODO_LIB_H_INCLUDED
