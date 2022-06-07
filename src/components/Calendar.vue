<template>
  <div class="text-center section mt-2">
    <h2 class="py-2 text-violet">Upcoming Events</h2>
    <v-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="propsToAttributes"
      disable-page-swipe
      is-expanded
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span class="day-label text-xs font-medium text-primary">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <div
              v-for="attr in attributes"
              :key="attr.key"
              class="text-xs text-white bg-violet leading-tight rounded-sm"
            >
              <router-link :to="{ name: 'event-details', params: { id: attr.customData.id } }">{{ attr.customData.title }}</router-link>
            </div>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
export default {
  props: ['events'],
  data() {
    return {
      masks: {
        weekdays: 'WWW',
      },
    };
  },
  computed: {
    propsToAttributes() {
      let attributes = []
      this.events.forEach(event => {
        if(!event.dates) return;
        
        attributes.push({
          key: event.id,
          customData: event,
          dates: event.dates.toDate()
        })        
      });

      return attributes;
    }
  }
};
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
::deep(.custom-calendar.vc-container) {
  --day-border: 1px solid #b58900;
  --day-border-highlight: 1px solid #b58900;
  --day-width: 40px;
  --day-height: 60px;
  --weekday-bg: #fdf6e3;
  --weekday-border: 1px solid #b58900;
  border-radius: 0;
  width: 100%;
  border-color: #b58900;

  & .vc-header {
    background-color: #b58900;
    padding: 10px 0;

    & .vc-title {
      color: white;
    }
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
    color: #b58900;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: #fdf6e3;
    &.weekday-1,
    &.weekday-7 {
      background-color: #fff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>