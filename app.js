
let vm = new Vue({
    el: '#app',
    data: {
       asteroids: [],
       error: ""
    },
    computed: {
        numAsteroids: function() {
            return this.asteroids.length;
        },
        closestObject: function() {
            var neosHavingData = this.asteroids.filter(neo => {
                return neo.close_approach_data.length > 0;
            });
            var simpleNeos = neosHavingData.map(neo => {
                return {name: neo.name, miles: neo.close_approach_data[0].miss_distance.miles}
            });
            var sortedNeos = simpleNeos.sort((a, b) => {
                return sortedNeos[0].name;
            })
        }
    },
    created: function() {
        this.fetchAsteroids();
    },
    methods: {
        fetchAsteroids: function() { 
            const apiKey = "Ujq7bIRNmithJ9nC9QYjYSx6ljQBPjTHvKVbxJES";
            const url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + apiKey;
           
            axios.get(url)
            .then(response => {
                vm.asteroids = response.data.near_earth_objects.slice(10);
                console.log(vm.asteroids)
            })
            .catch(error => {
                this.error = "There was an error fetching data" + error;
            })
        },
        getCloseApproachDate: function (a) {
            if (a.close_approach_data.length > 0) {
                return a.close_approach_data[0].close_approach_date;
            }
            return 'N/A';
        },
        remove: function(index) {
            this.asteroids.splice(index, 1);
        },
        isMissingData: function(a) {
            return a.close_approach_data.length == 0;
        }
    }
});
