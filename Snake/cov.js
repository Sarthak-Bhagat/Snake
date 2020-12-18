const getCovidStats = async() => {
try {
    const response = await fetch('https://api.covid19api.com/summary');
    const Cov = await response.json();

    covid19 = Cov["Global"];
} catch (err) {
    console.log(`Error: ${err}`);
} finally {
    var NewDeaths = covid19["NewDeaths"]

    document.getElementById('dark').innerText = "Like the " + NewDeaths + " people that died from Covid19 today";
}
};
getCovidStats();