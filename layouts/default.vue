<template>
  <main class="bg-primary min-h-screen flex flex-col justify-between">
    <div>
      <AppHeader />
      <slot />
    </div>
    <AppFooter />
  </main>
</template>