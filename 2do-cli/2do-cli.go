package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func printUsage() {
	fmt.Println("Usage: 2do-cli <subcommand> [args]")
	fmt.Println("Subcommands:")
	fmt.Println(
		"    help              Print help information for command and subcommand",
	)
	fmt.Println("    add <task>        Add task to todo")
	fmt.Println("    search <text>     Search for a specific text on the todo")
	fmt.Println("    toggle <number>   Toggle the task as done/undone")
	fmt.Println("    list              List tasks with their respective number")
	fmt.Println("    delete <number>   Delete a specific task on the todo list")
}

const filePerm = 0666

func appendFile(path string, data string) (*os.File, error) {
	// Create the file if it does not exist in write only mode, otherwise append to it.
	file, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_APPEND, filePerm)
	_, err = file.Write([]byte(data))
	return file, err
}

func main() {
	args := os.Args
	const fileName = "2do.md"

	fileBytes, err := os.ReadFile(fileName)
	if err != nil {
		panic(err)
	}
	fileStrLines := strings.Split(strings.TrimSpace(string(fileBytes)), "\n")

	if len(args) < 2 {
		printUsage()
		fmt.Fprintln(os.Stderr, "Error: no subcommand provided")
		return
	}
	args = args[1:]
	switch subcmd := args[0]; subcmd {
	case "help":
		printUsage()
	case "add":
		{
			if len(args) < 2 {
				printUsage()
				fmt.Fprintln(os.Stderr, "Error: provide a task to add")
				return
			}
			args = args[1:]
			task := args[0]
			file, err := appendFile(fileName, fmt.Sprintf("- [ ] %s\n", task))
			defer file.Close()
			if err != nil {
				panic(err)
			}
		}
	case "search":
		{
			if len(args) < 2 {
				printUsage()
				fmt.Fprintln(os.Stderr, "Error: provide a text to add")
				return
			}
			args = args[1:]
			searchStr := args[0]
			for idx, line := range fileStrLines {
				if strings.Contains(line, searchStr) {
					fmt.Printf("%v: %s\n", idx+1, line)
				}
			}
		}
	case "toggle":
		{
			if len(args) < 2 {
				printUsage()
				fmt.Fprintln(os.Stderr, "Error: provide task number to toggle the task")
				return
			}
			args = args[1:]
			taskNum, err := strconv.Atoi(args[0])
			if err != nil {
				panic(err)
			}

			taskFound := false
			var fileStr strings.Builder
			for idx, line := range fileStrLines {
				if idx == taskNum-1 && strings.HasPrefix(line, "- [ ]") {
					taskFound = true
					fmt.Fprintf(&fileStr, "- [X] %s\n", strings.TrimPrefix(line, "- [ ] "))
				} else if idx == taskNum-1 && strings.HasPrefix(line, "- [X]") {
					taskFound = true
					fmt.Fprintf(&fileStr, "- [ ] %s\n", strings.TrimPrefix(line, "- [X] "))
				} else {
					fmt.Fprintln(&fileStr, line)
				}
			}
			if !taskFound {
				return
			}
			os.WriteFile(fileName, []byte(fileStr.String()), filePerm)
		}
	case "list":
		for idx, line := range fileStrLines {
			fmt.Printf("%v: %s\n", idx+1, line)
		}
	case "delete":
		{
			if len(args) < 2 {
				printUsage()
				fmt.Fprintln(os.Stderr, "Error: provide a task number to delete")
				return
			}
			args = args[1:]
			taskNum, err := strconv.Atoi(args[0])
			if err != nil {
				panic(err)
			}

			taskFound := false
			var fileStr strings.Builder
			for idx, line := range fileStrLines {
				if idx == taskNum-1 {
					taskFound = true
				} else {
					fmt.Fprintln(&fileStr, line)
				}
			}
			if !taskFound {
				return
			}
			os.WriteFile(fileName, []byte(fileStr.String()), filePerm)
		}
	default:
		{
			printUsage()
			fmt.Fprintln(os.Stderr, "Error: invalid subcommand provided")
		}
	}
}
