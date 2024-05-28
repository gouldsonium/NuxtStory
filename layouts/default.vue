<template>
  <main class="min-h-screen flex flex-col justify-between font-text bg-gray-50 dark:bg-gray-800">
    <div>
      <AppHeader />
      <slot />
    </div>
    <AppFooter />
  </main>
</template>