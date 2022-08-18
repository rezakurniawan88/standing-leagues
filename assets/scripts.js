const fetchData = fetch("https://api-football-standings.azharimm.site/leagues")
.then((res) => res.json())
.then((res) => {
    const leagues = res.data;

    leagues.map((league) => {
        document.getElementById("leagues-card").insertAdjacentHTML("beforeend", 
            `
                <div class="card-container" data-id="${league.id}">
                    <img src=${league.logos.light} alt=${league.name} width="50" height="50">
                    <h4>${league.name}</h4>
                </div>
            `
        )
    })

})
.catch((err) => console.log(err));

window.onload = async () => {
    await fetchData;

    const standingModal = document.querySelector(".content-standings");
    const closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        standingModal.style.display = "none";
        window.location.reload();
    })

    document.addEventListener('click', function(e) {
        if(e.target.classList.contains('card-container')) {
            standingModal.style.display = "block";
            const leaguesid = e.target.dataset.id;

            fetch(`https://api-football-standings.azharimm.site/leagues/${leaguesid}/standings?season=2022&sort=asc`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data);
                const datas = res.data;
                document.getElementById("league").innerText = `${datas.name} ${datas.season}/${datas.season+1}`;
                
                datas.standings.map(res => {
                    document.getElementById("table_standings").insertAdjacentHTML("beforebegin", 
                        `
                            <td class="rank"> ${res.stats[8].displayValue} </td>
                            <td> ${res.team.name} </td>
                            <td> ${res.stats[3].displayValue} </td>
                            <td> ${res.stats[0].displayValue} </td>
                            <td> ${res.stats[2].displayValue} </td>
                            <td> ${res.stats[1].displayValue} </td>
                            <td> ${res.stats[6].displayValue} </td>
                        `
                    )
                })

            }
            )
            .catch((err) => console.log(err))

        }
    });
}