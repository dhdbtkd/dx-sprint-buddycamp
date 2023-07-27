<script>
    import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium';
    import "cesium/Build/Cesium/Widgets/widgets.css";
	import { onMount } from 'svelte';
    onMount(async ()=>{
        window.CESIUM_BASE_URL = '/Cesium/';

        Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYmM2NTg4Ny1iZDY5LTRlOTEtYjk0ZS1lMDY1NWY4N2VhOTgiLCJpZCI6MjIwNSwiaWF0IjoxNTMxOTg5Nzk0fQ.sPBKjs9mbYue8zBaLpMSUj8hzoF1wsgZcht1iUU2UGk';

        // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
        const viewer = new Viewer('viewer', {
            terrain: Terrain.fromWorldTerrain(),
            baseLayerPicker : false,
            fullscreenButton : false,
            geocoder : false,
            homeButton :false,
            infoBox : false,
            sceneModePicker : false,
            selectionIndicator : false,
            timeline : false,
            navigationHelpButton : false,
            navigationInstructionsInitiallyVisible : false,
            animation: false,

        });    

        // Fly the camera to San Francisco at the given longitude, latitude, and height.
        viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        orientation: {
            heading: CesiumMath.toRadians(0.0),
            pitch: CesiumMath.toRadians(-15.0),
        }
        });

        // Add Cesium OSM Buildings, a global 3D buildings layer.
        const buildingTileset = await createOsmBuildingsAsync();
        viewer.scene.primitives.add(buildingTileset);   
    })
</script>
<div class="mt-12 mb-16 h-full">
    <div id="viewer" class="h-full w-full">

    </div>
</div>
<style>
    :global(.cesium-viewer-bottom) {
        display: none !important;;
    }
</style>