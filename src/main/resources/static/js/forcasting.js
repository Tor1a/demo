////////////////////////////////////////////////////////////////
// * 기상청 날씨 조회 : v1.0
class Weather {
	self = null;
	timer = null;
	
	#axisX = 0;
	#axisY = 0;

	#RE = 6371.00877; // 지구 반경(km)
	#GRID = 5.0; // 격자 간격(km)
	#SLAT1 = 30.0; // 투영 위도1(degree)
	#SLAT2 = 60.0; // 투영 위도2(degree)
	#OLON = 126.0; // 기준점 경도(degree)
	#OLAT = 38.0; // 기준점 위도(degree)
	#XO = 43; // 기준점 X좌표(GRID)
	#YO = 136; // 기1준점 Y좌표(GRID)

	constructor() {
		//반드시 self에 보관해야, ajax의 complete의 setTimeout callback에서 객체 method를 호출하는데 문제가 없음
		self = this;
	}

	// LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
	// 		return rs['x'], rs['y'] --> 목동비즈타워 : rs['x']=58, rs['y']=126
	dfs_xy_conv(code, v1, v2) {
		let DEGRAD = Math.PI / 180.0;
		let RADDEG = 180.0 / Math.PI;

		let re = this.#RE / this.#GRID;
		let slat1 = this.#SLAT1 * DEGRAD;
		let slat2 = this.#SLAT2 * DEGRAD;
		let olon = this.#OLON * DEGRAD;
		let olat = this.#OLAT * DEGRAD;

		let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
		sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
		
		let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
		sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
		
		let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
		ro = re * sf / Math.pow(ro, sn);
		
		let rs = {};
		
		if (code == "toXY") {
			rs['lat'] = v1;
			rs['lng'] = v2;
			
			let ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
			ra = re * sf / Math.pow(ra, sn);
			
			let theta = v2 * DEGRAD - olon;
			if (theta > Math.PI) theta -= 2.0 * Math.PI;
			if (theta < -Math.PI) theta += 2.0 * Math.PI;
			theta *= sn;
			
			rs['x'] = Math.floor(ra * Math.sin(theta) + this.#XO + 0.5);
			rs['y'] = Math.floor(ro - ra * Math.cos(theta) + this.#YO + 0.5);
		}
		else {
			rs['x'] = v1;
			rs['y'] = v2;
			
			let xn = v1 - this.#XO;
			let yn = ro - v2 + this.#YO;
			
			ra = Math.sqrt(xn * xn + yn * yn);
			if (sn < 0.0) - ra;
			
			let alat = Math.pow((re * sf / ra), (1.0 / sn));
			alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

			if (Math.abs(xn) <= 0.0) {
				theta = 0.0;
			}
			else {
				if (Math.abs(yn) <= 0.0) {
					theta = Math.PI * 0.5;
					if (xn < 0.0) - theta;
				}
				else theta = Math.atan2(xn, yn);
			}
			
			let alon = theta / sn + olon;
			rs['lat'] = alat * RADDEG;
			rs['lng'] = alon * RADDEG;
		}
		
		return rs;
	}
	
	setPlace(longitude, latitude){
		this.longitude = longitude;
		this.latitude = latitude;

		let xy = this.dfs_xy_conv("toXY", latitude, longitude);
		//console.log('격자 좌표:' + xy['x'] + ' ' + xy['y']);
		
		this.#axisX = xy['x'];
		this.#axisY = xy['y'];	
		
		this.getForcasting();
	}
		
	//매시 30분 이후에 발표 : 매시각 45분 이후 호출
	getForcasting(){
		if (this.timer != null){
			//console.log('----->' + this.#axisX + ' ' + this.#axisY + ' ' + this.timer);
			clearTimeout(this.timer);
			this.timer = null;
		}
		
		if (this.#axisX == 0) return;
		if (this.#axisY == 0) return;
			
		let today = new Date();
		let todayStr = today.toString();
		
		if (today.getMinutes() < 45) today.setHours(today.getHours() - 1);
		
		let date = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + today.getDate()).slice(-2);	
		let time = ("0" + today.getHours()).slice(-2) + "30";	//("0" + today.getMinutes()).slice(-2) + ("0" + today.getSeconds()).slice(-2);

		$.ajax({
			//getUltraSrtNcst : 초단기실황조회 (하늘 상태가 없음)
			//getUltraSrtFcst : 초단기예보조회
			url: 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',	// 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
			type: 'GET',   // HTTP 요청 메소드(GET, POST 등)
			data: { 	// HTTP 요청과 함께 서버로 보낼 데이터
				pageNo: '1',
				numOfRows: '1000',
				dataType: 'JSON',
				serviceKey: '99tI970CKbVkZyvZEwcpvmRdBMkzxZMwi+NVVefQ74/aRmkOiN5C1xX4OpJ5TbW0Qm5qg2L/qOJekYof6ym8yA==',
				base_date: date,
				base_time: time,
				nx: this.#axisX,
				ny: this.#axisY
			},
			datatype: "JSON",
			
			success: function (data, statusText, jqXHR) {
				/*	{"response": 
						{
							"header": {"resultCode":"00","resultMsg":"NORMAL_SERVICE"},
							"body": {
								"dataType":"json",
								"items": {
									"item":[
										//하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
										{"baseDate": "20230317","baseTime": "2230","category": "SKY","fcstDate": "20230317","fcstTime": "2300","fcstValue": "3","nx": 58,"ny": 126},
										
										//기온
										{"baseDate": "20230317","baseTime": "2230","category": "T1H","fcstDate": "20230317","fcstTime": "2300","fcstValue": "9","nx": 58,"ny": 126},
									]
								},
								"pageNo":1,
								"numOfRows":1000,
								"totalCount":8
							}
						}
					}

					let json = JSON.stringify(data);
					console.log(json) // You can get the object now 

					console.log(data.response.header.resultCode);
					for (let i = 0; i < data.response.body.items.item.length; i++) {
						console.log(data.response.body.items.item[i].category + ' ' + data.response.body.items.item[i].fcstTime + ' ' + data.response.body.items.item[i].fcstValue);
					}
				*/
				//let json = JSON.stringify(data);
				//console.log(json) // You can get the object now 

				try {
					if (data.response.header.resultCode == '00') {
						let sky = '';
						for (let i = 0; i < data.response.body.items.item.length; i++) {
							if (data.response.body.items.item[i].category == 'SKY') {
								//console.log(data.response.body.items.item[i].category + ' ' + data.response.body.items.item[i].fcstTime + ' ' + data.response.body.items.item[i].fcstValue);
								sky = data.response.body.items.item[i].fcstValue;
								break;
							}
						}

						let temperature = '';
						for (let i = 0; i < data.response.body.items.item.length; i++) {
							if (data.response.body.items.item[i].category == 'T1H') {
								//console.log(data.response.body.items.item[i].category + ' ' + data.response.body.items.item[i].fcstTime + ' ' + data.response.body.items.item[i].fcstValue);
								temperature = data.response.body.items.item[i].fcstValue;
								break;
							}
						}

						console.log(`curTime:${todayStr} callTime: ${date} ${time} sky:${sky} temperature:${temperature}`);
						
						// Dispatch/Trigger/Fire the event
						// Create the event.
						let event = document.createEvent('Event');
			
						// Define that the event name is 'build'.
						event.initEvent('weather', true, true);
						event.sky = sky;
						event.temperature = temperature;
						document.dispatchEvent(event);
					}
				} catch (e) {
				  console.log(`@@@ weather exception: ${e.name}: ${e.message}`);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);  //응답 메시지
				console.log(textStatus); //"error"
				console.log(errorThrown);
			},
			complete : function() {
				let today = new Date();
				
				let nextCalling = new Date();
				if (nextCalling.getMinutes() >= 45) nextCalling.setHours(nextCalling.getHours() + 1);
				nextCalling.setMinutes(45);

				let diffSec = (nextCalling.getTime() - today.getTime()) / 1000;
				

				nextCalling = new Date();
				nextCalling.setSeconds(diffSec);
				console.log(nextCalling.toString() + ' --> Next Calling: after ' + diffSec / 60 + ':' + diffSec % 60);
				
				//this는 ajax 객체 : ajax에서 호출. this is out of scope when use in timer function
				self.timer = setTimeout(() => { self.getForcasting(); }, diffSec * 1000);
			}
		});
	}
}