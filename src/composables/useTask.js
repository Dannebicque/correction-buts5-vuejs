import { ref } from 'vue'

export default function useTask() {
    const tasks = ref([]);

    const fetchTasks = () => {
        tasks.value = [
            { id: 1, text: 'Task 1', completed: false, createdAt: new Date() },
            { id: 2, text: 'Task 2', completed: true, createdAt: new Date() },
        ]
        return tasks.value
    }

    const addTask = (newTaskText) => {
        if (newTaskText.trim()) {
            tasks.value.push({
                id: Date.now(),
                text: newTaskText.trim(),
                completed: false,
                createdAt: new Date()
            })
        }
    }

    return {
        tasks,
        fetchTasks,
        addTask
    }
}