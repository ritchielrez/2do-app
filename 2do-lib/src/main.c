#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <errno.h>

#include "include/2do_lib.h"

int main() {
  int ret = 0;
  TodoData *todo_data = todo_data_init("2do.md");
  int32_t err = read_file(todo_data);
  if (err == -1 || err == 1) {
    perror(NULL);
    ret = 1;
    goto defer;
  }
  add_task(todo_data, "task4");
  for (size_t i = 0; i < todo_data->todos->size; ++i) {
    printf("%s\n", todo_data->todos->data[i].task->data);
    printf("%d\n", todo_data->todos->data[i].checked);
  }

defer:
  todo_data_delete(todo_data);
  free(todo_data);
  return ret;
}
