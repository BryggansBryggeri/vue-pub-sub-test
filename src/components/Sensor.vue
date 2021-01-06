<template>
  <div class="sensor">
    <h3>'{{ this.sensorId }}'</h3>
    <!-- Vue doesn't get enums so you have to put in the numeric literal '1'
    I.e.:
    `v-if="this.status === Success.Ok"` will not work
    This is prolly what vue-enums fix.
    -->
    <span v-if="this.status === 1" class="sensor-val-ok">{{ sensorMeasDisp }}&#8451;</span>
    <span v-else class="sensor-val-err">{{ sensorMeasDisp }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import capitalizeFirstLetter from "@/utils";
import { match } from "@/models/result";

enum Success {
  Ok = 1,
  Error = 2,
}

@Component({
  components: {},
})
export default class Sensor extends Vue {
  @Prop() sensorId!: string;

  get dispName(): string {
    return capitalizeFirstLetter(this.sensorId);
  }

  get status(): Success {
    return match(
      eventStore.sensorVal(this.sensorId),
      () => Success.Ok,
      () => Success.Error
    );
  }

  get sensorMeasDisp(): string {
    console.log("sensor", this.sensorId);
    return match(
      eventStore.sensorVal(this.sensorId),
      (ok) => ok.toFixed(2),
      (err) => "Error!"
    );
  }
}
</script>
