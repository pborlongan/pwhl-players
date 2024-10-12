<template>
  <div class="bg-cyan-50 flex-grow-0 flex-shrink-0 basis-[32%] relative mt-16 flex justify-center rounded-md">
    <div class="h-24 w-24 object-cover overflow-hidden absolute top-[-50px] rounded-full">
      <img :src="playerImage" alt="Player Image" @error="onImageError"/>
    </div>
    <div class="player-info w-full mt-12 flex flex-col justify-center">
      <span># {{ jerseyNumber }}</span>
      <h2> {{ firstName }}</h2>
      <h3> {{ lastName }}</h3>
      <div class="tags">
        <div class="team">
          {{ teamName }}
        </div>
        <div class="position">
          Goalie
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['item'])

const playerImage = props.item.playerLink.playerImage;
const jerseyNumber = props.item.playerData.jerseyNumber;
const firstName = props.item.playerData.firstName;
const lastName = props.item.playerData.lastName;
const teamName = props.item.playerData.teamName;

const fallbackImage = 'https://lscluster.hockeytech.com/statview-1.4.1/img/headshot-default.jpg';

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = fallbackImage;
};

</script>