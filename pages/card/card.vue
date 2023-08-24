<template>
  <div class="card" :class="{ 'dark-theme': darkTheme }">
    <div class="card-header">{{ title }}</div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div class="card-footer">{{ footer }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    footer: String
  }
}
</script><template>
  <div class="card">
    <div class="card-header">{{ title }}</div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div class="card-footer">{{ footer }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    footer: String
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  transition: box-shadow 0.3s ease; /* 添加阴影变化的过渡效果 */
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 鼠标悬停时增加阴影效果 */
}

.card-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-content {
  font-size: 16px;
  margin-bottom: 16px;
}

.card-footer {
  font-size: 14px;
  color: #666;
}
</style>


<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-content {
  font-size: 16px;
  margin-bottom: 16px;
}

.card-footer {
  font-size: 14px;
  color: #666;
}
</style>