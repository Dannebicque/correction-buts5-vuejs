<script setup>

import { useRoute } from 'vue-router'
import { ref } from 'vue'
const id = ref(null)
const route = useRoute()
console.log(route.params.id)
id.value = route.params.id

</script>

<template>
    <h1>Détail de la tâche</h1>
{{ id }}
</template>