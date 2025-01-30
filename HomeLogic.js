document.querySelector("#searchHome").addEventListener("keydown",async(event)=>{
    if(event.key=='Enter')
    {
		let city=(document.querySelector("#searchHome").value).trim();
		if(city=="")
		{
			alert("Enter City Name");
			return;
		}
		window.location.href='Weather.html';
		await logic.findWeather(city);
    }
});
