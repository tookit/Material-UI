<template>
  <div class="g-map" style="height:100vh" />
</template>

<script>
import gmapsInit from '@/utils/gmap'
import MarkerClusterer from '@google/markerclusterer'
export default {
  name: 'GMap',
  props: {
    locations: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      gmap: null,
      google: null,
      markers: [],
      markerCluster: null
    }
  },

  watch: {
    locations: {
      handler(locations) {
        this.drawMarker(locations)
      },
      deep: true
      // immediate: true,
    }
  },
  methods: {
    reset() {},
    drawMarker(locations) {
      console.log('drawing map', locations)
      const map = this.gmap
      map.setZoom(2)
      // remove exists markers
      this.clearMarkers()
      const google = this.google
      const that = this
      const oms = new window.OverlappingMarkerSpiderfier(map, {
        markersWontMove: true,
        markersWontHide: true,
        basicFormatEvents: true
      })

      const markers = locations.map(function(item, i) {
        const label = item.item._source.label
        const marker = new google.maps.Marker({
          position: item.location
        })
        oms.addMarker(marker)
        google.maps.event.addListener(marker, 'click', function(e) {
          // 'spider_click', not plain 'click'
          // if (marker._omsData !== undefined) {
          //   that.$emit("viewEntity", item.item);
          //   return;
          // }
          that.$emit('view:entity', item.item)
        })
        return marker
      })
      this.markers = markers
      const minClusterZoom = 14
      // Add a marker clusterer to manage the markers.
      const markerCluster = new MarkerClusterer(map, markers, {
        // https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m
        imagePath: '/static/markerclusterer/m',
        maxZoom: minClusterZoom
      })
      this.markerCluster = markerCluster
      // oms.addListener("click", function(e) {
      //   console.log("oms clciked", e);
      // });
      // google.maps.event.addListener(markerCluster, "clusterclick", cluster => {
      //   map.fitBounds(cluster.getBounds()); // Fit the bounds of the cluster clicked on
      //   if (map.getZoom() > minClusterZoom + 1)
      //     // If zoomed in past 15 (first level without clustering), zoom out to 15
      //     map.setZoom(minClusterZoom + 1);
      // });
    },
    clearMarkers() {
      if (this.markers.length > 0) {
        this.markers.map((m) => m.setMap(null))
      }
      if (this.markerCluster) {
        this.markerCluster.clearMarkers()
      }
    }
  },
  async created() {
    try {
      const that = this
      const google = await gmapsInit()
      const center = new google.maps.LatLng(37.4419, -122.1419)
      const map = new google.maps.Map(this.$el, {
        zoom: 2,
        center: center
      })
      this.gmap = map
      this.google = google
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
