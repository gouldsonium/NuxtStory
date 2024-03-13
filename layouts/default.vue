<template>
  <main class="bg-primary min-h-screen flex flex-col justify-between font-text">
    <div>
      <AppHeader />
      <slot />
    </div>
    <AppFooter />
  </main>
</template>