<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
    <LandingNavbar />
    <LandingHero />
    <LandingFeatures />
    <LandingHowItWorks />
    <!-- <LandingStats /> -->
    <LandingCTA />
    <LandingFooter />
  </div>
</template>

<script setup>
import LandingNavbar from '@/components/landing/LandingNavbar.vue'
import LandingHero from '@/components/landing/LandingHero.vue'
import LandingFeatures from '@/components/landing/LandingFeatures.vue'
import LandingHowItWorks from '@/components/landing/LandingHowItWorks.vue'
import LandingStats from '@/components/landing/LandingStats.vue'
import LandingCTA from '@/components/landing/LandingCTA.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
</script>

<style>
/* Smooth scroll global para a landing page */
html {
  scroll-behavior: smooth;
}
</style>
