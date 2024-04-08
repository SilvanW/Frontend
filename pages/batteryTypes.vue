<script setup>
const items = ref(
    [
        { id: 0, message: 'Foo' },
        { id: 1, message: 'Bar' },
        { id: 2, message: 'Foo' },
        { id: 3, message: 'Bar' },
        { id: 4, message: 'Foo' },
        { id: 5, message: 'Bar' },
        { id: 6, message: 'Foo' },
        { id: 7, message: 'Bar' },
        { id: 8, message: 'Foo' },
        { id: 9, message: 'Bar' },
        { id: 10, message: 'Foo' },
        { id: 11, message: 'Bar' },
        { id: 12, message: 'Foo' },
        { id: 13, message: 'Bar' },
        { id: 14, message: 'Foo' },
        { id: 15, message: 'Bar' },
        { id: 16, message: 'Foo' },
        { id: 17, message: 'Bar' },
    ]
)
</script>

<template>
    <Main>
        <Card title="Batterieliste">
            <div class="list-container overflow-auto">
                <ListItem v-for="item in items" :title="item.message" :subtitle="`Subtitle: ${item.message}`"
                    :key="item.id" />
            </div>
            <ButtonAdd label="Neue Freigabe"></ButtonAdd>
        </Card>
    </Main>
</template>
