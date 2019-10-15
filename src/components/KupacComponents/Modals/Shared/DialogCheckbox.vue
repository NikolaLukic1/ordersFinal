<template>
    <q-checkbox
        side
        label="Aktivan"
        left-label
        :value="isActive"
        @input="$emit('update:isActive', $event)"
    />

</template>

<script>
export default {
    props:['isActive']
}
</script>