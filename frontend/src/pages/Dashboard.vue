<template>
<div class="internal-page">
  <div class="top-line">
    <div class="container">
      <div class="col-md-5 col-md-offset-7">
        <ul class="main-nav">
          <li><a href="">About</a></li>
          <li><a href="">FAQ</a></li>
          <li><a href="">Guide</a></li>
          <li class="social"><a href=""><i class="icon icon-tw"></i></a></li>
          <li class="social"><a href=""><i class="icon icon-fb"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
 
  <div class="header">
    <div class="container">
      <div class="col-md-2">
        <div class="logo">
          <img src="../assets/img/logo.svg" alt="">
        </div>
      </div>
      <div class="col-md-2 col-md-offset-6">
        <router-link to="/review/srs">
          <button v-if="isNaN(reviewData.next_review)" disabled class="btn btn-red">Reviews: 0 </button>
          <button v-else class="btn btn-red">Reviews: {{ reviewData.next_review }} </button>
        </router-link>
      </div>
      <div class="col-md-2">
        <div class="user-dropdown">
          <div class="user-dropdown__img">
            <img src="../assets/img/content/user@2x.png" class="img-responsive" alt="">
          </div>
          <div class="dropdown">
            <span class="user-dropdown__name">
              {{reviewData.username }} 
            </span>
            <div class="dropdown-content">
              <span v-on:click="logout">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  <div class="graph">
    <div class="container">
      <div class="col-md-2 graph__side">
        <div class="panel">
          <p class="panel__title">{{ reviewData.next_review }}</p>
          <p class="panel__text">Reviews Due Now</p>
        </div>
        <div class="panel">
          <p class="panel__title">{{ reviewData.next_day }}</p>
          <p class="panel__text">Due Next 24 Hrs</p>
        </div>
        <p class="dark-title">NEW WORDS ADDED</p>
        <div class="panel panel-double">
          <div class="panel-double__left">
            <p class="panel__title">{{ analyticsData.words_studied_count_today }}</p>
            <p class="panel__text">Today</p>
          </div>
          <div class="panel-double__right">
            <p class="panel__title">15</p>
            <p class="panel__text">Daily Goal</p>
          </div>
        </div>
        <p class="dark-title">WORDS REVIEWED</p>
        <div class="panel panel-double">
          <div class="panel-double__left">
            <p class="panel__title">{{ analyticsData.words_reviewed_count_today }}</p>
            <p class="panel__text">Today</p>
          </div>
          <div class="panel-double__right">
            <p class="panel__title">N/A</p>
            <p class="panel__text">Best</p>
          </div>
        </div>
      </div>
      <div class="col-md-8 graph__wrap">
        <lineChart 
        v-if=chartFetchComplete
        v-bind:data=chartData
        v-bind:height=250
        ></lineChart>
      </div>
      <div class="col-md-2 graph__side">
        <div class="panel">
          <div class="graph-stat">
            <p class="graph-stat__text">Total Reviews</p>
            <p class="graph-stat__number">{{ analyticsData.words_reviewed_count }}</p>
          </div>
          <div class="graph-stat">
            <p class="graph-stat__text">Words reviewed correct</p>
            <p class="graph-stat__number">{{ analyticsData.percent_correct }}<sup>%</sup></p>
          </div>
          <div class="graph-stat">
            <p class="graph-stat__text">Word Progress</p>
            <p class="graph-stat__number">{{ analyticsData.progress_percent }}<sup>%</sup></p>
          </div>
          <div class="graph-stat">
            <p class="graph-stat__text">Kanji Progress</p>
            <p class="graph-stat__number">coming soon</p>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  <div class="stuff">
    <div class="container">
      <div v-if="initialFetchComplete" class="panel stuff-head">
        <div v-for="n in 10" class="stuff-head-item">
          <p class="stuff-head-item__title">{{ wordLevelNames[n-1] }}</p>
          <p class="stuff-head-item__number">{{ reviewData.tier_counts[n-1] }}</p>
        </div>
      </div>

      <div class="level" v-for="(chunk, index) in reviewDeck">
        <div class="row">
          <div class="col-md-2">
            <p class="level__title"><span>{{ index + 1 }}</span> Level</p>
          </div>
          <div class="col-md-10">
            <p class="level__lessons-number">{{ chunk.completed_count }}/20 lessons</p>
            <div class="level__progress">
              <div class="level__progress-inner" v-bind:style="{ width: percent(chunk.completed_count, 20) + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="level__wrap">
          <div class="level-slider js-level-slider">
            <div v-for="deck in chunk.chunk_list">
              <div class="level-slider__slide">
                <router-link :to="{ name: 'deck', params: { lvl:deck.sets_fk.level, sublevel:deck.sets_fk.sub_level} }">
                  <div class="panel lesson-panel" v-bind:class="{checked: deck.completion_status}">
                    <p class="lesson-panel__number">{{ deck.sets_fk.sub_level }} lesson</p>
                    <p class="lesson-panel__words">5 words</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="container">
      <div class="col-md-7">
        <p class="copyright">Copyright 2016. Kanjisama.com. All rights reserved.</p>
      </div>
      <div class="col-md-5">
        <ul class="main-nav">
          <li><a href="">About</a></li>
          <li><a href="">FAQ</a></li>
          <li><a href="">Guide</a></li>
          <li class="social"><a href=""><i class="icon icon-tw"></i></a></li>
          <li class="social"><a href=""><i class="icon icon-fb"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import auth from '../auth'
import lineChart from '../components/charts/lineGraph'
export default {
  name: 'DASBOARD',
  data () {
    return {
      msg: 'The route works',
      initialFetchComplete: false,
      reviewDeck: [],
      userProfile: [],
      analyticsData: [],
      reviewData: [],
      wordLevelNames: ['ゼロ', '一', '二', '三', '四', '五', '六', '七', '八', 'パス'],
      chartData: '',
      chartFetchComplete: false,
      errors: null
    }
  },
  components: {
    'lineChart': lineChart
  },
  head: {
    title: function () {
      return {
        inner: 'kanjisama',
        complement: 'dashboard'
      }
    },
    script: [
      { type: 'text/javascript', src: 'https://code.jquery.com/jquery-2.2.4.min.js' }
    ]
  },
  created () {
    this.getReviewDeck()
    this.getReviewData()
    this.getAnalyticsData()
    this.getChartData()
    // TODO hack - this inserts jquery and slick carousel into this page for carousel animation - will switch to pure javascript alternative
    setTimeout(function () {
      var el = document.createElement('script')
      el.setAttribute('type', 'text/javascript')
      el.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js')
      document.getElementsByTagName('head')[0].appendChild(el)
    }, 500)
  },
  methods: {
    setSlick () {
/* eslint-disable */
      $(document).ready(function () {
        $('.js-level-slider').slick({
          infinite: false,
          slidesToShow: 5,
          slidesToScroll: 5,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll:3
              }
            },
            {
              breakpoint: 420,
              settings: {
                slidesToShow: 2,
                slidesToScroll:2
              }
            }
          ]
        })
      })
    },
    getReviewDeck () {
      var url = '/api/user-decks/get'
      this.$http.get(url, {headers: auth.getAuthHeader()})
      .then(response => {
        this.errors = null
        this.reviewDeck = response.data
        var self = this
        setTimeout(function () {
          self.setSlick()
        }, 1000)
      }, error => {
        if (error) {
          this.errors = 'Could not fetch deck from server!'
        }
      })
    },
    getUserProfile () {
      var url = '/api/profile-data/get'
      this.$http.get(url, {headers: auth.getAuthHeader()})
      .then(response => {
        this.errors = null
        this.userProfile  = response.data
      }, error => {
        if (error) {
          this.errors = 'Could not fetch deck from server!'
        }
      })
    },
    getAnalyticsData () {
      var url = '/api/analytics-data/get'
      this.$http.get(url, {headers: auth.getAuthHeader()})
      .then(response => {
        this.errors = null
        this.analyticsData = response.data
      }, error => {
        if (error) {
          this.errors = 'Could not fetch deck from server!'
        }
      })
    },
    getReviewData () {
      var url = '/api/review-data/get'
      this.$http.get(url, {headers: auth.getAuthHeader()})
      .then(response => {
        this.errors = null
        this.reviewData = response.data
        this.initialFetchComplete = true
      }, error => {
        if (error) {
          this.errors = 'Could not fetch deck from server!'
        }
      })
    },
    logout: function () {
      auth.logout()
    },
    getChartData() {
      var url = '/api/chart-data/get'
      this.$http.get(url, {headers: auth.getAuthHeader()})
      .then(response => {
        this.errors = null
        var data = response.data
        this.chartData =
        {
          labels: data.x_axis_data,
          datasets: [
            {
              label: 'Goal',
              backgroundColor: '#e4502d',
              borderColor: '#e4502d',
              fill: false,
              data: data.ideal_data_points
            },
            {
              label: 'Words studied',
              backgroundColor: '#1ed39b',
              borderColor: '#19be8b',
              data: data.data_points
            }
          ]
        }
        this.chartFetchComplete = true
      }, error => {
        if (error) {
          this.errors = 'Could not fetch deck from server!'
        }
      })
    },
    percent: function (numerator, denominator) {
      return numerator * 100 / denominator
    },
    logout: function () {
      auth.logout()
    }
  },
  route: {
    // Check the users auth status before
    // allowing navigation to the route
    canActivate() {
      return auth.user.authenticated
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.dropbtn {
    cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content span {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
}

/* Change color of dropdown links on hover */
.dropdown-content span:hover {background-color: #f1f1f1}

.user-dropdown {
    cursor:pointer
}
/* Show the dropdown menu on hover */
.user-dropdown:hover .dropdown-content {
    display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
}
</style>
