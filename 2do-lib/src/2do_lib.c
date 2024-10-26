#include <errno.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

#include "include/2do_lib.h"

TodoString *string_init(size_t capacity) {
  TodoString *ret = (TodoString *)malloc(sizeof(TodoString));
  ret->data = malloc(capacity);
  ret->capacity = capacity;
  ret->size = 0;
  return ret;
}

void string_delete(TodoString *string) {
  if (string) {
    free(string->data);
  }
}

void string_push_back(TodoString *string, char ch) {
  size_t size = string->size + 1;
  if (size >= string->capacity) {
    size_t capacity = size * 2;
    string->data = realloc(string->data, capacity);
    string->capacity = capacity;
  }
  string->size = size;
  string->data[size - 1] = ch;
  string->data[size] = '\0';
}

void string_assign(TodoString *string, char *assigned_string) {
  size_t size = strlen(assigned_string);
  if (size >= string->capacity) {
    size_t capacity = size * 2;
    string->data = malloc(capacity);
    string->capacity = capacity;
  }
  string->size = size;
  strncpy(string->data, assigned_string, string->size);
  string->data[size] = '\0';
}

Todos *todos_init(size_t capacity) {
  Todos *ret = (Todos *)malloc(sizeof(Todos));
  ret->data = (Todo *)malloc(sizeof(Todo) * capacity);
  ret->capacity = capacity;
  ret->size = 0;
  for (size_t i = 0; i < capacity; ++i) {
    ret->data[i].task = NULL;
    ret->data[i].checked = false;
  }
  return ret;
}

void todos_push_back(Todos *todos, Todo todo) {
  size_t size = todos->size + 1;
  if (size >= todos->capacity) {
    size_t capacity = size * 2;
    todos->data = realloc(todos->data, capacity);
    todos->capacity = capacity;
  }
  todos->size = size;
  todos->data[size - 1] = todo;
}

void todos_delete(Todos *todos) {
  for (size_t i = 0; i < todos->capacity; ++i) {
    string_delete(todos->data[i].task);
    free(todos->data[i].task);
  }
  free(todos->data);
}

TodoData *todo_data_init(const char *file_name) {
  TodoData *ret = malloc(sizeof(TodoData));
  ret->file_name = file_name;
  ret->file_buffer = string_init(128);
  ret->file_buffer_i = 0;
  ret->todos = todos_init(128);
  return ret;
}

void todo_data_delete(TodoData *todo_data) {
  todos_delete(todo_data->todos);
  free(todo_data->todos);
  string_delete(todo_data->file_buffer);
  free(todo_data->file_buffer);
}

char consume(TodoData *todo_data) {
  if (todo_data->file_buffer_i + 1 <= todo_data->file_buffer->size) {
    return todo_data->file_buffer->data[(todo_data->file_buffer_i)++];
  }
  return todo_data->file_buffer->data[todo_data->file_buffer->size - 1];
}

char peek(TodoData *todo_data, size_t offset) {
  if (todo_data->file_buffer_i + offset <= todo_data->file_buffer->size) {
    return todo_data->file_buffer->data[todo_data->file_buffer_i + offset];
  }
  return todo_data->file_buffer->data[todo_data->file_buffer->size - 1];
}

int32_t read_file(TodoData *todo_data) {
  int32_t ret = 0;
  FILE *file = fopen(todo_data->file_name, "a+");
  if (file == NULL) {
    return 1;
  }
  int32_t ch = fgetc(file);
  if (ch == EOF) {
    ret = -1;
    goto defer;
  }
  for (; ch != EOF; ch = fgetc(file)) {
    string_push_back(todo_data->file_buffer, ch);
  }

  while (todo_data->file_buffer_i < todo_data->file_buffer->size) {
    if (peek(todo_data, 0) == '-' && peek(todo_data, 1) == ' ' &&
        peek(todo_data, 2) == '[' && peek(todo_data, 3) == ' ' &&
        peek(todo_data, 4) == ']' && peek(todo_data, 5) == ' ') {
      for (size_t i = 1; i <= 6; ++i)
        consume(todo_data);
      Todo todo = {.task = string_init(128), .checked = false};
      while (peek(todo_data, 0) != '\n') {
        string_push_back(todo.task, consume(todo_data));
      }
      todos_push_back(todo_data->todos, todo);
    } else if (peek(todo_data, 0) == '-' && peek(todo_data, 1) == ' ' &&
               peek(todo_data, 2) == '[' && peek(todo_data, 3) == 'X' &&
               peek(todo_data, 4) == ']' && peek(todo_data, 5) == ' ') {
      for (size_t i = 1; i <= 6; ++i)
        consume(todo_data);
      Todo todo = {.task = string_init(128), .checked = true};
      while (peek(todo_data, 0) != '\n') {
        string_push_back(todo.task, consume(todo_data));
      }
      todos_push_back(todo_data->todos, todo);
    }
    ++(todo_data->file_buffer_i);
  }

defer:
  fclose(file);
  return ret;
}

int32_t add_task(TodoData *todo_data, char *task) {
  FILE *file = fopen(todo_data->file_name, "a");
  Todo todo = {.task = string_init(128), .checked = false};
  string_assign(todo.task, task);
  todos_push_back(todo_data->todos, todo);
  if (file == NULL) {
    return 1;
  }
  fprintf(file, "- [ ] %s\n", task);
  fclose(file);
  return 0;
}
