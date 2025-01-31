document.querySelector("#search").addEventListener("keydown",async(event)=>{
	if(event.key=='Enter')
	{
		let city=(document.querySelector("#search").value).trim();
		if(city=="")
		{
			alert("Enter City Name");
			return;
		}
		let res=await geoloc(city);
		if(res.length==0)
			alert("Enter Valid City Name");
		else
		{
			let details=await weather(res[0].latitude,res[0].longitude);
			document.querySelector("#location").innerHTML=city;
			document.querySelector("#rain").innerHTML=`Chance of rain: ${details.forecast.forecastday[0].hour[(new Date()).getHours()].chance_of_rain}%`;
			document.querySelector("#temperature").innerHTML=`${details.current.temp_c}<sup>o</sup>C`;
			document.querySelector("#image").src=`https:${details.current.condition.icon}`;

			let temps=document.querySelectorAll(".temp");
			var i=5;
			temps.forEach((temp)=>{
				temp.innerHTML=`${details.forecast.forecastday[0].hour[i].temp_c}<sup class="nobg">o</sup>C`;
				i+=6;
			});
				
			let icons=document.querySelectorAll(".icon");
			i=5;
			icons.forEach((icon)=>{
				icon.src=`https:${details.forecast.forecastday[0].hour[i].condition.icon}`;
				i+=6;
			});
				
			document.querySelector("#realfeel").innerHTML="";
			document.querySelector("#realfeel").innerHTML=`${details.current.feelslike_c}`+document.querySelector("#realfeel").innerHTML;
			document.querySelector("#rainposs").innerHTML=`${details.forecast.forecastday[0].hour[(new Date()).getHours()].chance_of_rain}%`;
			document.querySelector("#wind").innerHTML=`${details.current.wind_kph}km/hr`;
			document.querySelector("#uvindex").innerHTML=`${details.current.uv}`;

			let day=["Mon","Tues","Wed","Thurs","Fri","Sat","Sun"];
			let days=document.querySelectorAll(".days");
			i=(new Date()).getDay();
			days[1].innerHTML=`${day[i++]}`;
			if(i==7)
				i=0;
			days[2].innerHTML=`${day[i]}`;
			let f_icons=document.querySelectorAll(".forecast_icons");
			f_icons.forEach((icon,i=0)=>{
				icon.src=`https:${details.forecast.forecastday[i++].day.condition.icon}`;
			});
			let conditions=document.querySelectorAll(".conditions");
			conditions.forEach((condition,i=0)=>{
				condition.innerHTML=`${details.forecast.forecastday[i++].day.condition.text}`;
			});
			let maxmins=document.querySelectorAll(".maxmins");
			maxmins.forEach((temp,i=0)=>{
				temp.innerHTML=`${details.forecast.forecastday[i].day.maxtemp_c}/${details.forecast.forecastday[i++].day.mintemp_c}`;
			});
		}
		document.querySelector(".today_forecast").classList.remove("hide");
		document.querySelector(".upcoming_forecast").classList.remove("hide");
		document.querySelector("#search").value="";
	}
});


//longitude/latitude
async function geoloc(city){
	const url = `https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding?city=${city}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': 'c114dc87dbmsh6987700c0447313p1821e6jsn4404c6218cbe',
			'x-rapidapi-host': 'geocoding-by-api-ninjas.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		var result = await response.json();
		if(response.status!="200")
			throw new Error("Try Again After some time");
		return result;
	}
	catch (error) {
		alert(error);
		return result;
	}
}

// //weather
async function weather(lat,long) 
{
	const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${long}&days=3`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': 'c114dc87dbmsh6987700c0447313p1821e6jsn4404c6218cbe',
			'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url,options);
		if(response.status!="200")
			throw new Error("Try Again")
		const result = await response.json();
		return result;
	}
	catch (error) {
		alert(error);
	}
}