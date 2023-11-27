<template>
    <div class="bar-chart border-2 border-black p-5 rounded-md">
        <div v-for="(value, index) in data" :key="index" class="bar" :style="{ height: value + '%' }">
            <div class="flex justify-center text-white">
                {{ value }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.bar-chart {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 300px;
}

.bar {
    flex: 1;
    background-color: #4F46E5;
    margin: 0 4px;
}
</style>
