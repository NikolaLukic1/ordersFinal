<template>
    <q-input
        label="Naziv kupca"
        :value="name"
        dense
        autofocus
        @input="$emit('update:name', $event)"
        />
</template>

<script>
export default {
    props:['name']
}
</script>