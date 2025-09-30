import { ref } from 'vue'

export default function useTask() {
    const tasks = ref([]);
    const errorMessage = ref('');

    const fetchTasks = async () => {
        errorMessage.value = ''


        /*
        full promise
        fetch('http://localhost:3001/tasks')
             .then(response => response.json())
             .then(data => {
             tasks.value = data
             })
             .catch(error => {
                 errorMessage.value = 'Erreur lors de la récupération des tâches. ('+error.message+')'
             })

         return tasks.value

         ou avec async/await
         */
        try {
            const response = await fetch('http://localhost:3001/tasks');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            tasks.value = data;
            return tasks.value;
        } catch (error) {
            errorMessage.value = 'Erreur lors de la récupération des tâches. (' + error.message + ')'
        }
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
        errorMessage,
        fetchTasks,
        addTask
    }
}