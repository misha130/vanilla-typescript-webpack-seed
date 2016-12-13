<template>
    <h1 @click="hello">
        {{name}} is the best girl for {{i}} times
        <button @click.stop="add">+</button>
        <button @click.stop="sub">-</button>
    </h1>
</template>