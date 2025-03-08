<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { onMounted, ref, useTemplateRef } from 'vue'
import { LatLng, LatLngBounds, Map, Marker, Polyline, TileLayer } from 'leaflet'

const refMap = useTemplateRef('mapping')
const map = ref<Map>()

onMounted(() => {
  const mapContainer = refMap.value as HTMLElement
  map.value = new Map(mapContainer)
  // map.value.setView(currentPosition, 15)
  //map.value.setView(new LatLng(props.init!.latitude, props.init!.longitude), 13)
  const tileLayer = new TileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  })
  tileLayer.addTo(map.value)

  const startPosition1 = new LatLng(-15.82594, -47.92923)
  const endPosition1 = new LatLng(-15.82942, -47.92765)
  const points1 = getPositions4().map((point) => new LatLng(point.latitude, point.longitude))
  const points2 = getPositions3().map((point) => new LatLng(point.latitude, point.longitude))

  addRoute(map.value, startPosition1, endPosition1, points1)
  addRoute(map.value, startPosition1, endPosition1, points2)

  //const startPosition2 = new LatLng(-15.82449, -47.92756)
  //const endPosition2 = new LatLng(-15.8276, -47.92621)
  //const points2 = getPositions2().map((point) => new LatLng(point.latitude, point.longitude))

  //addRoute(map.value, startPosition2, endPosition2, points2)

  map.value.marker(startPosition1).addTo(map.value)
  /*

  window.Echo.channel('rides').listen(
    'PositionUpdated',
    (response: { latitude: string; longitude: string }) => {
      console.log('Position updated', response)

      const pos = new LatLng(Number(response.latitude), Number(response.longitude))
      map.value.setView(pos, undefined, { animation: true })
      car.setLatLng(pos)
    },
  )
  */

  map.value = map.value
})

function addRoute(map: Map, startPosition: LatLng, endPosition: LatLng, points: LatLng[]) {
  setPosition(map, points[0])
  setPosition(map, points[points.length - 1])
  setDirection(map, points)
}

function setPosition(map: Map, position: LatLng) {
  const marker = new Marker(position)
  marker.addTo(map)

  map.setView(position, 14, { animate: true })
}

function setDirection(map: Map, directions: LatLng[]) {
  const colors = ['black', 'red', 'blue', 'green']

  const trace = new Polyline(directions, {
    color: colors[Math.floor(Math.random() * colors.length)],
    weight: 5,
    opacity: 0.9,
    smoothFactor: 1,
    className: 'animate-pulse',
  })
  trace.addTo(map)

  const bounds = new LatLngBounds(directions)
  map.fitBounds(bounds)
}

//rodoviaria -> centro
function getPositions4() {
  const pos = [
    [-56.073746, -15.614348],
    [-56.073705, -15.614301],
    [-56.071595, -15.615868],
    [-56.071296, -15.615934],
    [-56.070805, -15.615545],
    [-56.070035, -15.616195],
    [-56.070468, -15.61666],
    [-56.072697, -15.614697],
    [-56.08835, -15.601359],
    [-56.089115, -15.59933],
    [-56.089911, -15.597453],
    [-56.090717, -15.596126],
    [-56.092203, -15.595418],
    [-56.092791, -15.59551],
    [-56.093312, -15.595396],
    [-56.095311, -15.594241],
    [-56.09633, -15.595705],
    [-56.095621, -15.596533],
    [-56.095937, -15.596888],
  ]
  return pos.map((p) => ({ longitude: p[0], latitude: p[1] }))
}

// centro para shopping
function getPositions3() {
  const pos = [
    [-56.095937, -15.596888],
    [-56.09627, -15.59728],
    [-56.097639, -15.596066],
    [-56.094339, -15.591445],
    [-56.092414, -15.59304],
    [-56.091393, -15.59214],
    [-56.089919, -15.591647],
    [-56.088884, -15.590789],
    [-56.084765, -15.589284],
    [-56.083665, -15.588647],
    [-56.077098, -15.581778],
    [-56.076704, -15.580832],
    [-56.076354, -15.579036],
    [-56.073736, -15.575879],
    [-56.073521, -15.576152],
  ]

  return pos.map((p) => ({ longitude: p[0], latitude: p[1] }))
}

function getPositions() {
  return [
    { latitude: -15.82594, longitude: -47.92923 },
    { latitude: -15.8261, longitude: -47.92911 },
    { latitude: -15.82615, longitude: -47.92907 },
    { latitude: -15.82637, longitude: -47.92889 },
    { latitude: -15.82651, longitude: -47.92878 },
    { latitude: -15.82655, longitude: -47.92875 },
    { latitude: -15.82665, longitude: -47.92867 },
    { latitude: -15.82636, longitude: -47.92827 },
    { latitude: -15.82615, longitude: -47.92798 },
    { latitude: -15.82651, longitude: -47.9277 },
    { latitude: -15.82658, longitude: -47.92765 },
    { latitude: -15.82701, longitude: -47.92732 },
    { latitude: -15.82733, longitude: -47.92706 },
    { latitude: -15.82749, longitude: -47.92694 },
    { latitude: -15.8272, longitude: -47.92653 },
    { latitude: -15.82717, longitude: -47.9265 },
    { latitude: -15.82686, longitude: -47.92607 },
    { latitude: -15.82683, longitude: -47.92603 },
    { latitude: -15.82678, longitude: -47.92596 },
    { latitude: -15.82676, longitude: -47.92594 },
    { latitude: -15.82671, longitude: -47.92586 },
    { latitude: -15.82666, longitude: -47.92578 },
    { latitude: -15.82659, longitude: -47.92569 },
    { latitude: -15.82644, longitude: -47.92548 },
    { latitude: -15.8262, longitude: -47.92515 },
    { latitude: -15.82614, longitude: -47.92506 },
    { latitude: -15.82596, longitude: -47.92482 },
    { latitude: -15.8259, longitude: -47.92474 },
    { latitude: -15.82587, longitude: -47.9247 },
    { latitude: -15.82579, longitude: -47.92457 },
    { latitude: -15.82568, longitude: -47.92442 },
    { latitude: -15.8261, longitude: -47.92412 },
    { latitude: -15.82642, longitude: -47.92387 },
    { latitude: -15.82643, longitude: -47.92386 },
    { latitude: -15.82644, longitude: -47.92385 },
    { latitude: -15.82645, longitude: -47.92384 },
    { latitude: -15.82647, longitude: -47.92382 },
    { latitude: -15.82648, longitude: -47.9238 },
    { latitude: -15.82648, longitude: -47.92378 },
    { latitude: -15.82649, longitude: -47.92376 },
    { latitude: -15.82649, longitude: -47.92375 },
    { latitude: -15.8265, longitude: -47.92373 },
    { latitude: -15.8265, longitude: -47.92372 },
    { latitude: -15.8265, longitude: -47.9237 },
    { latitude: -15.8265, longitude: -47.92369 },
    { latitude: -15.82649, longitude: -47.92363 },
    { latitude: -15.8265, longitude: -47.92352 },
    { latitude: -15.8265, longitude: -47.92351 },
    { latitude: -15.8265, longitude: -47.92349 },
    { latitude: -15.82651, longitude: -47.92348 },
    { latitude: -15.82651, longitude: -47.92346 },
    { latitude: -15.82652, longitude: -47.92345 },
    { latitude: -15.82652, longitude: -47.92344 },
    { latitude: -15.82653, longitude: -47.92342 },
    { latitude: -15.82653, longitude: -47.92341 },
    { latitude: -15.82654, longitude: -47.9234 },
    { latitude: -15.82655, longitude: -47.92339 },
    { latitude: -15.82656, longitude: -47.92338 },
    { latitude: -15.82663, longitude: -47.92334 },
    { latitude: -15.8267, longitude: -47.92329 },
    { latitude: -15.82685, longitude: -47.92317 },
    { latitude: -15.827, longitude: -47.92305 },
    { latitude: -15.82711, longitude: -47.92298 },
    { latitude: -15.82721, longitude: -47.92291 },
    { latitude: -15.82731, longitude: -47.92283 },
    { latitude: -15.82741, longitude: -47.92274 },
    { latitude: -15.8275, longitude: -47.92267 },
    { latitude: -15.82758, longitude: -47.9226 },
    { latitude: -15.82761, longitude: -47.92257 },
    { latitude: -15.82764, longitude: -47.92255 },
    { latitude: -15.82775, longitude: -47.92246 },
    { latitude: -15.82787, longitude: -47.92238 },
    { latitude: -15.8281, longitude: -47.92222 },
    { latitude: -15.8281, longitude: -47.92223 },
    { latitude: -15.82811, longitude: -47.92223 },
    { latitude: -15.82812, longitude: -47.92224 },
    { latitude: -15.82812, longitude: -47.92225 },
    { latitude: -15.82813, longitude: -47.92225 },
    { latitude: -15.82814, longitude: -47.92226 },
    { latitude: -15.82815, longitude: -47.92226 },
    { latitude: -15.82816, longitude: -47.92227 },
    { latitude: -15.82817, longitude: -47.92227 },
    { latitude: -15.82818, longitude: -47.92228 },
    { latitude: -15.82819, longitude: -47.92228 },
    { latitude: -15.8282, longitude: -47.92228 },
    { latitude: -15.82821, longitude: -47.92228 },
    { latitude: -15.82822, longitude: -47.92228 },
    { latitude: -15.82823, longitude: -47.92228 },
    { latitude: -15.82824, longitude: -47.92227 },
    { latitude: -15.82825, longitude: -47.92227 },
    { latitude: -15.82826, longitude: -47.92227 },
    { latitude: -15.82826, longitude: -47.92226 },
    { latitude: -15.82827, longitude: -47.92226 },
    { latitude: -15.82828, longitude: -47.92225 },
    { latitude: -15.82847, longitude: -47.92251 },
    { latitude: -15.82853, longitude: -47.9226 },
    { latitude: -15.82923, longitude: -47.92354 },
    { latitude: -15.82935, longitude: -47.92373 },
    { latitude: -15.82947, longitude: -47.92391 },
    { latitude: -15.82947, longitude: -47.92392 },
    { latitude: -15.82946, longitude: -47.92393 },
    { latitude: -15.82946, longitude: -47.92394 },
    { latitude: -15.82946, longitude: -47.92395 },
    { latitude: -15.82945, longitude: -47.92396 },
    { latitude: -15.82945, longitude: -47.92397 },
    { latitude: -15.82945, longitude: -47.92398 },
    { latitude: -15.82946, longitude: -47.92399 },
    { latitude: -15.82946, longitude: -47.924 },
    { latitude: -15.82946, longitude: -47.92401 },
    { latitude: -15.82946, longitude: -47.92402 },
    { latitude: -15.82947, longitude: -47.92402 },
    { latitude: -15.82947, longitude: -47.92403 },
    { latitude: -15.82948, longitude: -47.92404 },
    { latitude: -15.82949, longitude: -47.92405 },
    { latitude: -15.8295, longitude: -47.92405 },
    { latitude: -15.8295, longitude: -47.92406 },
    { latitude: -15.82951, longitude: -47.92406 },
    { latitude: -15.82952, longitude: -47.92407 },
    { latitude: -15.82953, longitude: -47.92407 },
    { latitude: -15.82954, longitude: -47.92407 },
    { latitude: -15.82955, longitude: -47.92407 },
    { latitude: -15.82956, longitude: -47.92407 },
    { latitude: -15.82964, longitude: -47.92423 },
    { latitude: -15.82974, longitude: -47.92444 },
    { latitude: -15.82979, longitude: -47.9245 },
    { latitude: -15.82998, longitude: -47.92475 },
    { latitude: -15.82997, longitude: -47.92477 },
    { latitude: -15.82997, longitude: -47.92478 },
    { latitude: -15.82996, longitude: -47.92479 },
    { latitude: -15.82996, longitude: -47.9248 },
    { latitude: -15.82996, longitude: -47.92482 },
    { latitude: -15.82996, longitude: -47.92483 },
    { latitude: -15.82996, longitude: -47.92484 },
    { latitude: -15.82996, longitude: -47.92486 },
    { latitude: -15.82996, longitude: -47.92487 },
    { latitude: -15.82997, longitude: -47.92488 },
    { latitude: -15.82997, longitude: -47.92489 },
    { latitude: -15.82998, longitude: -47.9249 },
    { latitude: -15.82999, longitude: -47.92492 },
    { latitude: -15.82999, longitude: -47.92493 },
    { latitude: -15.83, longitude: -47.92494 },
    { latitude: -15.83001, longitude: -47.92495 },
    { latitude: -15.83002, longitude: -47.92496 },
    { latitude: -15.83003, longitude: -47.92497 },
    { latitude: -15.83004, longitude: -47.92497 },
    { latitude: -15.83005, longitude: -47.92498 },
    { latitude: -15.83006, longitude: -47.92499 },
    { latitude: -15.83008, longitude: -47.92499 },
    { latitude: -15.83009, longitude: -47.92499 },
    { latitude: -15.8301, longitude: -47.925 },
    { latitude: -15.83011, longitude: -47.925 },
    { latitude: -15.83013, longitude: -47.925 },
    { latitude: -15.83015, longitude: -47.925 },
    { latitude: -15.83022, longitude: -47.92511 },
    { latitude: -15.83034, longitude: -47.92529 },
    { latitude: -15.83041, longitude: -47.92536 },
    { latitude: -15.83047, longitude: -47.92543 },
    { latitude: -15.83063, longitude: -47.92564 },
    { latitude: -15.83063, longitude: -47.92565 },
    { latitude: -15.83062, longitude: -47.92565 },
    { latitude: -15.83062, longitude: -47.92566 },
    { latitude: -15.83061, longitude: -47.92566 },
    { latitude: -15.83061, longitude: -47.92567 },
    { latitude: -15.83061, longitude: -47.92568 },
    { latitude: -15.8306, longitude: -47.92568 },
    { latitude: -15.8306, longitude: -47.92569 },
    { latitude: -15.8306, longitude: -47.9257 },
    { latitude: -15.8306, longitude: -47.92571 },
    { latitude: -15.8306, longitude: -47.92572 },
    { latitude: -15.8306, longitude: -47.92573 },
    { latitude: -15.83061, longitude: -47.92573 },
    { latitude: -15.83061, longitude: -47.92574 },
    { latitude: -15.83061, longitude: -47.92575 },
    { latitude: -15.83062, longitude: -47.92575 },
    { latitude: -15.83062, longitude: -47.92576 },
    { latitude: -15.83063, longitude: -47.92576 },
    { latitude: -15.83063, longitude: -47.92577 },
    { latitude: -15.83064, longitude: -47.92577 },
    { latitude: -15.83068, longitude: -47.92593 },
    { latitude: -15.83068, longitude: -47.92596 },
    { latitude: -15.83068, longitude: -47.92599 },
    { latitude: -15.83065, longitude: -47.92606 },
    { latitude: -15.83044, longitude: -47.92624 },
    { latitude: -15.83041, longitude: -47.92626 },
    { latitude: -15.83038, longitude: -47.92628 },
    { latitude: -15.83035, longitude: -47.92631 },
    { latitude: -15.83033, longitude: -47.92634 },
    { latitude: -15.8303, longitude: -47.92636 },
    { latitude: -15.83029, longitude: -47.92637 },
    { latitude: -15.83028, longitude: -47.9264 },
    { latitude: -15.83027, longitude: -47.92642 },
    { latitude: -15.83025, longitude: -47.92644 },
    { latitude: -15.83024, longitude: -47.92646 },
    { latitude: -15.83024, longitude: -47.92648 },
    { latitude: -15.83023, longitude: -47.9265 },
    { latitude: -15.83022, longitude: -47.92651 },
    { latitude: -15.8302, longitude: -47.92656 },
    { latitude: -15.83018, longitude: -47.92661 },
    { latitude: -15.83015, longitude: -47.92665 },
    { latitude: -15.83012, longitude: -47.9267 },
    { latitude: -15.8301, longitude: -47.92674 },
    { latitude: -15.83006, longitude: -47.9268 },
    { latitude: -15.83003, longitude: -47.92684 },
    { latitude: -15.83001, longitude: -47.92686 },
    { latitude: -15.83, longitude: -47.92688 },
    { latitude: -15.82998, longitude: -47.9269 },
    { latitude: -15.82995, longitude: -47.92692 },
    { latitude: -15.82993, longitude: -47.92694 },
    { latitude: -15.82991, longitude: -47.92696 },
    { latitude: -15.82988, longitude: -47.92698 },
    { latitude: -15.82985, longitude: -47.92701 },
    { latitude: -15.82983, longitude: -47.92703 },
    { latitude: -15.8298, longitude: -47.92705 },
    { latitude: -15.82979, longitude: -47.92706 },
    { latitude: -15.82966, longitude: -47.92716 },
    { latitude: -15.82972, longitude: -47.92723 },
    { latitude: -15.8298, longitude: -47.92735 },
    { latitude: -15.82966, longitude: -47.92746 },
    { latitude: -15.82942, longitude: -47.92765 },
  ]
}

function getPositions2() {
  return [
    { latitude: -15.82449, longitude: -47.92756 },
    { latitude: -15.82404, longitude: -47.9269 },
    { latitude: -15.82397, longitude: -47.9268 },
    { latitude: -15.82386, longitude: -47.92661 },
    { latitude: -15.82418, longitude: -47.92636 },
    { latitude: -15.8243, longitude: -47.92627 },
    { latitude: -15.82436, longitude: -47.92623 },
    { latitude: -15.82441, longitude: -47.92619 },
    { latitude: -15.82452, longitude: -47.92611 },
    { latitude: -15.82465, longitude: -47.92601 },
    { latitude: -15.82478, longitude: -47.9259 },
    { latitude: -15.825, longitude: -47.9257 },
    { latitude: -15.82501, longitude: -47.92573 },
    { latitude: -15.82527, longitude: -47.92552 },
    { latitude: -15.82537, longitude: -47.92546 },
    { latitude: -15.82546, longitude: -47.92538 },
    { latitude: -15.82554, longitude: -47.92532 },
    { latitude: -15.82568, longitude: -47.92522 },
    { latitude: -15.8257, longitude: -47.9252 },
    { latitude: -15.82588, longitude: -47.92501 },
    { latitude: -15.82601, longitude: -47.9252 },
    { latitude: -15.82636, longitude: -47.92569 },
    { latitude: -15.82648, longitude: -47.92584 },
    { latitude: -15.82651, longitude: -47.92589 },
    { latitude: -15.82656, longitude: -47.92596 },
    { latitude: -15.8267, longitude: -47.92615 },
    { latitude: -15.82733, longitude: -47.92706 },
    { latitude: -15.82759, longitude: -47.9274 },
    { latitude: -15.82807, longitude: -47.92805 },
    { latitude: -15.82836, longitude: -47.92845 },
    { latitude: -15.82843, longitude: -47.92839 },
    { latitude: -15.82851, longitude: -47.92833 },
    { latitude: -15.82825, longitude: -47.92797 },
    { latitude: -15.82796, longitude: -47.92759 },
    { latitude: -15.82773, longitude: -47.92727 },
    { latitude: -15.82795, longitude: -47.92712 },
    { latitude: -15.82804, longitude: -47.92703 },
    { latitude: -15.82814, longitude: -47.92695 },
    { latitude: -15.82812, longitude: -47.92692 },
    { latitude: -15.8276, longitude: -47.92621 },
  ]
}
</script>

<template>
  <h1>Map</h1>
  <section ref="mapping" class="bg-gray-300 h-screen"></section>
</template>

<style></style>
