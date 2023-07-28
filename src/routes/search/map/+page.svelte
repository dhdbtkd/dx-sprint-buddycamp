<script>
    import { Cartesian3, Cartesian2, HorizontalOrigin, LabelStyle, HeightReference, Color, NearFarScalar, VerticalOrigin, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer, ArcGisMapServerImageryProvider, ImageryLayer, ArcGisBaseMapType, DistanceDisplayCondition, MapboxImageryProvider, WebMapTileServiceImageryProvider,UrlTemplateImageryProvider,ScreenSpaceEventHandler,Cartographic, Math,ScreenSpaceEventType, defined, defaultValue, Entity } from 'cesium';
    import "cesium/Build/Cesium/Widgets/widgets.css";
	import { afterUpdate, onMount } from 'svelte';
    import { buddies_value } from '$lib/store';
    console.log("🚀 ~ file: +page.svelte:6 ~ buddies_value:", buddies_value)
    import BuddyModal from './map_buddy_modal.svelte'
	import Modal from '../../modal.svelte';

    let modalShow = false;
    let clickedBuddy;
    let viewer;
    let avatartPath;
    const addEntity = (viewer, buddy)=>{
        let avatar_path;
        let file_name = buddy.avatar_path.split("/")[buddy.avatar_path.split("/").length-1]
        if(buddy.position == 1){
            avatar_path = `/avatar/1/${file_name}`;
        } else if(buddy.position == 2) {
            avatar_path = `/avatar/2/${file_name}`;
        } else {
            avatar_path = `/avatar/3/${file_name}`;
        }
        if(avatar_path){
            const entity = viewer.entities.add({
                id: buddy.id,
                position: new Cartesian3.fromDegrees(Number(buddy.coord_x), Number(buddy.coord_y), 30),
                billboard: {
                    image: avatar_path,
                    show: true,
                    pixelOffset: new Cartesian2(0, 0),
                    eyeOffset: new Cartesian3(0.0, 0.0, 5),
                    horizontalOrigin: HorizontalOrigin.CENTER,
                    verticalOrigin: VerticalOrigin.CENTER,
                    scale: 0.45,
                    alignedAxis: Cartesian3.ZERO,
                    scaleByDistance: new NearFarScalar(1.5e3, 1, 4.5e4, 0.2),
                    disableDepthTestDistance : 0,
                    heightReference : HeightReference.RELATIVE_TO_GROUND
                },
                label: {
                    text: buddy.name,
                    pixelOffset: new Cartesian2(0.0, -80),
                    font: "24px KBO-Dia-Gothic-bold",
                    fillColor: Color.fromCssColorString("#000000"),
                    outlineColor: Color.fromCssColorString("#ffffff"),
                    outlineWidth: 2.5,
                    style: LabelStyle.FILL_AND_OUTLINE,
                    pixelOffsetScaleByDistance: new NearFarScalar(
                        1.5e3,
                        1.0,
                        4.5e4,
                        0.2
                    ),
                    scaleByDistance: new NearFarScalar(
                        5.5e3,
                        0.8,
                        4.5e4,
                        0.5
                    ),
                    disableDepthTestDistance : 0,
                    distanceDisplayCondition  : new DistanceDisplayCondition(
                        0.0,
                        3.0e4
                    ),
                },
            });
        }
        
    }
    onMount(async ()=>{
        window.CESIUM_BASE_URL = '/Cesium/';
        //mapbox
        var MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGhkYnRrZCIsImEiOiJjamszc2xoMHcxMmptM3FsZTZzcjlnZGl5In0.9_j7V_PfDKG5s-N9L1nvNQ';
        var MAPBOX_STYLE_ID = "light-v11"; //mapbox://styles/mapbox/dark-v11
        // var MAPBOX_STYLE_ID = "clkl9k41l006c01pw2euycw0h";
        var MAPBOX_USERNAME = 'mapbox';
        var defaultMap = 'https://api.mapbox.com/styles/v1/' + MAPBOX_USERNAME + '/' + MAPBOX_STYLE_ID + '/tiles/256/{z}/{x}/{y}?access_token=' + MAPBOX_ACCESS_TOKEN;
        
        Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYmM2NTg4Ny1iZDY5LTRlOTEtYjk0ZS1lMDY1NWY4N2VhOTgiLCJpZCI6MjIwNSwiaWF0IjoxNTMxOTg5Nzk0fQ.sPBKjs9mbYue8zBaLpMSUj8hzoF1wsgZcht1iUU2UGk';

        // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
        viewer = new Viewer('viewer', {
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

            // ImageryLayer.fromProviderAsync(
                // ArcGisMapServerImageryProvider.fromBasemapType(
                //     ArcGisBaseMapType.SATELLITE
                //     // other supported styles include:
                //     // ArcGisMapServerImageryProvider.HILLSHADE
                //     // Cesium.ArcGisMapServerImageryProvider.OCEANS
                //     )
            // ),

        });
        const blackMarble = ImageryLayer.fromProviderAsync(
            new UrlTemplateImageryProvider({
                url: defaultMap
            })
        );
        // viewer.scene.imageryLayers.add(blackMarble);
        

        viewer.resolutionScale = 1.5;
        // Fly the camera to San Francisco at the given longitude, latitude, and height.
        viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(127.54777070063693, 33.81592356687898, 570000),
            orientation: {
                heading: CesiumMath.toRadians(0.0),
                pitch: CesiumMath.toRadians(-72),
            },
            duration : 1,
        });
        if(buddies_value){
                    buddies_value.buddies.data.forEach(element => {
                        addEntity(viewer, element);
                    });
                }
        
        addClickEventMap(viewer);
    })
    const pickEntity = (viewer, windowPosition)=>{
        const picked = viewer.scene.pick(windowPosition);
        if (defined(picked)) {
            const id = defaultValue(picked.id, picked.primitive.id);
            if (id instanceof Entity) {
            return id;
            }
        }
        return undefined;
    }
    const addClickEventMap = (viewer)=>{
        const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function (movement) {
            const id = pickEntity(viewer, movement.position);
            if(id){
                clickedBuddy = buddies_value.buddies.data.find((buddy)=>{
                    return buddy.id == id.id
                });
                modalShow = true;
            }
            
        }, ScreenSpaceEventType.LEFT_CLICK);
    }
</script>
<div class="mt-12 mb-16 h-full overflow-hidden">
    <div id="viewer" class="h-full w-full">

    </div>
</div>
<a href="/search" class="absolute bottom-3 right-5 bg-blue-800 rounded-full w-14 h-14 mb-20 text-white flex justify-center items-center shadow-lg">
	<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>
</a>
{#if modalShow}
    <BuddyModal buddy={clickedBuddy} bind:modalShow={modalShow}></BuddyModal>
{/if}

<style>
    :global(.cesium-viewer-bottom) {
        display: none !important;;
    }
</style>