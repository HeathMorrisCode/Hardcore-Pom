let app = new Vue({
	el: "#app",
	data:{
		pomTime:25,
		breakTime:5,
		pomRunning:false,
		breakRunning:false,

		pomTimeSeconds:1500,
		pomTimeSecondsLeft:1500,

		breakTimeSeconds:300,
		breakTimeSecondsLeft:300,

		progressStyle:{
			width: '0%'
		},
		sounds:{
			alarm: new Audio("http://saltknife.com/fcc/itemopen.wav")
		}

	},
	watch: {
		pomTime: function (val) {
			if (!this.pomRunning){
				this.pomTimeSeconds = val * 60;
				this.pomTimeSecondsLeft = this.pomTimeSeconds;
			}
		},
		breakTime: function (val) {
			if (!this.breakRunning){
				this.breakTimeSeconds = val * 60;
				this.breakTimeSecondsLeft = this.breakTimeSeconds;
			}
		}
	},

	computed:{
				// pomTime(){
				// 	this.pomTime * 60;
				// },
			},
			methods:{
				startPom(){
					this.updatePomProgress("0%");
					this.endBreak();
					this.pomRunning = true;
					console.log("Pom Started");

					this.pomTimeSeconds, this.pomTimeSecondsLeft = this.pomTime * 60;
					this.decrementPomTimer();

					let pomTimer = setInterval(() => {
						// console.log('ticktock');

						this.decrementPomTimer();
						this.updatePomProgress();

						if (this.pomTimeSecondsLeft <= 0) {
							clearInterval(pomTimer);
							console.log("Out of time");
							this.sounds.alarm.cloneNode(true).play();
							this.endPom();
						}
						},1000); // turn to 1000 for production
				},

				endPom(){
					console.log("Pom Ended");
					this.pomTimeSecondsLeft = 0;
					this.pomRunning = false;
				},

				startBreak(){
					this.updateBreakProgress("100%");
					this.endPom();
					this.breakRunning = true;
					console.log("Break Started");

					this.breakTimeSeconds, this.breakTimeSecondsLeft = this.breakTime * 60;
					this.decrementBreakTimer();

					let breakTimer = setInterval(() => {
						// console.log('ticktock');

						this.decrementBreakTimer();
						this.updateBreakProgress();

						if (this.breakTimeSecondsLeft  <= 0) {
							clearInterval(breakTimer);
							console.log("Out of time");
							this.sounds.alarm.cloneNode(true).play();
							this.endBreak();
						}
						},1000); // turn to 1000 for production
				},

				endBreak(){
					console.log("Break Ended");
					this.breakTimeSecondsLeft = 0;
					this.breakRunning = false;
				},



				humanPomTime(){
					return ((this.pomTimeSecondsLeft % 60) < 10) ? Math.floor(this.pomTimeSecondsLeft / 60) + ":0" + this.pomTimeSecondsLeft % 60 : Math.floor(this.pomTimeSecondsLeft / 60) + ":" + this.pomTimeSecondsLeft % 60;
				},
				humanBreakTime(){
					return ((this.breakTimeSecondsLeft % 60) < 10) ? Math.floor(this.breakTimeSecondsLeft / 60) + ":0" + this.breakTimeSecondsLeft % 60 : Math.floor(this.breakTimeSecondsLeft / 60) + ":" + this.breakTimeSecondsLeft % 60;
				},


				decrementPomTimer(){
					this.pomTimeSecondsLeft -= 1;
				},
				decrementBreakTimer(){
					this.breakTimeSecondsLeft -= 1;
				},


				updatePomProgress(value = null){
					// console.log("updating pom progress bar");
					this.progressStyle.width = value || (100 - ((this.pomTimeSecondsLeft/this.pomTimeSeconds) * 100))+ "%";
				},
				updateBreakProgress(value = null){
					// console.log("updating break progress bar");
					this.progressStyle.width = value || ((this.breakTimeSecondsLeft/this.breakTimeSeconds) * 100)+ "%";
				}
			}
		});
