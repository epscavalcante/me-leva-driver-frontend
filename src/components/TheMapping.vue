<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { onMounted, ref, useTemplateRef } from 'vue'
import { LatLng, LatLngBounds, Map, Marker, Polyline, TileLayer } from 'leaflet'

const refMap = useTemplateRef('mapping')
const map = ref<Map>()

type Coordinate = {
  latitude: number
  longitude: number
}

type Props = {
  currentPosition?: Coordinate
  startPosition?: Coordinate
  endPosition?: Coordinate

  routing?: Coordinate[]
}

const props = defineProps<Props>()

onMounted(() => {
  const mapContainer = refMap.value as HTMLElement
  map.value = new Map(mapContainer)
  // map.value.setView(currentPosition, 15)
  //map.value.setView(new LatLng(props.init!.latitude, props.init!.longitude), 13)
  const tileLayer = new TileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  })
  tileLayer.addTo(map.value)

  if (props.currentPosition) {
    const currentPosition = new LatLng(
      props.currentPosition.latitude,
      props.currentPosition.longitude,
    )

    setPosition(map.value, currentPosition)
  }

  if (props.startPosition) {
    const startPosition = new LatLng(props.startPosition.latitude, props.startPosition.longitude)
    setPosition(map.value, startPosition)
  }

  if (props.endPosition) {
    const position = new LatLng(props.endPosition.latitude, props.endPosition.longitude)
    const marker = new Marker(position)
    marker.addTo(map.value)

    // map.value.setView(, 14, { animate: true })
  }

  if (props.routing && props.routing.length) {
    const points = props.routing.map((point) => new LatLng(point.latitude, point.longitude))
    setDirection(map.value, points)
  }

  map.value = map.value
})

function setPosition(map: Map, position: LatLng) {
  const marker = new Marker(position)
  marker.addTo(map)

  map.setView(position, 14, { animate: true })
}

function setDirection(map: Map, directions: LatLng[]) {
  const trace = new Polyline(directions, {
    color: 'black',
    weight: 5,
    opacity: 1,
    className: 'animate-pulse',
  })
  trace.addTo(map)

  const bounds = new LatLngBounds(directions)
  map.fitBounds(bounds)
}
</script>

<template>
  <section ref="mapping" class="bg-gray-300 h-full"></section>
</template>

<style></style>
