<template>
  <main class="bg-gray-50 dark:bg-gray-800 min-h-screen flex flex-col justify-between">
    <div>
      <AppHeader />
      <slot />
    </div>
    <AppFooter />
  </main>
</template>