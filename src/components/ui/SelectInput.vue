<template>
    <div class="mb-4">
        <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
            {{ label }}
        </label>

        <select
            :id="id"
            :value="modelValue"
            @change="onChange"
            v-bind="$attrs"
            class="mt-1 block w-full rounded-md bg-white border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false })

const props = defineProps({
    id: String,
    label: String,
    modelValue: [String, Number, Boolean, null],
    options: {
        type: Array,
        default: () => [],
    },
})

const emit = defineEmits(['update:modelValue'])

function onChange(event) {
    emit('update:modelValue', event.target.value)
}
</script>