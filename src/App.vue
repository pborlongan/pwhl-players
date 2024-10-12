<template>
  <div class="container h-auto mx-auto my-auto p-5 bg-blue-100 flex flex-row">
    <div class="w-3/4 h-full bg-emerald-300 flex flex-wrap gap-[10px] justify-evenly mx-5" >
      <PlayerCard
          v-for="(item, index) in players"
          :item="item"
          :index="index"
          :key="index"
      />
    </div>
    <div class="w-1/4 h-full bg-amber-100">
      d
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerCard from "@/components/PlayerCard.vue";
import {usePWHLStore} from "@/stores/pwhlStore";
import {ref} from "vue";

const store = usePWHLStore();
let players = ref([]);

store.getAllPlayers()
players.value = store.clearedPlayers;

</script>
