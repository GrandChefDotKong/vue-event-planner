<template>
  <div class="">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script setup lang="ts">
/*
import { projectStore } from '@/firebase/config';
import getUser from '@/composables/auth/getUser';
import { onMounted, ref } from 'vue';
import { collection, doc, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { useRouter } from 'vue-router';

  const lat = ref(53);
  const lng = ref(-2);

  const { user } = getUser();
  const router = useRouter();

  const renderMap = async () => {
    const mapEl = document.getElementById('map');
    if(!mapEl) return;

    console.log('mapEl : OK');

    const map = new google.maps.Map(mapEl, {
      center: { lat: lat.value, lng: lng.value },
      zoom: 10,
      maxZoom: 20, 
      minZoom: 3,
      streetViewControl: false,
    })

    let marker = new google.maps.Marker({
      position: {
        lat: lat.value,
        lng: lng.value,
      },
      map
    })

  ;}

  onMounted(() => {
    if(navigator.geolocation) {
      console.log('geolocalisation : OK')
      navigator.geolocation.getCurrentPosition(async(pos) => {
        lat.value = pos.coords.latitude;
        lng.value = pos.coords.longitude;

        console.log(`lat : ${lat.value} ; lng : ${lng.value}`)
        renderMap();
      }, (err) => {
        console.log(err.message)
        renderMap();
      }, { maximumAge: 60000, timeout: 3000 })
    } 
  }) 
  */ 
</script>

<style>
.google-map {
  width: 100%;
  height: 90%;
  margin: 0 auto;
  background-color: #FFF;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
}
</style>
