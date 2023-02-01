<template>
  <section class="section">

    <h3 class="is-title">Kalenderdaten</h3>

    <b-table
      :data="isEmpty ? [] : calendars"
      @page-change="onPageChange"
      :bordered="false"
      :striped="false"
      :narrowed="false"
      :hoverable="false"
      :loading="isLoading"
      :focusable="false"
      :mobile-cards="false"
      :row-class="(row) => status(row)"
    >
      <b-table-column
        sortable
        field="serial"
        label="#"
        width="40"
        :td-attrs="columnTdAttrs"
        numeric
        v-slot="props"
      >
        {{ props.row.serial }}
      </b-table-column>

      <b-table-column
        sortable
        field="created_at"
        label="Eingang"
        :td-attrs="columnTdAttrs"
        v-slot="props"
      >
        {{ new Date(props.row.created_at).toLocaleDateString() }}
      </b-table-column>

      <b-table-column
        class="is-hidden-mobile"
        field="cover"
        label="Umschlag"
        :td-attrs="columnTdAttrs"
        v-slot="props"
      >
        <a :href="$resizedImg($config.imageapi_url, calendarCover(props.row.serial, 'back'), 'original')" target="_blank">
          <img class="coverimg" :src="$resizedImg($config.imageapi_url, calendarCover(props.row.serial, 'back'))"/>
        </a>
         <a :href="$resizedImg($config.imageapi_url, calendarCover(props.row.serial, 'front'), 'original')" target="_blank">
          <img class="coverimg" :src="$resizedImg($config.imageapi_url, calendarCover(props.row.serial, 'front'))"/>
        </a>

      </b-table-column>

      <b-table-column field="settings" label="" :td-attrs="columnTdAttrs">
        <div class="buttons">
          <!--<b-button>
            <b-icon icon="cog-refresh" type=""></b-icon>
            <span class="is-hidden-mobile">Bearbeiten</span>
          </b-button>-->
          
        </div>
      </b-table-column>



    </b-table>







  </section>
</template>

<script>
export default {
  
  layout: 'backend',

  data() {
    return {
      data: [],
      calendars: [],
      isEmpty: false,
      isLoading: true,
    };
  },

  mounted() {
    this.loadAsyncData();
  },

  methods: {
    async loadAsyncData() {
      //this.data = await this.$axios.$get('projects')
      this.calendars = await this.$axios.$get('calendars')
      this.isLoading = false
    },

    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },

    status(row) {
      if (row.finished_at) {
        return "finishedorder";
      } else {
        const created_at = new Date(row.created_at);
        if (created_at < getDateSinceDays(14)) {
          return "toooldorder";
        } else if (created_at < getDateSinceDays(7)) {
          return "oldorder";
        } else {
          return "order";
        }
      }

      function getDateSinceDays(days) {
        const now = new Date();
        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - days
        );
      }
    },

    columnTdAttrs(row, column) {
      if (row.id === "Total") {
        if (column.label === "ID") {
          return {
            colspan: 4,
            class: "has-text-weight-bold",
            style: {
              "text-align": "left !important",
            },
          };
        } else if (column.label === "Gender") {
          return {
            class: "has-text-weight-semibold",
          };
        } else {
          return {
            style: { display: "none" },
          };
        }
      }
      return null;
    },

    getCalendar(serial) {
      return this.calendars.find(el => el.serial == serial)
    },

    calendarCover(serial, side) {
      if(this.isLoading) {
        // während noch auf AsyncData gewartet wird
        return "/"
      } else {
        const calendar = this.getCalendar(serial)
        if (side == 'front') {
          return calendar.renderedFrontcover
        } else {
          return calendar.renderedBackcover
        }
      }


    },
  },
};
</script>

<style lang="scss" >
@import "~/assets/styles/variables.scss";
.coverimg {
  width: 50px;
}

.oldorder {
  background-color: $warning-light;
}
.toooldorder {
  background-color: $danger-light;
}
.finishedorder {
  background-color: $success-light;
}
</style>